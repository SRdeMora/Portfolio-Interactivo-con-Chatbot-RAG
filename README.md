# Portfolio Interactivo con Chatbot RAG (Extremadamente Exhaustivo)

**¡ATENCIÓN LLM/USUARIO!** Este `README.md` ha sido diseñado para ser **extremadamente detallado y explícito**, con el objetivo de permitir la replicación de este proyecto con **cero fallos**. Sigue cada instrucción al pie de la letra, prestando especial atención a los directorios de ejecución de comandos y los resultados esperados.

## 1. Descripción del Proyecto

Este proyecto es un portfolio personal interactivo con una interfaz de terminal retro, diseñado para Samuel Rodríguez de Mora, experto en Procesamiento del Lenguaje Natural (PLN) e Inteligencia Artificial (IA). La característica central es un chatbot avanzado que utiliza un sistema de Recuperación Aumentada por Generación (RAG) y memoria conversacional para responder preguntas sobre el perfil de Samuel de manera personalizada, contextualizada y con un tono amable y profesional.

## 2. Características Clave

*   **Interfaz de Usuario Retro:** Proporciona una experiencia de usuario inmersiva que simula una terminal de línea de comandos antigua, con animaciones de arranque y efectos visuales.
*   **Navegación Interactiva:** Permite explorar diferentes secciones del portfolio (Sobre mí, Habilidades, Proyectos, Contacto) mediante comandos numéricos o clics en la barra de navegación.
*   **Chatbot Inteligente con RAG y Memoria:**
    *   **RAG (Retrieval-Augmented Generation):** El chatbot no "inventa" respuestas. Utiliza una base de datos vectorial (ChromaDB) para buscar y recuperar fragmentos de información directamente de (`api/knowledge_base.txt`).
    *   **Memoria Conversacional:** Mantiene un historial de la conversación actual, permitiendo al chatbot entender y responder a preguntas de seguimiento que dependen del contexto previo.
    *   **Personalidad Definida:** Responde en primera persona, con un tono amable, cercano y profesional, optimizado para interacciones con personal de Recursos Humanos.

## 3. Tecnologías Utilizadas

*   **Frontend:**
    *   **HTML5:** Estructura de la página web.
    *   **CSS3:** Estilos retro, animaciones y diseño responsivo.
    *   **JavaScript (ES6+):** Lógica interactiva de la terminal y comunicación con el backend.
*   **Backend (API):**
    *   **Python 3.10+:** Lenguaje de programación principal.
    *   **FastAPI:** Framework web moderno y rápido para construir la API REST.
    *   **Uvicorn:** Servidor ASGI para ejecutar la aplicación FastAPI.
*   **IA/PLN:**
    *   **OpenAI API:** Para el modelo de lenguaje `gpt-4o-mini` que genera las respuestas del chatbot.
    *   **LangChain:** Framework para el desarrollo de aplicaciones con LLMs, utilizado para orquestar el sistema RAG y la memoria conversacional.
    *   **ChromaDB:** Base de datos vectorial ligera y persistente, utilizada para almacenar los embeddings de la base de conocimiento.
    *   **HuggingFace Embeddings (`sentence-transformers/all-MiniLM-L6-v2`):** Modelo de embeddings utilizado para convertir texto en vectores numéricos, ejecutado localmente.
    *   **`python-dotenv`:** Para cargar variables de entorno desde un archivo `.env`.
    *   **`tiktoken`:** Utilizado por LangChain para el manejo de tokens.
    *   **`langchain-community`:** Módulo de LangChain para integraciones con componentes de la comunidad (como `TextLoader`).

## 4. Configuración del Entorno y Ejecución del Proyecto

Sigue estos pasos **exactamente** para configurar y ejecutar el proyecto.

### 4.1. Prerrequisitos

Asegúrate de tener instalado lo siguiente en tu sistema:

