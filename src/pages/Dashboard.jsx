// src/pages/Dashboard.jsx
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const nav = useNavigate();
  const username = localStorage.getItem('username') || 'User';

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    nav('/auth');
  }

  return (
    <div style={{ padding: 24 }}>
      <header style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <h2>Welcome, {username}</h2>
          <p>Start a new chat or view your saved history.</p>
        </div>
        <div>
          <button onClick={logout} style={{ marginRight:12 }}>Logout</button>
        </div>
      </header>

      <div style={{ display:'flex', gap:16, marginTop:24 }}>
        <Link to="/chat/new" style={{ padding:20, borderRadius:8, border:'1px solid #ddd', width:200, textAlign:'center' }}>
          New Chat
        </Link>
        <Link to="/history" style={{ padding:20, borderRadius:8, border:'1px solid #ddd', width:200, textAlign:'center' }}>
          History
        </Link>
      </div>
    </div>
  );
}
