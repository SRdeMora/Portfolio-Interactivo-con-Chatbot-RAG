const output = document.getElementById('output');
const input = document.getElementById('input');
const chatInputContainer = document.getElementById('chat-input-container');

let commandHistory = [];
let historyIndex = -1;

// URL base de la API. Cambia esto si tu API está en otro lugar.
const API_BASE_URL = 'https://api.srmdevai.com';

const sections = {
    'about': `
<div class="section-title">--- BIOGRAFÍA ---</div>

Lingüista Computacional y Especialista en PLN, con una sólida base académica en Filología Hispánica. Mi enfoque profesional se sitúa en la intersección del lenguaje humano y la inteligencia artificial, donde transformo texto no estructurado en soluciones de negocio inteligentes.
Soy experto en el ciclo de vida completo de proyectos de IA conversacional: desde el diseño de prompts y la ingeniería de contexto, hasta el desarrollo y fine-tuning de modelos Transformer (BERT, GPT) y la creación de agentes autónomos. Mi objetivo es construir sistemas que no solo entiendan el lenguaje, sino que también comprendan la intención y el contexto.
`,
    'skills': `
<div class="section-title">--- HABILIDADES TÉCNICAS ---</div>

<div class="skill-category"><span class="highlight">Áreas de PLN / Machine Learning:</span> Análisis de Sentimiento, Clasificación de Textos, Named Entity Recognition (NER), Retrieval-Augmented Generation (RAG), Ingeniería de Prompts, Sistemas Agenticos, Modelos Transformer (BERT, GPT), Búsqueda Semántica.</div>

<div class="skill-category"><span class="highlight">Lenguajes de Programación:</span> Python, SQL .</div>

<div class="skill-category"><span class="highlight">Bibliotecas y Frameworks de PLN/ML:</span> NLTK, spaCy, Scikit-learn, Gensim, TensorFlow, Keras, Hugging Face Transformers, LangChain.</div>

<div class="skill-category"><span class="highlight">Herramientas y Tecnologías:</span> Jupyter Notebooks, Git, APIs REST, n8n.</div>

<div class="skill-category"><span class="highlight">Competencias Interpersonales:</span> Liderazgo de Equipos, Gestión de Proyectos, Optimización de Procesos, Resolución de Problemas, Habilidades de Comunicación.</div>
`,
    'projects': `
<div class="section-title">--- PROYECTOS DESTACADOS ---</div>

<div class="project-item">
  <span class="highlight">Chimera-Conversational-AI</span>
  <div><span class="highlight">Descripción:</span> El Proyecto Quimera es un asistente de IA diseñado para funcionar como un "exo-córtex": un cerebro externo que aumenta las capacidades del usuario ("Arkitekto"). A diferencia de los chatbots simples, Quimera está diseñado para comprender el contexto profundo (tono, emoción, intención) y utilizar un sistema de memoria complejo para mantener conversaciones coherentes, personalizadas y extensibles a largo plazo.</div>
  <div><span class="highlight">Tecnologías:</span>Python, FastAPI, PySide6, Redis, SQLite, ChromaDB, Neo4j, OpenAI, Google Gemini.</div>
  <div><span class="highlight">Enlace:</span> <a href="https://github.com/SRdeMora/Proyecto-Quimera-Exo-Cortex-Conversacional" target="_blank">github.com/SRdeMora/chimera-conversational-ai</a></div>
</div>

<div class="project-item">
  <span class="highlight">ML_Pipeline-NLP-End-to-End</span>
  <div><span class="highlight">Descripción:</span> Un proyecto NLP de extremo a extremo para extraer y clasificar la opinión pública sobre la película Gladiator 2, utilizando un corpus sintético y modelos de Machine Learning.</div>
  <div><span class="highlight">Tecnologías:</span>Python, spaCy, scikit-learn, NLTK, Matplotlib.</div>
  <div><span class="highlight">Enlace:</span> <a href="https://github.com/SRdeMora/ML_Pipeline-NLP-End-to-End" target="_blank">github.com/SRdeMora/ML_Pipeline-NLP-End-to-End</a></div>
</div>

<div class="project-item">
  <span class="highlight">Chatbot Dialogflow</span>
  <div><span class="highlight">Descripción:</span> Un agente conversacional creado con Google Dialogflow ES. El bot está diseñado para simular conversaciones humanas y realizar tareas específicas de manera automatizada.El objetivo principal de este agente es ofrecer informacion general a los clientes sobre productos y citas del centro auditivo.</div>
  <div><span class="highlight">Tecnologías:</span>Dialogflow, Google Cloud.</div>
  <div><span class="highlight">Enlace:</span> <a href="https://srdemora.github.io/Chatbot_Dialogflow/" target="_blank">github.com/SRdeMora/Chat_Dialogflow</a></div>
</div>

<div class="project-item">
  <span class="highlight">NESY Medical Bot</span>
  <div><span class="highlight">Descripción:</span> Nesy es un bot de Telegram diseñado para gestionar citas médicas y medicamentos de manera eficiente. Nesy, puede añadir, consultar, modificar y eliminar citas, así como llevar un registro detallado de los medicamentos y tratamientos. Además, permite la consulta de información detallada de medicamentos extraida de la AEMPS (Agencia Española de Medicamentos y Productos Sanitarios).</div>
  <div><span class="highlight">Tecnologías:</span> Python, Telegram, Flask, Firestore, API Integration.</div>
  <div><span class="highlight">Enlace:</span> <a href="https://github.com/SRdeMora/Nesy_Medical_Bot" target="_blank">github.com/SRdeMora/Nesy_Medical_Bot</a></div>
</div>
`,
    'contact': `
<div class="section-title">--- CONTACTO ---</div>

<div class="contact-item"><span class="highlight">Email:</span> <a href="mailto:devai.srm@gmail.com">devai.srm@gmail.com</a></div>
<div class="contact-item"><span class="highlight">Móvil:</span> <span>+34 629 308 432</span></div>

<div class="contact-icons">
    <a href="https://www.linkedin.com/in/samuel-rodriguez-de-mora-328547387/" target="_blank" title="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>
    <a href="https://github.com/SRdeMora" target="_blank" title="GitHub"><i class="fa-brands fa-github"></i></a>
</div>
`
};

