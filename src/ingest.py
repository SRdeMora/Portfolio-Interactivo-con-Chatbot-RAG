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
