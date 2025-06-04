import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './sidebar';
import './editar.css';

const EditCampanha = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goal: '',
    image: null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampanha = async () => {
      try {
        console.log(`Buscando campanha com ID ${id}`);
        const response = await axios.get(`http://localhost:5000/api/campanhas/${id}`);
        const { title, description, goal } = response.data;
        setFormData({ title, description, goal: goal.toString(), image: null });
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar campanha: ' + (err.response?.data?.message || err.message));
        setLoading(false);
      }
    };
    fetchCampanha();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('goal', formData.goal);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      console.log(`Enviando PUT para http://localhost:5000/api/campanhas/${id}`);
      await axios.put(`http://localhost:5000/api/campanhas/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess('Campanha atualizada com sucesso!');
      setError('');
      setTimeout(() => navigate(`/campanha/${id}`), 2000);
    } catch (err) {
      setError('Erro ao atualizar campanha: ' + (err.response?.data?.message || err.message));
      setSuccess('');
    }
  };

  return (
    <div className="edit-campanha-container">
      <Sidebar />
      <main className="edit-campanha-content">
        <h2>Editar Campanha</h2>
        {loading && <p>Carregando campanha...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        {!loading && (
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
            <label>Nova imagem (opcional):</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
            <button type="submit">Salvar Alterações</button>
          </form>
        )}
      </main>
    </div>
  );
};

export default EditCampanha;