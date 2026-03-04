# 🙏 Ask Prabhupāda

> *"Chant Hare Krishna and your life will become perfect."*
> — Śrīla Prabhupāda

A full-stack spiritual web application that allows users to ask questions and receive relevant quotes from the teachings of **His Divine Grace A. C. Bhaktivedanta Swami Prabhupāda** — the founder of ISKCON and one of the most influential spiritual teachers of the modern era.

---

## ✨ Features

- 🔍 Ask any spiritual question and receive a relevant quote
- 📖 24 authentic quotes across 15 spiritual topics
- 🏷️ Each quote displays its **source** (book / lecture) and **topic tag**
- 💡 Suggestion chips for quick questions
- 📱 Fully mobile responsive
- ⚡ Fast keyword-based search — no AI generation, only real quotes

---

## 🖥️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, React, Tailwind CSS |
| Backend | Python, FastAPI |
| Data | Local JSON dataset |
| Fonts | Cinzel, EB Garamond (Google Fonts) |

---

## 📁 Project Structure

```
ask-prabhupada/
│
├── backend/
│   ├── main.py            ← FastAPI server with /ask endpoint
│   ├── quotes.json        ← 24 quotes across 15 topics
│   └── requirements.txt   ← Python dependencies
│
├── frontend/
│   ├── pages/
│   │   ├── _app.jsx       ← Root app wrapper
│   │   └── index.jsx      ← Main UI page
│   ├── components/
│   │   └── QuoteCard.jsx  ← Quote display card
│   ├── styles/
│   │   └── globals.css    ← Global styles
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
└── README.md
```

---

## 🚀 How to Run Locally

You need **Python 3.9+** and **Node.js 18+** installed.

### 1️⃣ Backend (Terminal 1)

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install fastapi uvicorn[standard] pydantic
uvicorn main:app --reload --port 8000
```

✅ Backend running at: `http://localhost:8000`

---

### 2️⃣ Frontend (Terminal 2)

```bash
cd frontend
npm install
npm run dev
```

✅ App running at: `http://localhost:3000`

---

## 💬 How It Works

1. User types a spiritual question (e.g. *"How can I control my mind?"*)
2. Frontend sends it to the FastAPI backend via `POST /ask`
3. Backend searches the `quotes.json` dataset using **keyword matching**
4. A matching quote is returned with its source and topic
5. If no match found → *"No guidance found. Please try another topic."*

---

## 📚 Topics Covered

| Topic | Example Question |
|---|---|
| 🎵 Chanting | Why should I chant Hare Krishna? |
| 🧠 Mind | How can I control my mind? |
| 🪷 Devotion | What is bhakti? |
| 😊 Happiness | How do I find true happiness? |
| 🌍 Purpose of Life | What is the meaning of life? |
| 💀 Death & Soul | What happens after death? |
| ⚖️ Karma | What is karma? |
| 👨‍🏫 Guru | Do I need a spiritual master? |
| 🍽️ Food | What should a devotee eat? |
| 🌀 Material World | What is maya? |
| 🙏 Prayer | How should I pray to Krishna? |
| ❤️ Love | What is pure love of God? |
| 📖 Scripture | Should I read Bhagavad-gītā? |
| ⏰ Time | How should I use my time? |
| ☮️ Peace | How can there be world peace? |

---

## 🛠️ Adding More Quotes

Open `backend/quotes.json` and add a new entry:

```json
{
  "topic": "your-topic",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "quote": "Your quote text here.",
  "source": "Book or Lecture Name, Year"
}
```

---

## 🙏 About Śrīla Prabhupāda

**A. C. Bhaktivedanta Swami Prabhupāda** (1896–1977) was a Vaishnava monk, translator, and spiritual teacher. He founded the **International Society for Krishna Consciousness (ISKCON)** in 1966 and translated over 70 volumes of Vedic literature into English, including the beloved *Bhagavad-gītā As It Is* and *Śrīmad-Bhāgavatam*.

> *All quotes in this application are from his original books and lectures.*

---

## 👩‍💻 Made with devotion by

**Ishika Upadhyay**

---

*Hare Krishna Hare Krishna Krishna Krishna Hare Hare*
*Hare Rama Hare Rama Rama Rama Hare Hare* 🌸
