// src/pages/History.jsx
import { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

export default function History() {
  const [list, setList] = useState([]);

  useEffect(()=> {
    API.get('/conversations').then(r => setList(r.data)).catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h3>Conversation history</h3>
      <div style={{ marginTop:12 }}>
        {list.length === 0 && <div>No conversations yet.</div>}
        {list.map(c => (
          <div key={c.id} style={{ border:'1px solid #eee', padding:12, borderRadius:8, marginBottom:8, display:'flex', justifyContent:'space-between' }}>
            <div>
              <div style={{ fontWeight:600 }}>{c.title}</div>
              <div style={{ color:'#6b7280', fontSize:13 }}>{c.lastMessageSnippet || 'No messages'}</div>
            </div>
            <div>
              <Link to={`/conversation/${c.id}`}>Open</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
