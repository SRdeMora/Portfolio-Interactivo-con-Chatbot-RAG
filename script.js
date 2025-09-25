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