// Función de ayuda para hacer scroll al final
function scrollToBottom() {
    output.scrollTop = output.scrollHeight;
}

// Función para inicializar el chat
async function initializeChat() {
    output.innerHTML = `<div class="command-output">Conectando con SAM-AI...</div>`;
    scrollToBottom();

    try {
        const response = await fetch(`${API_BASE_URL}/reset`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error('La respuesta del servidor no fue exitosa.');
        }

        const data = await response.json();
        output.innerHTML = `<div class="command-output">${data.answer}</div>`;
        output.innerHTML += `<div class="command-output">Escribe <span class="highlight">exit</span> para salir.</div>`;
    } catch (error) {
        console.error('Error al inicializar el chat:', error);
        output.innerHTML = `<div class="command-output error">Error al conectar con SAM-AI. Asegúrate de que el servidor esté funcionando.</div>`;
    } finally {
        scrollToBottom();
    }
}

// Función principal para mostrar secciones
function showSection(section) {
    // Actualizar clase activa en la barra de navegación
    document.querySelectorAll('#navbar span').forEach(item => {
        item.classList.toggle('active', item.dataset.section === section);
    });

    output.innerHTML = ''; // Limpiar salida anterior

    if (section === 'chatbot') {
        chatInputContainer.style.display = 'flex';
        input.focus();
        initializeChat(); // Llama a la función para iniciar y resetear el chat
    } else {
        const content = sections[section];
        if (content) {
            output.innerHTML = content;
        }
        chatInputContainer.style.display = 'none';
    }
    scrollToBottom();
}

// Event listener para atajos de teclado
document.addEventListener('keydown', (e) => {
    if (input === document.activeElement) return;
    switch (e.key) {
        case '1': showSection('about'); break;
        case '2': showSection('skills'); break;
        case '3': showSection('projects'); break;
        case '4': showSection('contact'); break;
        case '5': showSection('chatbot'); break;
    }
});

// Event listener para el input del chat
input.addEventListener('keydown', async (e) => {
    if (e.key !== 'Enter') return;

    const command = input.value.trim();
    if (!command) return;

    const commandLine = document.createElement('div');
    commandLine.innerHTML = `<div class="command-output"><span class="prompt">YOU> </span><span>${command}</span></div>`;
    output.appendChild(commandLine);
    
    scrollToBottom();
    
    input.value = '';

    if (command.toLowerCase() === 'exit') {
        showSection('about');
        return;
    }

    commandHistory.unshift(command);
    historyIndex = -1;
    await handleChatMessage(command);
});

// Función para manejar los mensajes del chat
async function handleChatMessage(message) {
    const thinkingElem = document.createElement('div');
    thinkingElem.classList.add('command-output');
    thinkingElem.textContent = 'SAM-AI está pensando...';
    output.appendChild(thinkingElem);
    
    scrollToBottom();

    try {
        const response = await fetch(`${API_BASE_URL}/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: message }),
        });

        output.removeChild(thinkingElem);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ detail: 'Respuesta de error no válida.' }));
            throw new Error(errorData.detail || 'La petición a la API falló');
        }

        const data = await response.json();
        const answerElem = document.createElement('div');
        answerElem.classList.add('command-output');
        answerElem.innerHTML = `<span class="prompt">SAM-AI> </span>${data.answer}`;
        output.appendChild(answerElem);

    } catch (error) {
        if (thinkingElem.parentNode === output) {
            output.removeChild(thinkingElem);
        }
        const errorElem = document.createElement('div');
        errorElem.classList.add('command-output', 'error');
        errorElem.textContent = `Error: No se pudo conectar con SAM-AI. Detalles: ${error.message}`;
        output.appendChild(errorElem);
    }
    
    scrollToBottom();
}

// Event listener para cargar el contenido inicial
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#navbar span').forEach(item => {
        item.addEventListener('click', () => showSection(item.dataset.section));
    });

    // Muestra la sección 'about' por defecto al cargar la página
    showSection('about');
});
