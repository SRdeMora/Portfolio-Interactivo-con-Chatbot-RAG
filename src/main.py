import os
import sys
import uvicorn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import Chroma
from langchain.chains import ConversationalRetrievalChain 
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.memory import ConversationBufferMemory 

# Cargar variables de entorno
load_dotenv()

# Configurar la clave de API de OpenAI
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    # Error de inicio si falta la clave de API
    print("Error: No se encontró la clave de API de OpenAI. Asegúrate de que esté en el archivo .env")
    sys.exit(1)

# --- CONFIGURACIÓN DE RAG ---
DB_DIR = "db"
EMBEDDINGS_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

# 1. Cargar el modelo de embeddings
print("Cargando modelo de embeddings...")
try:
    embeddings = HuggingFaceEmbeddings(model_name=EMBEDDINGS_MODEL)
except Exception as e:
    print(f"Error al cargar el modelo de embeddings: {e}")
    sys.exit(1)

# 2. Cargar la base de datos vectorial
# Verificación estricta de la existencia de la base de datos
print("Cargando base de datos vectorial...")
if not os.path.exists(DB_DIR):
    print(f"Error: El directorio de la base de datos '{DB_DIR}' no existe.")
    print("Por favor, ejecuta 'python3 ingest.py' primero para crearla.")
    sys.exit(1)
try:
    db = Chroma(persist_directory=DB_DIR, embedding_function=embeddings)
except Exception as e:
    print(f"Error al cargar la base de datos Chroma: {e}")
    sys.exit(1)

# 3. Configurar el LLM
llm = ChatOpenAI(temperature=0.2, model_name="gpt-4o-mini", openai_api_key=api_key)

# 4. Configurar la memoria conversacional (GLOBAL para esta demo)
# La memoria es global pero reseteable vía endpoint /reset
memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True, output_key="answer")

# 5. Crear el prompt personalizado para la respuesta final
custom_qa_template = """
Actúa como un candidato experto en PLN. Responde a las preguntas en primera persona, como si fueras yo.
Tu objetivo es conversar con personal de Recursos Humanos.
Sé amable, cercano y profesional.
***La respuesta debe ser concisa, idealmente un máximo de 3 oraciones, y debe basarse estrictamente en la información de Contexto recuperada de la BD.***
No te inventes nada.
Si la respuesta no está en el contexto, di amablemente que no tienes esa información.

Historial de la conversación:
{chat_history}

Contexto: {context}

Pregunta: {question}

Respuesta:
"""
CUSTOM_QA_PROMPT = PromptTemplate(template=custom_qa_template, input_variables=["chat_history", "context", "question"])


# 6. Crear la cadena de ConversationalRetrievalChain
qa_chain = ConversationalRetrievalChain.from_llm(
    llm=llm,
    retriever=db.as_retriever(search_kwargs={"k": 3}), 
    memory=memory,
    combine_docs_chain_kwargs={"prompt": CUSTOM_QA_PROMPT}, 
    output_key="answer", 
    return_source_documents=True,
)
# --- FIN DE CONFIGURACIÓN DE RAG ---

app = FastAPI()

# Configurar CORS para permitir que el frontend acceda a la API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    question: str

# Endpoint para resetear la memoria, llamado por el frontend al inicio de la sesión
@app.post("/reset")
async def reset_chat():
    """Limpia el historial de conversación global."""
    memory.clear()
    print("Memoria de conversación reseteada.")
    return {"message": "Historial de conversación reseteado exitosamente."}

@app.post("/chat")
async def chat(request: ChatRequest):
    user_question = request.question
    if not user_question:
        raise HTTPException(status_code=400, detail="La pregunta no puede estar vacía.")

    try:
        print(f"Recibida pregunta: {user_question}")
        
        # Usar la cadena RAG conversacional
        result = qa_chain({"question": user_question})
        
        answer = result.get("answer")
        
        return {"answer": answer}
    except Exception as e:
        print(f"Error en la cadena RAG conversacional: {e}")
        # Manejo de error de producción, no revelar detalles internos al cliente
        raise HTTPException(status_code=500, detail="Hubo un error al procesar la pregunta del RAG.")

if __name__ == "__main__":
    print("\n--- Iniciando Servidor FastAPI ---")
    print("Accede a http://localhost:8000 en tu frontend.")
    uvicorn.run(app, host="0.0.0.0", port=8000)
