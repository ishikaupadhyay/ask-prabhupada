// components/QuoteCard.jsx
// Displays a retrieved quote with its source and topic tag

export default function QuoteCard({ quote, source, topic }) {
  return (
    // Animated card that slides up when it appears
    <div
      className="animate-reveal"
      style={{
        background: 'linear-gradient(135deg, #FFF8EC 0%, #FDF0D5 100%)',
        border: '1px solid rgba(201,164,74,0.35)',
        borderRadius: '16px',
        padding: '2.5rem 2rem',
        boxShadow: '0 8px 40px rgba(139,99,71,0.12), 0 2px 8px rgba(139,99,71,0.08)',
        position: 'relative',
        overflow: 'hidden',
        maxWidth: '680px',
        margin: '0 auto',
      }}
    >
      {/* Decorative top-left corner accent */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '80px', height: '80px',
        background: 'radial-gradient(circle at top left, rgba(232,118,10,0.10) 0%, transparent 70%)',
        borderRadius: '0 0 100% 0',
      }} />

      {/* Opening quotation mark */}
      <div style={{
        fontFamily: 'Cormorant Garamond, Georgia, serif',
        fontSize: '6rem',
        lineHeight: 0.7,
        color: 'rgba(201,164,74,0.25)',
        marginBottom: '0.5rem',
        userSelect: 'none',
      }}>"</div>

      {/* Quote Text */}
      <blockquote style={{
        fontFamily: 'EB Garamond, Georgia, serif',
        fontSize: '1.3rem',
        lineHeight: 1.75,
        color: '#2A1005',
        fontStyle: 'italic',
        marginBottom: '1.75rem',
        fontWeight: 400,
      }}>
        {quote}
      </blockquote>

      {/* Thin gold divider */}
      <div style={{
        height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(201,164,74,0.6), transparent)',
        marginBottom: '1.25rem',
      }} />

      {/* Source label */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '0.7rem',
          letterSpacing: '0.12em',
          color: '#8B6347',
          textTransform: 'uppercase',
        }}>
          Source:
        </span>
        <span style={{
          fontFamily: 'EB Garamond, Georgia, serif',
          fontSize: '1rem',
          color: '#5C3317',
          fontWeight: 500,
        }}>
          {source}
        </span>

        {/* Optional topic tag */}
        {topic && (
          <span style={{
            marginLeft: 'auto',
            fontFamily: 'Cinzel, serif',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#E8760A',
            background: 'rgba(232,118,10,0.10)',
            border: '1px solid rgba(232,118,10,0.25)',
            borderRadius: '999px',
            padding: '3px 12px',
          }}>
            {topic}
          </span>
        )}
      </div>
    </div>
  );
}
