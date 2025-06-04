import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './cadastro.css';

function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Enviando cadastro:', formData);

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      setSuccess('');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      console.log('Resposta do cadastro:', response.data);
      setSuccess('Cadastro realizado com sucesso!');
      setError('');
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error('Erro no cadastro:', err);
      setError('Erro ao realizar cadastro: ' + (err.response?.data?.message || err.message));
      setSuccess('');
    }
  };

  return (
    <div className="signup-container">
      <div className="left-panel">
        <h1>Juntos, Transformamos Vidas</h1>
        <p>Crie sua conta em minutos e comece a fazer a diferença hoje</p>
      </div>
      <div className="right-panel">
        <h2>Crie sua conta</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              name="name"
              placeholder="Digite seu nome de usuário..."
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            E-mail:
            <input
              type="email"
              name="email"
              placeholder="Digite seu e-mail..."
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Senha:
            <input
              type="password"
              name="password"
              placeholder="Digite sua senha..."
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Confirme sua senha:
            <input
              type="password"
              name="confirmPassword"
              placeholder="Digite sua senha de novo..."
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Finalizar Cadastro</button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;