<div align="center">
  <!-- ICONO SVG DE TERMINAL -->
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="150" fill="#00FF41">
    <path d="M9.4 86.6C-3.1 74.1-3.1 53.9 9.4 41.4s32.8-12.5 45.3 0L177.3 164c4.9 4.9 11.4 7.4 18 7.4s13.1-2.5 18-7.4L335.9 41.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L258.7 209.1c-4.9 4.9-11.4 7.4-18 7.4s-13.1-2.5-18-7.4L9.4 86.6zM566.6 233.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L398.7 209.1c-4.9 4.9-11.4 7.4-18 7.4s-13.1-2.5-18-7.4L239.9 86.6c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L317.3 254.7c4.9 4.9 11.4 7.4 18 7.4s13.1-2.5 18-7.4L566.6 233.4zM576 352c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H544c17.7 0 32-14.3 32-32z"/>
  </svg>
  <h1 align="center">
    Portfolio Interactivo con Chatbot RAG   
  </h1>
  <p align="center">
    <strong>Una landing page personal con un chatbot RAG para responder preguntas sobre mi perfil profesional.</strong>
    <p align="center">
  <a href="https://srdemora.github.io/Portfolio-Interactivo-con-Chatbot-RAG/">
    <img src="https://img.shields.io/badge/🚀_Accede_Pinchando_Aquí-28A745?style=for-the-badge&logo=rocket&logoColor=white" alt="Acceder a la Demo">
  </a>
</p>
  </p>
</div>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI">
  <img src="https://img.shields.io/badge/LangChain-8A46FF?style=for-the-badge" alt="LangChain">
  <img src="https://img.shields.io/badge/ChromaDB-6E44FF?style=for-the-badge" alt="ChromaDB">
  <img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
</p>

---

## 📜 Descripción del Proyecto

Este proyecto es un portfolio personal interactivo. La característica central es un **chatbot avanzado** que utiliza una arquitectura de **Retrieval-Augmented Generation (RAG)** para responder preguntas sobre mi perfil profesional. El bot recupera información de una base de conocimiento local, mantiene el contexto de la conversación y responde con una personalidad amable y profesional, optimizada para interacciones con personal de Recursos Humanos.

---

## ✨ Características de Vanguardia

-   🖥️ **Interfaz de Terminal Retro:** Una experiencia de usuario inmersiva con animaciones de arranque y efectos visuales que simulan una terminal clásica.
-   🤖 **Chatbot Inteligente con RAG y Memoria:** El chatbot no inventa respuestas; busca en una base de datos vectorial (ChromaDB) para encontrar la información más relevante de mi perfil y la utiliza para generar una respuesta contextualizada.
-   🧠 **Orquestación con LangChain:** Utiliza `ConversationalRetrievalChain` para gestionar el flujo completo de la conversación, integrando la recuperación de documentos, la memoria y la generación de respuestas del LLM.
-   📚 **Ingesta de Conocimiento Local:** Un script (`ingest.py`) procesa un archivo de texto (`knowledge_base.txt`), lo divide en fragmentos, genera embeddings localmente con un modelo de Hugging Face y los almacena en ChromaDB.
-   🗣️ **Personalidad Definida y Memoria Conversacional:** Gracias a `ConversationBufferMemory` y un prompt personalizado, el bot puede responder a preguntas de seguimiento y mantener un tono coherente durante toda la interacción.

## 💡 Relevancia y Demostración de Habilidades

Este repositorio es un portfolio que demuestra la capacidad de diseñar y construir un sistema de IA complejo de extremo a extremo.

<details>
  <summary><strong>Conceptos de IA y Full-Stack Demostrados</strong></summary>
  <br/>
  <ul>
    <li><strong>Retrieval-Augmented Generation (RAG):</strong> Implementación de un sistema RAG completo, desde la ingesta de datos hasta la generación de respuestas.</li>
    <li><strong>Gestión de Memoria Conversacional:</strong> Capacidad de mantener el contexto en una conversación, permitiendo preguntas de seguimiento.</li>
    <li><strong>Desarrollo Full-Stack:</strong> Conexión de un frontend interactivo en JavaScript con un backend de IA en Python a través de una API REST.</li>
    <li><strong>Embeddings Locales:</strong> Uso de modelos de Hugging Face para generar embeddings sin depender de una API externa, demostrando optimización de costes y flexibilidad.</li>
  </ul>
</details>

<details>
  <summary><strong>Prácticas de Ingeniería de Software Profesional</strong></summary>
  <br/>
  <ul>
    <li><strong>Diseño de API con FastAPI:</strong> Creación de un endpoint robusto y bien documentado para la lógica del chatbot.</li>
    <li><strong>Gestión de Dependencias:</strong> Uso de <code>requirements.txt</code> para garantizar la reproducibilidad del entorno.</li>
    <li><strong>Gestión de Secretos:</strong> Uso de un archivo <code>.env</code> para manejar claves API de forma segura.</li>
    <li><strong>Separación de Responsabilidades:</strong> Clara distinción entre la lógica del frontend (JavaScript), el backend (Python) y la ingesta de datos.</li>
  </ul>
</details>

---

## 🏗️ Estructura del Proyecto

```plaintext
📂 Landing_Retro/
├── ⚙️ .env                  # Clave API de OpenAI (debe crearse)
├── 📄 index.html           # Estructura del Frontend
├── 🎨 style.css             # Estilos de la terminal retro
├── 💻 script.js            # Lógica del Frontend y llamadas a la API
│
└── 🧠 src/                  # Backend del proyecto (FastAPI)
    ├── 🐍 main.py           # API principal que gestiona el chatbot
    ├── 🐍 ingest.py         # Script para crear la base de datos vectorial
    ├── 📝 knowledge_base.txt # El "cerebro" del chatbot
    ├── 📜 requirements.txt  # Dependencias de Python
    └── 🗄️ db/               # Carpeta donde se guarda la base de datos ChromaDB