*   **Python:** Versión 3.10 o superior. Puedes verificarlo ejecutando `python --version` o `python3 --version` en tu terminal.
*   **pip:** El gestor de paquetes de Python. Se instala automáticamente con Python.
*   **Una clave de API de OpenAI:** Necesaria para que el chatbot funcione. Puedes obtenerla en la [plataforma de OpenAI](https://platform.openai.com/api-keys).

### 4.2. Clonar el Repositorio

Abre tu terminal (CMD, PowerShell, Git Bash, etc.) y ejecuta los siguientes comandos:

```bash
# Reemplaza [URL_DEL_REPOSITORIO] con la URL real de tu repositorio Git.
# Ejemplo: git clone https://github.com/tu_usuario/Landing_Retro.git
git clone [URL_DEL_REPOSITORIO]

# Navega al directorio raíz del proyecto clonado.
cd Landing_Retro
```

**Verificación:**
*   Deberías estar en el directorio `C:\Users\Samuel\Documents\devai.srm\Landing_Retro`.
*   Puedes verificar el contenido con `dir` (Windows) o `ls` (Linux/macOS). Deberías ver `api/`, `.env`, `index.html`, etc.

### 4.3. Configuración del Backend (API)

El backend es una aplicación FastAPI que gestiona la lógica del chatbot.

#### 4.3.1. Navegar al Directorio `api`

Desde el directorio raíz del proyecto (`Landing_Retro`), navega al subdirectorio `api`:

```bash
cd api
```

**Verificación:**
*   Deberías estar en el directorio `C:\Users\Samuel\Documents\devai.srm\Landing_Retro\api`.
*   Puedes verificar el contenido con `dir` o `ls`. Deberías ver `main.py`, `ingest.py`, `requirements.txt`, etc.

#### 4.3.2. Crear el Archivo de Variables de Entorno (`.env`)

El chatbot necesita tu clave de API de OpenAI para funcionar.

1.  Crea un nuevo archivo llamado `.env` en el directorio actual (`C:\Users\Samuel\Documents\devai.srm\Landing_Retro\api`).
2.  Abre este archivo con un editor de texto y añade la siguiente línea, **reemplazando `tu_clave_de_api_aqui` con tu clave real de OpenAI**:

    ```
    OPENAI_API_KEY="tu_clave_de_api_aqui"
    ```

**Verificación:**
*   Asegúrate de que el archivo `.env` esté guardado en `C:\Users\Samuel\Documents\devai.srm\Landing_Retro\api`.
*   Confirma que la clave esté entre comillas dobles y no tenga espacios extra.

#### 4.3.3. Instalar Dependencias de Python

Instala todas las librerías de Python necesarias para el backend.

```bash
pip install -r requirements.txt
```

**Resultado Esperado:**
*   Verás una serie de mensajes de instalación.
*   Al finalizar, deberías ver un mensaje similar a "Successfully installed ..." para todas las librerías listadas en `requirements.txt`.
*   **Posible Error:** `ModuleNotFoundError` o problemas con `langchain-community`.
    *   **Solución:** Asegúrate de que tu `requirements.txt` contenga `langchain-community` y vuelve a ejecutar `pip install -r requirements.txt`. Si el error persiste, verifica tu versión de Python.

#### 4.3.4. Ingesta de la Base de Conocimiento (Crear la Base de Datos Vectorial)

Este paso es crucial para el funcionamiento del sistema RAG. Solo necesitas ejecutarlo una vez, o cada vez que actualices el contenido del archivo `api/knowledge_base.txt`.

```bash
python ingest.py
```

**Resultado Esperado:**
*   Verás mensajes en la terminal similares a:
    ```
    Cargado 1 documento.
    Documento dividido en X fragmentos.
    Creando embeddings... (Esto puede tardar un momento la primera vez)
    Creando o actualizando la base de datos en: db
    ¡Base de datos vectorial creada y guardada con éxito!
    ```
*   Se creará una nueva carpeta llamada `db` dentro de `C:\Users\Samuel\Documents\devai.srm\Landing_Retro\api`. Esta carpeta contiene los archivos de la base de datos vectorial ChromaDB.

**Verificación:**
*   Confirma que la carpeta `db` existe en `C:\Users\Samuel\Documents\devai.srm\Landing_Retro\api`.
*   Si obtienes un `ModuleNotFoundError` aquí, revisa el paso 4.3.3.

#### 4.3.5. Iniciar el Servidor FastAPI

Inicia el servidor del backend. El flag `--reload` es útil durante el desarrollo, ya que reinicia el servidor automáticamente si detecta cambios en el código.

```bash
uvicorn main:app --reload
```

**Resultado Esperado:**
*   Verás mensajes en la terminal similares a:
    ```
    INFO:     Will watch for changes in these directories: ['C:\Users\Samuel\Documents\devai.srm\Landing_Retro\api']
    INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
    INFO:     Started reloader process [XXXXX] using WatchFiles
    INFO:     Started server process [XXXXX]
    INFO:     Waiting for application startup.
    INFO:     Application startup complete.
    ```
*   El servidor estará escuchando en `http://127.0.0.1:8000`.

**Verificación:**
*   Abre tu navegador y ve a `http://127.0.0.1:8000/docs`. Deberías ver la documentación interactiva de FastAPI (Swagger UI). Si la ves, el backend está funcionando correctamente.

### 4.4. Ejecutar el Frontend

El frontend es una aplicación web estática.

1.  **Navega al Directorio Raíz del Proyecto:** Si aún no estás allí, vuelve al directorio `Landing_Retro`:
    ```bash
    cd ..
    ```
    **Verificación:** Deberías estar en `C:\Users\Samuel\Documents\devai.srm\Landing_Retro`.

2.  **Abrir `index.html`:** Abre el archivo `index.html` en tu navegador web preferido. Puedes hacerlo directamente desde tu explorador de archivos o usando un comando en la terminal:

    *   **Windows:**
        ```bash
        start index.html
        ```
    *   **macOS:**
        ```bash
        open index.html
        ```
    *   **Linux (puede variar):**
        ```bash
        xdg-open index.html
        ```

**Resultado Esperado:**
*   Tu navegador se abrirá y mostrará la interfaz de terminal retro del portfolio.
*   Verás una secuencia de arranque y luego la sección "About" (Sobre mí).

## 5. Uso del Chatbot

1.  En la interfaz de terminal del portfolio, puedes navegar a la sección del chatbot de dos maneras:
    *   Haz clic en el texto `[5] Chatbot` en la barra de navegación superior.
    *   Presiona la tecla `5` en tu teclado.
2.  El prompt de la terminal cambiará a `SAM-AI>`. Esto indica que estás en modo chatbot.
3.  Ahora puedes escribir tus preguntas sobre el perfil de Samuel. Por ejemplo:
    *   `¿Qué experiencia tienes con PLN?`
    *   `Háblame de tus proyectos destacados.`
    *   `¿Qué tecnologías manejas?`
    *   `¿Dónde trabajaste antes de dedicarte a la IA?`
4.  El chatbot utilizará la información de `api/knowledge_base.txt`, el sistema RAG y el contexto de la conversación para responder de forma coherente y personalizada.
5.  Para salir del modo chatbot y volver a la navegación del portfolio, escribe `exit` y presiona Enter.

## 6. Personalización y Actualización de la Base de Conocimiento

Para actualizar la información que el chatbot utiliza:

1.  Edita el archivo `api/knowledge_base.txt` con la nueva información (por ejemplo, añadiendo un nuevo proyecto o experiencia).
2.  **Vuelve a ejecutar el script de ingesta** para actualizar la base de datos vectorial con los nuevos datos:
    ```bash
    # Asegúrate de estar en el directorio api
    cd C:\Users\Samuel\Documents\devai.srm\Landing_Retro\api
    python ingest.py
    ```
3.  Si el servidor FastAPI estaba corriendo, se reiniciará automáticamente y cargará la nueva base de conocimiento. Si no, deténlo (Ctrl+C) e inícialo de nuevo (`uvicorn main:app --reload`).

## 7. Contacto

Para más información sobre Samuel Rodríguez de Mora, puedes visitar:

*   **Portfolio:** [URL_DE_TU_LANDING_PAGE]
*   **LinkedIn:** [URL_DE_TU_LINKEDIN]
*   **GitHub:** [URL_DE_TU_GITHUB]


main.py
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


ingest.py

import os
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.document_loaders import TextLoader
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import Chroma

# Directorio donde se guardará la base de datos vectorial
DB_DIR = "db"
# Ruta al archivo de conocimiento
KNOWLEDGE_BASE_PATH = "knowledge_base.txt"

def main():
    # 1. Cargar el documento
    loader = TextLoader(KNOWLEDGE_BASE_PATH, encoding="utf-8")
    documents = loader.load()
    print(f"Cargado {len(documents)} documento.")

    # 2. Dividir el documento en fragmentos (chunks)
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    texts = text_splitter.split_documents(documents)
    print(f"Documento dividido en {len(texts)} fragmentos.")

    # 3. Crear los embeddings
    # Usamos un modelo de Hugging Face que se ejecuta localmente
    print("Creando embeddings... (Esto puede tardar un momento la primera vez)")
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

    # 4. Crear y persistir la base de datos vectorial
    # Si el directorio ya existe, se añadirá nuevo contenido (si lo hubiera)
    print(f"Creando o actualizando la base de datos en: {DB_DIR}")
    db = Chroma.from_documents(texts, embeddings, persist_directory=DB_DIR)
    db.persist()
    print("¡Base de datos vectorial creada y guardada con éxito!")

if __name__ == "__main__":
    main()


index.html

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Samuel Rodriguez de Mora - AI & Automation</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
</head>
<body>
    <div id="terminal">
        <div id="header">
            <h1>Samuel Rodriguez de Mora</h1>
            <p>Experto en Procesamiento del Lenguaje Natural</p>
        </div>
        <div id="navbar">
            <span>[1] About</span>
            <span>[2] Skills</span>
            <span>[3] Projects</span>
            <span>[4] Contact</span>
            <span>[5] Chatbot</span>
            <span>[C] Clear</span>
        </div>
        <div id="output"></div>
        <div class="prompt-line">
            <span class="prompt">C:\Users\Guest></span>
            <input type="text" id="input" autofocus>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>

script.js
const output = document.getElementById('output');
const input = document.getElementById('input');
const promptLine = document.querySelector('.prompt-line');

let chatMode = false;
let commandHistory = [];
let historyIndex = -1;

const sections = {
    'about': `
<div class="section-title"><span class="highlight">--- BIOGRAFÍA ---</span></div>

Lingüista Computacional con base en Filología Hispánica, experto en PLN, Machine Learning y modelos Transformer (BERT, GPT). Mi experiencia abarca la ingeniería de prompts, el desarrollo de agentes conversacionales y la creación de automatizaciones con herramientas no-code.
`,
    'skills': `
<div class="section-title"><span class="highlight">--- HABILIDADES TÉCNICAS ---</span></div>

<span class="highlight">Áreas de PLN / Machine Learning:</span>
  Análisis de Sentimiento, Clasificación de Textos, Named Entity Recognition (NER), Topic Modeling (LDA), Word Embeddings (Word2Vec, GloVe), Modelos Transformer (BERT, GPT), Chatbots y Asistentes Virtuales, Traducción Automática, Web Scraping.

<span class="highlight">Lenguajes de Programación:</span>
  Python.

<span class="highlight">Bibliotecas y Frameworks de PLN/ML:</span>
  NLTK, spaCy, Scikit-learn, Gensim, TensorFlow, Keras, Hugging Face Transformers.

<span class="highlight">Herramientas y Tecnologías:</span>
  Jupyter Notebooks, Git, SQL (básico), APIs REST, n8n.

<span class="highlight">Competencias Interpersonales:</span>
  Liderazgo de Equipos, Gestión de Proyectos, Optimización de Procesos, Resolución de Problemas, Habilidades de Comunicación.
`,
    'projects': `
<div class="section-title"><span class="highlight">--- PROYECTOS DESTACADOS ---</span></div>

<span class="highlight">1. Análisis de Sentimiento para Reseñas de Productos</span>
  <span class="highlight">Descripción:</span> Una API que clasifica el texto de reseñas en positivo, negativo o neutro usando un modelo Transformer afinado.
  <span class="highlight">Tecnologías:</span> Python, FastAPI, Hugging Face Transformers, Scikit-learn.
  <span class="highlight">Enlace:</span> <a href="https://github.com/samuel-rdm/sentiment-analyzer" target="_blank">github.com/samuel-rdm/sentiment-analyzer</a>

<span class="highlight">2. Asistente de Documentación Técnica (Chatbot RAG)</span>
  <span class="highlight">Descripción:</span> Un chatbot que responde preguntas sobre una base de código compleja. Utiliza RAG para extraer contexto de la documentación y generar respuestas precisas.
  <span class="highlight">Tecnologías:</span> LangChain, OpenAI API, ChromaDB, Python.
  <span class="highlight">Enlace:</span> <a href="https://github.com/samuel-rdm/doc-assistant-bot" target="_blank">github.com/samuel-rdm/doc-assistant-bot</a>

<span class="highlight">3. Extractor y Resumidor de Noticias</span>
  <span class="highlight">Descripción:</span> Un script automatizado que extrae el contenido de artículos de noticias a partir de una URL y genera un resumen conciso de 3-4 frases.
  <span class="highlight">Tecnologías:</span> spaCy, Gensim, BeautifulSoup, Python.
  <span class="highlight">Enlace:</span> <a href="https://github.com/samuel-rdm/news-summarizer" target="_blank">github.com/samuel-rdm/news-summarizer</a>
`,
    'contact': `
<div class="section-title"><span class="highlight">--- CONTACTO ---</span></div>

<span class="highlight">Email:</span> <a href="mailto:devai.srm@gmail.com">devai.srm@gmail.com</a>
<span class="highlight">Móvil:</span> 629 308 432
<span class="highlight">LinkedIn:</span> <a href="URL_DE_TU_LINKEDIN" target="_blank">LinkedIn</a>
<span class="highlight">GitHub:</span> <a href="URL_DE_TU_GITHUB" target="_blank">GitHub</a>
<span class="highlight">Portfolio:</span> <a href="URL_DE_TU_LANDING_PAGE" target="_blank">Portfolio</a>
`
};

const bootSequence = [
    { text: 'Booting SRM-OS v2.0...', delay: 100 },
    { text: 'Loading modern interface module...', delay: 200 },
    { text: 'Modules loaded.', delay: 150 },
    { text: 'Welcome, Samuel Rodriguez de Mora.', delay: 100, highlight: true },
    { text: 'Use the top menu or number keys [1-5] to navigate.', delay: 100 },
];

async function typeLine(line, element) {
    for (let i = 0; i < line.text.length; i++) {
        element.innerHTML += line.text[i];
        await new Promise(resolve => setTimeout(resolve, 20));
    }
}

async function runBootSequence() {
    const bootOutput = document.createElement('div');
    output.appendChild(bootOutput);

    for (const line of bootSequence) {
        await new Promise(resolve => setTimeout(resolve, line.delay));
        const lineElem = document.createElement('div');
        if(line.highlight) lineElem.classList.add('highlight');
        bootOutput.appendChild(lineElem);
        await typeLine(line, lineElem);
    }
    // Automatically show 'about' section after boot
    setTimeout(() => showSection('about'), 500);
}

function showSection(command) {
    chatMode = false;
    promptLine.style.display = 'none';
    output.innerHTML = ''; // Clear previous output

    const content = sections[command];
    if (content) {
        const outputElem = document.createElement('div');
        outputElem.classList.add('command-output');
        outputElem.innerHTML = content;
        output.appendChild(outputElem);
    } else if (command === 'chatbot') {
        chatMode = true;
        output.innerHTML = '<div class="command-output">Switched to AI assistant mode. Type your questions or type <span class="highlight">exit</span> to leave.</div>';
        promptLine.style.display = 'flex';
        document.querySelector('.prompt').textContent = 'SAM-AI> ';
        input.focus();
    } else if (command === 'clear') {
        output.innerHTML = '';
    }
}

document.addEventListener('keydown', (e) => {
    if (chatMode) return; // If in chat mode, let the input handler take over

    switch (e.key) {
        case '1': showSection('about'); break;
        case '2': showSection('skills'); break;
        case '3': showSection('projects'); break;
        case '4': showSection('contact'); break;
        case '5': showSection('chatbot'); break;
        case 'c':
        case 'C': showSection('clear'); break;
    }
});

input.addEventListener('keydown', async (e) => {
    if (!chatMode || e.key !== 'Enter') return;

    const command = input.value.trim();
    const commandLine = document.createElement('div');
    commandLine.innerHTML = `<span class="prompt">SAM-AI> </span><span>${command}</span>`;
    output.appendChild(commandLine);
    
    input.value = '';

    if (command.toLowerCase() === 'exit') {
        chatMode = false;
        promptLine.style.display = 'none';
        const exitMessage = document.createElement('div');
        exitMessage.classList.add('command-output');
        exitMessage.textContent = 'Exited chat mode.';
        output.appendChild(exitMessage);
        return;
    }

    if (command) {
        commandHistory.unshift(command);
        historyIndex = -1;
        await handleChatMessage(command);
    }
    output.scrollTop = output.scrollHeight;
});

async function handleChatMessage(message) {
    const thinkingElem = document.createElement('div');
    thinkingElem.classList.add('command-output');
    thinkingElem.textContent = 'SAM-AI is thinking...';
    output.appendChild(thinkingElem);
    output.scrollTop = output.scrollHeight;

    try {
        const response = await fetch('http://localhost:8000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: message }),
        });

        output.removeChild(thinkingElem);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'API request failed');
        }

        const data = await response.json();
        const answerElem = document.createElement('div');
        answerElem.classList.add('command-output');
        answerElem.innerHTML = `SAM-AI: ${data.answer}`;
        output.appendChild(answerElem);

    } catch (error) {
        if (thinkingElem.parentNode === output) {
            output.removeChild(thinkingElem);
        }
        const errorElem = document.createElement('div');
        errorElem.classList.add('command-output', 'error');
        errorElem.textContent = `Error: Could not connect to SAM-AI. Make sure the backend server is running. Details: ${error.message}`;
        output.appendChild(errorElem);
    }
    output.scrollTop = output.scrollHeight;
}

