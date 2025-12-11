// src/pages/Landing.jsx
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', padding: 24 }}>
      <header style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <h1 style={{ fontSize: 22 }}>FuboticsAI Chat</h1>
        <div>
          <Link to="/auth">Sign in</Link>
        </div>
      </header>

      <main style={{ display:'flex', gap: 24, marginTop: 40 }}>
        <section style={{ flex: 1 }}>
          <h2 style={{ fontSize: 32, marginBottom: 16 }}>Private chat, saved history, simple UI</h2>
          <p style={{ marginBottom: 20 }}>Log in to start a private chat with AI. Your conversations are stored securely and available in History.</p>
          <div style={{ display:'flex', gap:12 }}>
            <Link to="/auth" style={{ padding:'10px 16px', background:'#4f46e5', color:'white', borderRadius:8 }}>Get Started</Link>
            <a href="#features" style={{ padding:'10px 16px', border:'1px solid #ddd', borderRadius:8 }}>Features</a>
          </div>
        </section>
      <aside className="hero-grid" aria-hidden="true">
        <img src="https://images.unsplash.com/photo-1559526324-593bc073d938?w=800&q=60&auto=format&fit=crop" alt="hero1" />
        <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=60&auto=format&fit=crop" alt="hero2" />
        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=60&auto=format&fit=crop" alt="hero3" />
        <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=60&auto=format&fit=crop" alt="hero4" />
      </aside>

      </main>

      <section id="features" style={{ marginTop: 40 }}>
        <h3>Features</h3>
        <ul>
          <li>Login / Signup</li>
          <li>New Chat vs History</li>
          <li>Read-only Conversation View from History</li>
        </ul>
      </section>
    </div>
  );
}
