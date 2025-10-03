const output = document.getElementById('output');
const input = document.getElementById('input');
const chatInputContainer = document.getElementById('chat-input-container');

let commandHistory = [];
let historyIndex = -1;

const sections = {
    'about': `
<div class="section-title">--- BIOGRAFÍA ---</div>

Lingüista Computacional con base en Filología Hispánica, experto en PLN, Machine Learning y modelos Transformer (BERT, GPT). Mi experiencia abarca la ingeniería de prompts, el desarrollo de agentes conversacionales y la creación de automatizaciones con herramientas no-code.
`,
    'skills': `
<div class="section-title">--- HABILIDADES TÉCNICAS ---</div>

<div class="skill-category"><span class="highlight">Áreas de PLN / Machine Learning:</span> Análisis de Sentimiento, Clasificación de Textos, Named Entity Recognition (NER), Topic Modeling (LDA), Word Embeddings (Word2Vec, GloVe), Modelos Transformer (BERT, GPT), Chatbots y Asistentes Virtuales, Traducción Automática, Web Scraping.</div>

<div class="skill-category"><span class="highlight">Lenguajes de Programación:</span> Python.</div>

<div class="skill-category"><span class="highlight">Bibliotecas y Frameworks de PLN/ML:</span> NLTK, spaCy, Scikit-learn, Gensim, TensorFlow, Keras, Hugging Face Transformers.</div>

<div class="skill-category"><span class="highlight">Herramientas y Tecnologías:</span> Jupyter Notebooks, Git, SQL (básico), APIs REST, n8n.</div>

<div class="skill-category"><span class="highlight">Competencias Interpersonales:</span> Liderazgo de Equipos, Gestión de Proyectos, Optimización de Procesos, Resolución de Problemas, Habilidades de Comunicación.</div>
`,
    'projects': `
<div class="section-title">--- PROYECTOS DESTACADOS ---</div>

<div class="project-item">
  <span class="highlight">Análisis de Sentimiento para Reseñas de Productos</span>
  <div><span class="highlight">Descripción:</span> Una API que clasifica el texto de reseñas en positivo, negativo o neutro usando un modelo Transformer afinado.</div>
  <div><span class="highlight">Tecnologías:</span> Python, FastAPI, Hugging Face Transformers, Scikit-learn.</div>
  <div><span class="highlight">Enlace:</span> <a href="https://github.com/samuel-rdm/sentiment-analyzer" target="_blank">github.com/samuel-rdm/sentiment-analyzer</a></div>
</div>

<div class="project-item">
  <span class="highlight">Asistente de Documentación Técnica (Chatbot RAG)</span>
  <div><span class="highlight">Descripción:</span> Un chatbot que responde preguntas sobre una base de código compleja. Utiliza RAG para extraer contexto de la documentación y generar respuestas precisas.</div>
  <div><span class="highlight">Tecnologías:</span> LangChain, OpenAI API, ChromaDB, Python.</div>
  <div><span class="highlight">Enlace:</span> <a href="https://github.com/samuel-rdm/doc-assistant-bot" target="_blank">github.com/samuel-rdm/doc-assistant-bot</a></div>
</div>

<div class="project-item">
  <span class="highlight">Extractor y Resumidor de Noticias</span>
  <div><span class="highlight">Descripción:</span> Un script automatizado que extrae el contenido de artículos de noticias a partir de una URL y genera un resumen conciso de 3-4 frases.</div>
  <div><span class="highlight">Tecnologías:</span> spaCy, Gensim, BeautifulSoup, Python.</div>
  <div><span class="highlight">Enlace:</span> <a href="https://github.com/samuel-rdm/news-summarizer" target="_blank">github.com/samuel-rdm/news-summarizer</a></div>
</div>
`,
    'contact': `
<div class="section-title">--- CONTACTO ---</div>

<div class="contact-item"><span class="highlight">Email:</span> <a href="mailto:devai.srm@gmail.com" style="color: white;">devai.srm@gmail.com</a></div>
<div class="contact-item"><span class="highlight">Móvil:</span> <span style="color: white;">629 308 432</span></div>
<div class="contact-item"><span class="highlight">LinkedIn:</span> <a href="URL_DE_TU_LINKEDIN" target="_blank" style="color: white;">LinkedIn</a></div>
<div class="contact-item"><span class="highlight">GitHub:</span> <a href="URL_DE_TU_GITHUB" target="_blank" style="color: white;">GitHub</a></div>
<div class="contact-item"><span class="highlight">Portfolio:</span> <a href="URL_DE_TU_LANDING_PAGE" target="_blank" style="color: white;">Portfolio</a></div>
`
};

function showSection(section) {
    // Update active class on navbar
    document.querySelectorAll('#navbar span').forEach(item => {
        if (item.dataset.section === section) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    output.innerHTML = ''; // Clear previous output

    if (section === 'chatbot') {
        output.innerHTML = '<div class="command-output">Switched to AI assistant mode. Type your questions or type <span class="highlight">exit</span> to leave.</div>';
        chatInputContainer.style.display = 'flex';
        input.focus();
    } else {
        const content = sections[section];
        if (content) {
            output.innerHTML = content;
        }
        chatInputContainer.style.display = 'none';
    }
}

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

input.addEventListener('keydown', async (e) => {
    if (e.key !== 'Enter') return;

    const command = input.value.trim();
    if (!command) return;

    const commandLine = document.createElement('div');
    commandLine.innerHTML = `<div class="command-output"><span class="prompt">YOU> </span><span>${command}</span></div>`;
    output.appendChild(commandLine);
    
    input.value = '';

    if (command.toLowerCase() === 'exit') {
        showSection('about'); // Go back to about section
        return;
    }

    commandHistory.unshift(command);
    historyIndex = -1;
    await handleChatMessage(command);
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
        answerElem.innerHTML = `<span class="prompt">SAM-AI> </span>${data.answer}`;
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
    document.querySelectorAll('#navbar span').forEach(item => {
        item.addEventListener('click', () => showSection(item.dataset.section));
    });

    // Show 'about' section by default
    showSection('about');
});