// Add click listeners to navbar
document.addEventListener('DOMContentLoaded', () => {
    const navItems = {
        '1': 'about',
        '2': 'skills',
        '3': 'projects',
        '4': 'contact',
        '5': 'chatbot',
        'C': 'clear'
    };
    document.querySelectorAll('#navbar span').forEach(item => {
        const key = item.textContent.match(/\[(.*?)\]/)[1];
        item.addEventListener('click', () => showSection(navItems[key]));
    });

    runBootSequence();
});


style.css

/* CSS Variables for easy theming */
:root {
    --background-color: #0D0208;
    --text-color: #00FF41;
    --glow-color: rgba(0, 255, 65, 0.75);
    --highlight-color: #FFD700;
    --error-color: #FF0000;
}

body {
    background-color: var(--background-color);
    color: var(--text-color);
    font-family: 'Press Start 2P', cursive;
    font-size: 16px;
    line-height: 1.5;
    text-shadow: 0 0 5px var(--glow-color);
    overflow: hidden; /* Hide scrollbars from the body */
}

/* Animated Grid Background */
body::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-image:
        linear-gradient(to right, rgba(0, 255, 65, 0.1) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0, 255, 65, 0.1) 1px, transparent 1px);
    background-size: 40px 40px;
    animation: moveGrid 10s linear infinite;
    z-index: -1;
}

