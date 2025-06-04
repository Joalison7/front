import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './sidebar';
import './explorar.css';

const ExplorarCampanhas = () => {
  const [campanhas, setCampanhas] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampanhas = async () => {
      try {
        console.log('Buscando campanhas em http://localhost:5000/api/campanhas');
        const response = await axios.get('http://localhost:5000/api/campanhas');
        console.log('Campanhas recebidas:', response.data);
        setCampanhas(response.data);
        setError('');
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message;
        setError('Erro ao carregar campanhas: ' + errorMessage);
        console.error('Erro:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCampanhas();
  }, []);

  return (
    <div className="explorar-container">
      <Sidebar />
      <main className="explorar-content">
        <h2>Explorar Campanhas</h2>
        {loading && <p>Carregando campanhas...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && campanhas.length === 0 && <p>Nenhuma campanha encontrada.</p>}
        <div className="campanhas-list">
          {campanhas.map((campanha) => (
            <Link to={`/campanha/${campanha._id}`} key={campanha._id} className="campanha-card">
              <h3>{campanha.title}</h3>
              <p>{campanha.description}</p>
              <p>Meta: R${campanha.goal.toLocaleString()}</p>
              {campanha.image && <img src={`http://localhost:5000/${campanha.image}`} alt={campanha.title} className="campanha-image" />}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ExplorarCampanhas;