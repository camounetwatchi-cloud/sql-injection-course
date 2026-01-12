import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "CryptoVault - Secure Crypto Portfolio Management",
  description: "Manage your cryptocurrency portfolio with CryptoVault - The most trusted crypto platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Warning Banner */}
        <div className="warning-banner">
          <span style={{ fontSize: '1.5rem' }}>⚠️</span>
          <div>
            <strong>Educational Demo Site</strong> - This site is intentionally vulnerable for learning purposes.
            Do NOT enter real credentials or personal information.{" "}
            <Link href="/course" style={{ color: '#00ff88', textDecoration: 'underline' }}>
              View the SQL Injection Course →
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
          borderBottom: '1px solid rgba(100, 100, 120, 0.2)'
        }}>
          <Link href="/" style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #00ff88, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textDecoration: 'none'
          }}>
            🔐 CryptoVault
          </Link>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/search" className="nav-link">Search Users</Link>
            <Link href="/login" className="nav-link">Login</Link>
            <Link href="/course" className="nav-link" style={{
              background: 'rgba(0, 255, 136, 0.2)',
              color: '#00ff88'
            }}>
              📚 Course
            </Link>
          </div>
        </nav>

        <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
          {children}
        </main>

        {/* Footer */}
        <footer style={{
          textAlign: 'center',
          padding: '2rem',
          borderTop: '1px solid rgba(100, 100, 120, 0.2)',
          color: '#6b7280',
          marginTop: '4rem'
        }}>
          <p>🎓 SQL Injection Educational Course | For learning purposes only</p>
          <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
            Built with Next.js • PostgreSQL • Deployed on Vercel
          </p>
        </footer>
      </body>
    </html>
  );
}
