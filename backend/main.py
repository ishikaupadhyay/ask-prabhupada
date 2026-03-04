# main.py — Ask Prabhupāda Backend API
# Built with FastAPI (Python)
# Receives a question, searches quotes.json, returns matching quotes

import json
import random
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# ── App Setup ──────────────────────────────────────────────────────────────────
app = FastAPI(title="Ask Prabhupāda API")

# Allow the Next.js frontend (running on port 3000) to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Load Quote Dataset ─────────────────────────────────────────────────────────
QUOTES_PATH = Path(__file__).parent / "quotes.json"

def load_quotes():
    """Load the quotes from the local JSON file."""
    with open(QUOTES_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

QUOTES = load_quotes()

# ── Request / Response Models ─────────────────────────────────────────────────
class QuestionRequest(BaseModel):
    question: str  # The user's spiritual question

class QuoteResponse(BaseModel):
    found: bool           # Whether a matching quote was found
    quote: str = ""       # The quote text
    source: str = ""      # The source (book / lecture)
    topic: str = ""       # Optional topic tag

# ── Helper: Keyword Matching ──────────────────────────────────────────────────
def find_matching_quotes(question: str) -> list:
    """
    Convert the question to lowercase and check if any keyword
    from each quote's keyword list appears in the question.
    Returns a list of all matching quote objects.
    """
    question_lower = question.lower()
    matches = []

    for quote_obj in QUOTES:
        # Check each keyword defined for this quote
        for keyword in quote_obj.get("keywords", []):
            if keyword in question_lower:
                matches.append(quote_obj)
                break  # No need to check more keywords for this quote

    return matches

# ── Main Endpoint ─────────────────────────────────────────────────────────────
@app.post("/ask", response_model=QuoteResponse)
async def ask_prabhupada(request: QuestionRequest):
    """
    Receive a question from the frontend.
    Search the quote dataset for keyword matches.
    Return one relevant quote, or a 'not found' response.
    """
    question = request.question.strip()

    if not question:
        return QuoteResponse(found=False)

    # Find all quotes whose keywords match words in the question
    matches = find_matching_quotes(question)

    if not matches:
        # No relevant quote found
        return QuoteResponse(found=False)

    # Pick one quote at random from the matching results
    chosen = random.choice(matches)

    return QuoteResponse(
        found=True,
        quote=chosen["quote"],
        source=chosen["source"],
        topic=chosen.get("topic", ""),
    )

# ── Health Check ──────────────────────────────────────────────────────────────
@app.get("/")
async def root():
    return {"message": "Ask Prabhupāda API is running 🙏"}
