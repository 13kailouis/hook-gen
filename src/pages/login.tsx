import Head from 'next/head'
import { useAuth } from '@/components/AuthProvider'
import { useRouter } from 'next/router'
import { useEffect, CSSProperties } from 'react'
import { FcGoogle } from 'react-icons/fc'

export default function Login() {
  const { user, loading, login } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      const next = (router.query.next as string) || '/builder'
      router.replace(next)
    }
  }, [loading, user, router])

  /* ---- Inline Styles (no Tailwind) ---- */
  const container: CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem 1rem',
    background: 'linear-gradient(135deg, #000000 0%, #111827 50%, #0f172a 100%)',
  }

  const highlight = 'var(--highlight-color)'

  const card: CSSProperties = {
    width: '100%',
    maxWidth: 420,
    padding: '2.5rem',
    borderRadius: 20,
    background: 'rgba(15, 23, 42, 0.8)',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.4)',
    color: '#ffffff',
  }

  const heading: CSSProperties = {
    fontSize: '1.875rem',
    fontWeight: 800,
    margin: 0,
    textAlign: 'center',
    letterSpacing: '-0.02em',
  }

  const subtext: CSSProperties = {
    marginTop: '0.5rem',
    fontSize: '0.875rem',
    color: '#9ca3af',
    textAlign: 'center',
  }

  const button: CSSProperties = {
    marginTop: '2rem',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
    fontWeight: 600,
    border: '1px solid #374151',
    borderRadius: 12,
    background: '#1f2937',
    color: '#ffffff',
    cursor: loading ? 'not-allowed' : 'pointer',
    opacity: loading ? 0.6 : 1,
    transition: 'background 0.2s ease, transform 0.2s ease',
  }

  const buttonHover: CSSProperties = {
    background: '#111827',
    transform: 'translateY(-1px)',
  }

  const terms: CSSProperties = {
    marginTop: '1.5rem',
    fontSize: '0.75rem',
    color: '#6b7280',
    textAlign: 'center',
  }

  const link: CSSProperties = {
    textDecoration: 'underline',
    color: '#9ca3af',
  }

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Inter:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div style={container}>
      <div style={card}>
        <header>
          <h1 style={heading}>
            Masuk ke <span style={{ color: highlight }}>HookFreak</span>
          </h1>
          <p style={subtext}>Satu klik untuk mulai membangun hook viral</p>
        </header>

        <button
          onClick={login}
          disabled={loading}
          style={button}
          onMouseEnter={e => Object.assign(e.currentTarget.style, buttonHover)}
          onMouseLeave={e => Object.assign(e.currentTarget.style, button)}
        >
          {loading ? (
            <svg
              style={{ height: 20, width: 20, animation: 'spin 1s linear infinite', color: highlight }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                opacity="0.25"
              />
              <path
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
                opacity="0.75"
              />
            </svg>
          ) : (
            <>
              <FcGoogle style={{ height: 20, width: 20 }} />
              <span>Login dengan Google</span>
            </>
          )}
        </button>

        <p style={terms}>
          Dengan login Anda menyetujui{' '}
          <a href="/terms" style={link}>
            Syarat & Ketentuan
          </a>
          .
        </p>
      </div>

      {/* keyframes for spinner */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      </div>
    </>
  )
}
