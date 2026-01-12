import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #00ff88, #a855f7, #3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem'
        }}>
          Your Crypto Portfolio,<br />Secured & Simplified
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: '#a1a1aa',
          maxWidth: '600px',
          margin: '0 auto 2rem'
        }}>
          Track, manage, and grow your cryptocurrency investments with CryptoVault.
          Trusted by over 100,000+ investors worldwide.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link href="/login" className="btn-primary">
            Get Started →
          </Link>
          <Link href="/course" className="btn-danger">
            🔓 Learn to Hack This Site
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        margin: '3rem 0'
      }}>
        {[
          { value: '$2.4B+', label: 'Assets Tracked' },
          { value: '100K+', label: 'Active Users' },
          { value: '50+', label: 'Cryptocurrencies' },
          { value: '99.9%', label: 'Uptime' }
        ].map((stat, i) => (
          <div key={i} className="card" style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              color: '#00ff88'
            }}>
              {stat.value}
            </div>
            <div style={{ color: '#a1a1aa' }}>{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Features Section */}
      <section style={{ margin: '4rem 0' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          Why Choose CryptoVault?
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {[
            {
              icon: '🔒',
              title: 'Bank-Grade Security',
              desc: 'Your assets are protected with military-grade encryption and multi-factor authentication.'
            },
            {
              icon: '📊',
              title: 'Real-Time Analytics',
              desc: 'Track your portfolio performance with live market data and detailed insights.'
            },
            {
              icon: '💱',
              title: 'Multi-Currency Support',
              desc: 'Support for 50+ cryptocurrencies including BTC, ETH, SOL, and more.'
            },
            {
              icon: '🌍',
              title: 'Global Access',
              desc: 'Access your portfolio from anywhere in the world, 24/7.'
            },
            {
              icon: '📱',
              title: 'Mobile Ready',
              desc: 'Fully responsive design works seamlessly on all devices.'
            },
            {
              icon: '🤝',
              title: '24/7 Support',
              desc: 'Our dedicated support team is always here to help you.'
            }
          ].map((feature, i) => (
            <div key={i} className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{feature.icon}</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                {feature.title}
              </h3>
              <p style={{ color: '#a1a1aa' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Course CTA Section */}
      <section className="card" style={{
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(0, 255, 136, 0.2))',
        border: '1px solid rgba(168, 85, 247, 0.3)',
        padding: '3rem'
      }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>
          🎓 Learn SQL Injection Security
        </h2>
        <p style={{
          color: '#a1a1aa',
          maxWidth: '600px',
          margin: '0 auto 1.5rem'
        }}>
          This site has <strong style={{ color: '#ef4444' }}>intentional security vulnerabilities</strong>.
          Learn how SQL Injection attacks work, practice on real examples, and discover how to protect your applications.
        </p>
        <Link href="/course" className="btn-primary">
          Start the Course →
        </Link>
      </section>

      {/* Sample Users (Hint for hackers) */}
      <section style={{ margin: '4rem 0' }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 600,
          marginBottom: '1.5rem'
        }}>
          Featured Users
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem'
        }}>
          {[
            { name: 'Alice', balance: '$15,420.50', joined: 'Jan 2024' },
            { name: 'Bob', balance: '$8,750.25', joined: 'Feb 2024' },
            { name: 'Charlie', balance: '$42,000.00', joined: 'Mar 2024' }
          ].map((user, i) => (
            <div key={i} className="card" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #00ff88, #3b82f6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                {user.name[0]}
              </div>
              <div>
                <div style={{ fontWeight: 600 }}>{user.name}</div>
                <div style={{ color: '#00ff88', fontSize: '0.875rem' }}>{user.balance}</div>
                <div style={{ color: '#6b7280', fontSize: '0.75rem' }}>Joined {user.joined}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
