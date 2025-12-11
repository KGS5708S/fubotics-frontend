// src/pages/ConversationView.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

export default function ConversationView() {
  const { id } = useParams();
  const [conv, setConv] = useState(null);
  const nav = useNavigate();

  useEffect(()=> {
    API.get(`/conversation/${id}`)
      .then(r => setConv(r.data))
      .catch(err => {
        console.error(err);
        // handle 401/404
      });
  }, [id]);

  if (!conv) return <div style={{ padding:24 }}>Loading...</div>;

  return (
    <div style={{ padding: 16 }}>
      <button onClick={()=>nav('/history')}>Back</button>
      <h3 style={{ marginTop:8 }}>{conv.title}</h3>
      <div style={{ marginTop:12 }}>
        {conv.messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.sender === 'user' ? 'right' : 'left', marginBottom:8 }}>
            <div style={{ display:'inline-block', padding:10, borderRadius:8, background: m.sender==='user' ? '#dbeafe' : '#f3f4f6' }}>
              {m.text}
              <div style={{ fontSize:11, color:'#6b7280' }}>{new Date(m.created_at).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
