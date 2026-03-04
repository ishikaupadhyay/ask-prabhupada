// pages/index.jsx
// Ask Prabhupāda — Main Page
// Users type a spiritual question; the app returns a relevant quote.

import { useState } from "react";
import Head from "next/head";
import QuoteCard from "../components/QuoteCard";

// ── Lotus SVG decoration ──────────────────────────────────────────────────────
function LotusIcon({ size = 48, opacity = 1 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none"
      style={{ opacity }} xmlns="http://www.w3.org/2000/svg">
      {/* Simple stylised lotus using paths */}
      <path d="M32 52 C32 52 14 42 14 28 C14 20 22 16 32 24 C42 16 50 20 50 28 C50 42 32 52 32 52Z"
        fill="rgba(232,118,10,0.15)" stroke="rgba(201,164,74,0.7)" strokeWidth="1.2"/>
      <path d="M32 52 C32 52 20 36 20 24 C24 18 28 20 32 28 C36 20 40 18 44 24 C44 36 32 52 32 52Z"
        fill="rgba(232,118,10,0.18)" stroke="rgba(201,164,74,0.8)" strokeWidth="1"/>
      <path d="M32 52 C32 52 26 38 26 28 C28 24 31 26 32 32 C33 26 36 24 38 28 C38 38 32 52 32 52Z"
        fill="rgba(232,118,10,0.25)" stroke="rgba(232,118,10,0.6)" strokeWidth="0.8"/>
      <circle cx="32" cy="28" r="3" fill="rgba(232,118,10,0.5)" stroke="rgba(201,164,74,0.9)" strokeWidth="0.8"/>
    </svg>
  );
}

// ── Suggested questions ───────────────────────────────────────────────────────
const SUGGESTIONS = [
  "How can I control my mind?",
  "What is the purpose of life?",
  "How do I find peace?",
  "Why should I chant Hare Krishna?",
];

