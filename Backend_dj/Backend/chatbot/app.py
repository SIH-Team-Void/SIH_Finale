from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage

# Set up environment variables
os.environ["GROQ_API_KEY"] = "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"

# Initialize the chatbot model
model = ChatGroq(model="llama3-8b-8192")

# FastAPI app
app = FastAPI()

# Add CORS middleware to allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins; restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Message format
class ChatMessage(BaseModel):
    content: str

@app.post("/chat")
async def chat_with_ai(message: ChatMessage):
    try:
        # Define system message
        system_message = SystemMessage(content="You are a medical assistant.")
        human_message = HumanMessage(content=message.content)

        # Interact with the model
        response = model.invoke([system_message, human_message])
        return {"response": response.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error occurred: {str(e)}")
