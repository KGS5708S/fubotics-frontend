// src/App.jsx (replace top-level contents)
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import NewChat from './pages/Newchat';
import History from './pages/History';
import ConversationView from './pages/ConversationView';

function Protected({ children }) {
  return localStorage.getItem('token') ? children : <Navigate to="/auth" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Protected><Dashboard/></Protected>} />
        <Route path="/chat/new" element={<Protected><NewChat/></Protected>} />
        <Route path="/history" element={<Protected><History/></Protected>} />
        <Route path="/conversation/:id" element={<Protected><ConversationView/></Protected>} />
      </Routes>
    </BrowserRouter>
  );
}