export default function Home() {
  // State for the user's question input
  const [question, setQuestion] = useState("");
  // State for the API response
  const [result, setResult] = useState(null);   // null = not asked yet
  // State for loading indicator
  const [loading, setLoading] = useState(false);
  // State for any error message
  const [error, setError] = useState("");

  // ── Submit handler ────────────────────────────────────────────────────────
  async function handleAsk() {
    const trimmed = question.trim();
    if (!trimmed) return;  // Do nothing if input is empty

    setLoading(true);
    setResult(null);
    setError("");

    try {
      // Send the question to the FastAPI backend
      const response = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed }),
      });

      if (!response.ok) {
        throw new Error("Server error. Please try again.");
      }

      const data = await response.json();
      setResult(data);  // Store the response (found: true/false, quote, source, topic)

    } catch (err) {
      setError("Could not connect to the server. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  }

  // ── Allow pressing Enter to submit ────────────────────────────────────────
  function handleKeyDown(e) {
    if (e.key === "Enter") handleAsk();
  }

  // ── Use a suggestion chip ─────────────────────────────────────────────────
  function useSuggestion(text) {
    setQuestion(text);
    setResult(null);
    setError("");
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <Head>
        <title>Ask Prabhupāda</title>
        <meta name="description" content="Ask spiritual questions and receive wisdom from Śrīla Prabhupāda's teachings." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Cinzel:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      {/* ── Page Wrapper ──────────────────────────────────────────────────── */}
      <main style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '3rem 1.25rem 5rem',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <header className="animate-fade-in-up" style={{
          textAlign: 'center',
          marginBottom: '2.5rem',
          animationDelay: '0s',
        }}>
          {/* Lotus icon */}
          <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
            <LotusIcon size={56} />
          </div>

          {/* Sanskrit Om symbol */}
          <div style={{
            fontFamily: 'serif',
            fontSize: '1.5rem',
            color: 'rgba(201,164,74,0.7)',
            marginBottom: '0.5rem',
            letterSpacing: '0.3em',
          }}>
            ॐ
          </div>

          {/* Main title */}
          <h1 style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(2rem, 6vw, 3.2rem)',
            fontWeight: 500,
            color: '#2A0A0A',
            letterSpacing: '0.06em',
            lineHeight: 1.15,
            marginBottom: '0.6rem',
          }}>
            Ask Prabhupāda
          </h1>

          {/* Ornament divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: 'rgba(201,164,74,0.7)',
            margin: '0.75rem auto',
            maxWidth: '280px',
          }}>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,164,74,0.6))' }} />
            <span style={{ fontSize: '0.85rem' }}>✦</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(201,164,74,0.6))' }} />
          </div>

          {/* Subtitle */}
          <p style={{
            fontFamily: 'EB Garamond, Georgia, serif',
            fontSize: 'clamp(1rem, 3vw, 1.2rem)',
            color: '#8B6347',
            fontStyle: 'italic',
            maxWidth: '440px',
            lineHeight: 1.6,
          }}>
            Seek guidance from the teachings of Śrīla Prabhupāda
          </p>
        </header>

        {/* ── Search Box ──────────────────────────────────────────────────── */}
        <div className="animate-fade-in-up" style={{
          width: '100%',
          maxWidth: '620px',
          marginBottom: '1.5rem',
          animationDelay: '0.15s',
        }}>
          {/* Input + Button row */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            background: 'rgba(255,252,245,0.9)',
            border: '1.5px solid rgba(201,164,74,0.4)',
            borderRadius: '12px',
            padding: '0.5rem 0.5rem 0.5rem 1.25rem',
            boxShadow: '0 4px 24px rgba(139,99,71,0.09)',
            backdropFilter: 'blur(6px)',
          }}>
            {/* Text input */}
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a spiritual question…"
              aria-label="Spiritual question"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontFamily: 'EB Garamond, Georgia, serif',
                fontSize: '1.15rem',
                color: '#2A1005',
                padding: '0.5rem 0',
              }}
            />

            {/* Ask button */}
            <button
              onClick={handleAsk}
              disabled={loading || !question.trim()}
              aria-label="Ask Prabhupāda"
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '0.78rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: loading || !question.trim() ? 'rgba(255,255,255,0.5)' : '#FFF8EC',
                background: loading || !question.trim()
                  ? 'rgba(139,99,71,0.3)'
                  : 'linear-gradient(135deg, #E8760A 0%, #C9A44A 100%)',
                border: 'none',
                borderRadius: '8px',
                padding: '0.65rem 1.4rem',
                cursor: loading || !question.trim() ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                boxShadow: loading || !question.trim() ? 'none' : '0 2px 12px rgba(232,118,10,0.35)',
              }}
            >
              {loading ? "Seeking…" : "Ask"}
            </button>
          </div>

          {/* Suggestion chips */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginTop: '0.9rem',
          }}>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => useSuggestion(s)}
                style={{
                  fontFamily: 'EB Garamond, Georgia, serif',
                  fontSize: '0.9rem',
                  color: '#8B6347',
                  background: 'rgba(201,164,74,0.08)',
                  border: '1px solid rgba(201,164,74,0.3)',
                  borderRadius: '999px',
                  padding: '4px 14px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={e => e.target.style.background = 'rgba(201,164,74,0.18)'}
                onMouseLeave={e => e.target.style.background = 'rgba(201,164,74,0.08)'}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* ── Results Area ─────────────────────────────────────────────────── */}
        <div style={{ width: '100%', maxWidth: '680px' }}>

          {/* Loading spinner */}
          {loading && (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{
                display: 'inline-block',
                width: '36px', height: '36px',
                border: '2.5px solid rgba(201,164,74,0.25)',
                borderTopColor: '#E8760A',
                borderRadius: '50%',
                animation: 'lotus-spin 0.8s linear infinite',
              }} />
              <p style={{
                marginTop: '0.75rem',
                fontFamily: 'EB Garamond, Georgia, serif',
                fontStyle: 'italic',
                color: '#8B6347',
                fontSize: '1rem',
              }}>
                Searching the teachings…
              </p>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div style={{
              textAlign: 'center',
              padding: '1.5rem',
              color: '#9B2226',
              fontFamily: 'EB Garamond, Georgia, serif',
              fontSize: '1rem',
              background: 'rgba(155,34,38,0.06)',
              border: '1px solid rgba(155,34,38,0.2)',
              borderRadius: '10px',
            }}>
              {error}
            </div>
          )}

          {/* Quote found */}
          {result && result.found && (
            <QuoteCard
              quote={result.quote}
              source={result.source}
              topic={result.topic}
            />
          )}

          {/* No quote found */}
          {result && !result.found && (
            <div className="animate-reveal" style={{
              textAlign: 'center',
              padding: '2.5rem 1.5rem',
              background: 'rgba(255,248,236,0.7)',
              border: '1px solid rgba(201,164,74,0.25)',
              borderRadius: '16px',
            }}>
              <LotusIcon size={40} opacity={0.4} />
              <p style={{
                marginTop: '1rem',
                fontFamily: 'EB Garamond, Georgia, serif',
                fontStyle: 'italic',
                color: '#8B6347',
                fontSize: '1.1rem',
                lineHeight: 1.65,
              }}>
                No guidance found for this question.<br />Please try another topic.
              </p>
            </div>
          )}
        </div>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <footer style={{
          marginTop: 'auto',
          paddingTop: '4rem',
          textAlign: 'center',
          fontFamily: 'EB Garamond, Georgia, serif',
          fontSize: '0.9rem',
          color: 'rgba(139,99,71,0.55)',
          fontStyle: 'italic',
        }}>
          All quotes from the teachings of His Divine Grace<br />
          A. C. Bhaktivedanta Swami Prabhupāda
        </footer>

      </main>

      {/* Inline keyframe for loading spinner */}
      <style>{`
        @keyframes lotus-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes reveal {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.7s cubic-bezier(0.16,1,0.3,1) both; }
        .animate-reveal      { animation: reveal  0.6s cubic-bezier(0.16,1,0.3,1) both; }
        input::placeholder { color: rgba(139,99,71,0.5); font-style: italic; }
      `}</style>
    </>
  );
}