@keyframes moveGrid {
    from { background-position: 0 0; }
    to { background-position: 40px 40px; }
}

#terminal {
    padding: 20px;
    height: calc(100vh - 120px); /* Adjust height for new margin */
    width: calc(100vw - 120px); /* Adjust width for new margin */
    margin: 60px;
    box-sizing: border-box;
    cursor: default;
    overflow: hidden; /* Output will scroll, not the whole terminal */
    border: 2px solid var(--text-color);
    box-shadow: 0 0 20px var(--glow-color);
    position: relative;
    background-color: rgba(13, 2, 8, 0.85);
    display: flex;
    flex-direction: column;
}

#header {
    text-align: center;
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 2px solid var(--text-color);
}

#header h1 {
    font-size: 24px;
    margin: 0 0 5px 0;
    color: var(--highlight-color);
    text-shadow: 0 0 7px var(--highlight-color);
}

#header p {
    font-size: 14px;
    margin: 0;
}

#navbar {
    display: flex;
    justify-content: space-around;
    flex-shrink: 0;
    margin-bottom: 15px;
}

#navbar span {
    cursor: pointer;
}

#navbar span:hover {
    color: var(--highlight-color);
    text-shadow: 0 0 5px var(--highlight-color);
}

#output {
    white-space: pre-wrap;
    overflow-y: auto;
    flex-grow: 1;
}

