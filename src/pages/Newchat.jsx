// src/pages/NewChat.jsx
import { useState, useRef } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function NewChat() {
  const [convId, setConvId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef();
  const nav = useNavigate();

  async function startConversation() {
    const res = await API.post('/conversation', { title: 'Chat ' + new Date().toLocaleString() });
    setConvId(res.data.id);
    setMessages([]);
  }

  async function send() {
  if (!text.trim()) return;

  let id = convId;

  // Create a conversation if none exists
  if (!id) {
    const res = await API.post("/conversation", { title: "New Chat" });
    id = res.data.id;
    setConvId(id);
  }

  // Now send the message to a valid conversation
  const res = await API.post(`/conversation/${id}/send`, { text });
  
  // update messages
  setMessages(prev => [...prev, ...res.data.messages]);
  setText("");
}


  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100vh' }}>
      <div style={{ padding:12, borderBottom:'1px solid #eee' }}>
        <button onClick={()=>nav('/dashboard')}>Back</button>
        <button onClick={startConversation} style={{ marginLeft:12 }}>New</button>
        <button onClick={()=>nav('/history')} style={{ marginLeft:12 }}>History</button>
      </div>

      <div style={{ flex:1, overflow:'auto', padding:12 }} ref={listRef}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom:10, textAlign: m.sender === 'user' ? 'right' : 'left' }}>
            <div style={{ display:'inline-block', padding:10, borderRadius:8, background: m.sender==='user' ? '#dbeafe' : '#f3f4f6' }}>
              {m.text}
              <div style={{ fontSize:11, color:'#6b7280' }}>{new Date(m.created_at).toLocaleTimeString()}</div>
            </div>
          </div>
        ))}
        {loading && <div>AI is typing...</div>}
      </div>

      <div style={{ display:'flex', gap:8, padding:12, borderTop:'1px solid #eee' }}>
        <textarea rows={2} value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=> e.key==='Enter' && !e.shiftKey && (e.preventDefault(), send()) } style={{ flex:1 }} />
        <button onClick={send} style={{ padding:'10px 16px' }}>Send</button>
      </div>
    </div>
  );
}
