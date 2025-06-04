import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Enviando login para http://localhost:5000/api/users/login');
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });
      console.log('Login bem-sucedido:', response.data);
      setError('');
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao fazer login';
      setError(errorMessage);
      console.error('Erro de login:', err);
    }
  };

  return (
    <div className="login-container">
      <div className="left-panel">
        <h2>Bem-vindo de volta!</h2>
        <p>Faça login para continuar apoiando suas campanhas favoritas.</p>
      </div>
      <div className="right-panel">
        <form onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Digite seu email"
            />
          </label>
          <label>
            Senha:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Digite sua senha"
            />
          </label>
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;