.section-title {
    text-align: center;
    margin-bottom: 15px;
}


/* Custom scrollbar for the output */
#output::-webkit-scrollbar {
    width: 10px;
}
#output::-webkit-scrollbar-track {
    background: transparent;
}
#output::-webkit-scrollbar-thumb {
    background-color: var(--text-color);
    border-radius: 5px;
    border: 2px solid var(--background-color);
}

.prompt-line {
    display: none; /* Hidden by default */
    align-items: center;
    margin-top: 10px;
}

.prompt {
    margin-right: 10px;
}

#input {
    background: transparent;
    border: none;
    color: var(--text-color);
    font-family: 'Press Start 2P', cursive;
    font-size: 16px;
    width: 100%;
    outline: none;
    text-shadow: 0 0 5px var(--glow-color);
}

.prompt-line::after {
    content: '_';
    animation: blink 1s step-end infinite;
}

@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}

.command-output {
    margin-bottom: 10px;
}

.error {
    color: var(--error-color);
    text-shadow: 0 0 5px var(--error-color);
}

.highlight {
    color: var(--highlight-color);
    text-shadow: 0 0 5px var(--highlight-color);
}

a {
    color: var(--highlight-color);
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

#terminal::after {
    content: " ";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.3),
        rgba(0, 0, 0, 0.3) 1px,
        transparent 1px,
        transparent 3px
    );
    pointer-events: none;
    z-index: 1; /* Make sure it's above the background but below content */
}


requirements.txt
fastapi
uvicorn
openai
python-dotenv
langchain
langchain-community
chromadb
sentence-transformers
tiktoken
