import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './sidebar';
import './campanha.css';

const CampanhaForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goal: '',
    image: null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Enviando campanha:', formData);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('goal', formData.goal);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/campanhas', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Resposta:', response.data);
      setSuccess(true);
      setError('');
      setFormData({ title: '', description: '', goal: '', image: null });
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      console.error('Erro:', err);
      setError('Erro ao criar campanha: ' + (err.response?.data?.message || err.message));
      setSuccess(false);
    }
  };

  return (
    <div className="campanha-container">
      <Sidebar />
      <main className="campanha-content">
        <h2>Crie Sua Campanha</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>Campanha criada com sucesso!</p>}
        <form onSubmit={handleSubmit}>
          <label>Título da campanha:</label>
          <input
            type="text"
            name="title"
            placeholder="Nome do seu projeto..."
            value={formData.title}
            onChange={handleChange}
            required
          />
          <label>Descrição:</label>
          <textarea
            name="description"
            placeholder="Descrição..."
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
          <label>Meta de arrecadação:</label>
          <input
            type="number"
            name="goal"
            placeholder="Valor necessário..."
            value={formData.goal}
            onChange={handleChange}
            required
          />
          <label>Imagem/Card da campanha:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
          <div className="preview">
            {formData.image && <p>Imagem selecionada: {formData.image.name}</p>}
            <p>Prévia do card</p>
          </div>
          <button type="submit">Criar campanha</button>
        </form>
      </main>
    </div>
  );
};

export default CampanhaForm;