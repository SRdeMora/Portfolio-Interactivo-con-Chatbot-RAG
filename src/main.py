import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import Chroma
from langchain.chains import ConversationalRetrievalChain # Changed from RetrievalQA
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.memory import ConversationBufferMemory # New import

# Cargar variables de entorno
load_dotenv()

# Configurar la clave de API de OpenAI
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("No se encontró la clave de API de OpenAI. Asegúrate de que esté en el archivo .env")

# --- CONFIGURACIÓN DE RAG ---
DB_DIR = "db"
EMBEDDINGS_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

# 1. Cargar el modelo de embeddings
print("Cargando modelo de embeddings...")
embeddings = HuggingFaceEmbeddings(model_name=EMBEDDINGS_MODEL)

# 2. Cargar la base de datos vectorial
print("Cargando base de datos vectorial...")
if not os.path.exists(DB_DIR):
    raise FileNotFoundError(f"El directorio de la base de datos '{DB_DIR}' no existe. "
                            f"Por favor, ejecuta el script 'ingest.py' primero.")
db = Chroma(persist_directory=DB_DIR, embedding_function=embeddings)

# 3. Configurar el LLM
llm = ChatOpenAI(temperature=0.2, model_name="gpt-4o-mini", openai_api_key=api_key)

# 4. Configurar la memoria conversacional (GLOBAL para esta demo)
# ADVERTENCIA: Esta implementación de memoria es global y solo soporta una conversación a la vez.
# Para múltiples usuarios concurrentes, se necesitaría un sistema de gestión de sesiones más robusto.
memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True, output_key="answer")

# 5. Crear el prompt personalizado para la respuesta final
# Este prompt se usará para generar la respuesta final, incorporando el historial y el contexto recuperado.
custom_qa_template = """
Responde a las preguntas en primera persona, como si fueras yo.
Tu objetivo es conversar con personal de Recursos Humanos que está interesado en mi perfil.
Sé amable, cercano y profesional. Usa la siguiente información de contexto para construir tu respuesta.
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
    retriever=db.as_retriever(search_kwargs={"k": 3}), # "k" es el número de fragmentos a recuperar
    memory=memory,
    combine_docs_chain_kwargs={"prompt": CUSTOM_QA_PROMPT}, # Usar nuestro prompt personalizado para la respuesta final
    output_key="answer", # Indicar a la memoria cuál es la clave de la respuesta
    return_source_documents=True,
    # verbose=True # Descomentar para ver el flujo interno de la cadena
)
# --- FIN DE CONFIGURACIÓN DE RAG ---

app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    question: str

@app.post("/chat")
async def chat(request: ChatRequest):
    user_question = request.question
    if not user_question:
        raise HTTPException(status_code=400, detail="La pregunta no puede estar vacía.")

    try:
        print(f"Recibida pregunta: {user_question}")
        # Usar la cadena RAG conversacional para obtener la respuesta
        # La cadena maneja automáticamente la actualización de la memoria
        result = qa_chain({"question": user_question})
        
        answer = result.get("answer") # ConversationalRetrievalChain devuelve 'answer' no 'result'
        # Opcional: ver los documentos fuente que usó
        source_docs = result.get("source_documents")
        if source_docs:
            print("\n--- Documentos Fuente Usados ---")
            for doc in source_docs:
                print(doc.page_content)
                print("---------------------------------")

        return {"answer": answer}
    except Exception as e:
        print(f"Error en la cadena RAG conversacional: {e}")
        raise HTTPException(status_code=500, detail=f"Hubo un error al procesar la pregunta: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
