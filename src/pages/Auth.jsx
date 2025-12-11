import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState(''); // use username (not email)
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // for register's display name if you want
  const [error, setError] = useState('');
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      let res;
      if (isLogin) {
        // LOGIN -> POST /api/login { username, password }
        res = await API.post('/login', { username, password });
      } else {
        // REGISTER -> POST /api/register { username, password }
        // if you also want to send a display name to backend, adapt backend too.
        res = await API.post('/register', { username, password });
      }

      const token = res.data.token;
      const savedUsername = res.data.username || username;
      localStorage.setItem('token', token);
      localStorage.setItem('username', savedUsername);
      nav('/dashboard');
    } catch (err) {
      // backend returns JSON like { "error": "..." }
      const serverMsg = err.response?.data?.error || err.response?.data?.message;
      setError(serverMsg || 'Auth failed');
    }
  }

  return (
    <div style={{ padding: 24, maxWidth: 560, margin: '20px auto' }}>
      <h2>{isLogin ? 'Sign in' : 'Create account'}</h2>
      <form onSubmit={handleSubmit} style={{ display:'grid', gap:12 }}>
        {!isLogin && (
          <input placeholder="Display name (optional)" value={name} onChange={e=>setName(e.target.value)} />
        )}
        <input
          placeholder={isLogin ? "Username" : "Choose a username"}
          value={username}
          onChange={e=>setUsername(e.target.value)}
          required
        />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit" style={{ padding: '8px 12px', background: '#374151', color:'white', borderRadius:6 }}>
          {isLogin ? 'Sign in' : 'Register'}
        </button>
        <div>
          <button type="button" onClick={()=> setIsLogin(!isLogin)} style={{ background:'transparent', border:'none', color:'#2563eb' }}>
            {isLogin ? "Create a new account" : "Already have an account? Sign in"}
          </button>
        </div>
        {error && <div style={{ color:'red' }}>{error}</div>}
      </form>
    </div>
  );
}
