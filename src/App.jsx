import React from 'react';
import { Routes, Route, useNavigate, Router } from 'react-router-dom';
import './App.css';
import SignupForm from './cadastro';
import LoginForm from './login';
import Dashboard from './dashboard';
import CampanhaForm from './campanha';
import ExplorarCampanhas from './explorar';
import CampanhaDetalhes from './cdetalhes';
import EditCampanha from './editar';

function Landing() {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="app-container">
      <div className="content-container">
        <h1>Juntos Nós Podemos</h1>
        <p>Apoie projetos de impacto social e faça parte da mudança para um mundo mais igualitário</p>
        <button className="btn btn-blue" onClick={handleSignupClick}>
          Quero me cadastrar
        </button>
        <button className="btn btn-yellow" onClick={handleLoginClick}>
          Já tenho uma conta
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/campanha" element={<CampanhaForm />} />
      <Route path="/explorar" element={<ExplorarCampanhas/>} />
      <Route path="/campanha/:id" element={<CampanhaDetalhes/>} />
      <Route path="/editar-campanha/:id" element={<EditCampanha/>} />
    </Routes>
  );
}

export default App;