import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './sidebar';
import './cdetalhes.css';

const CampanhaDetalhes = () => {
  const { id } = useParams();
  const [campanha, setCampanha] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [donationAmount, setDonationAmount] = useState('');
  const [donationError, setDonationError] = useState('');
  const [donationSuccess, setDonationSuccess] = useState('');

  useEffect(() => {
    const fetchCampanha = async () => {
      try {
        console.log(`Buscando campanha com ID ${id}`);
        const response = await axios.get(`http://localhost:5000/api/campanhas/${id}`);
        console.log('Campanha recebida:', response.data);
        setCampanha(response.data);
        setError('');
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message;
        setError('Erro ao carregar campanha: ' + errorMessage);
        console.error('Erro:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCampanha();
  }, [id]);

  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    if (!donationAmount || donationAmount <= 0) {
      setDonationError('Por favor, insira um valor válido para a doação.');
      return;
    }

    try {
      console.log(`Enviando doação de R$${donationAmount} para campanha ${id}`);
      const response = await axios.post(`http://localhost:5000/api/campanhas/${id}/doacoes`, {
        amount: parseFloat(donationAmount),
      });
      setCampanha(response.data.campanha);
      setDonationSuccess('Doação realizada com sucesso!');
      setDonationError('');
      setDonationAmount('');
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setDonationError('Erro ao realizar doação: ' + errorMessage);
      setDonationSuccess('');
      console.error('Erro:', err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Tem certeza que deseja excluir esta campanha?')) return;
    try {
      console.log(`Enviando DELETE para http:/?localhost:5000/api/campanhas/${id}`);
      await axios.delete(`http://localhost:5000/api/campanhas/${id}`);
      setTimeout(() => navigate('/campanhas'), 1000);
    } catch (err) {
      setError('Erro ao excluir campanha: ' + (err.response?.data?.message || err.message));
      console.error('Erro:', err);
    }
  };

  return (
    <div className="detalhes-container">
      <Sidebar />
      <main className="detalhes-content">
        <h2>Detalhes da Campanha</h2>
        {loading && <p>Carregando campanha...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {campanha && (
          <div className="campanha-detalhes">
            <h3>{campanha.title}</h3>
            <p>{campanha.description}</p>
            <p>Meta: R${campanha.goal.toLocaleString()}</p>
            <p>Arrecadado: R${(campanha.totalRaised || 0).toLocaleString()}</p>
            <p>Progresso: {((campanha.totalRaised || 0) / campanha.goal * 100).toFixed(2)}%</p>
            <p>Criada em: {new Date(campanha.createdAt).toLocaleDateString()}</p>
            {campanha.image && (
              <img src={`http://localhost:5000/${campanha.image}`} alt={campanha.title} className="campanha-image" />
            )}
            <div className="action-buttons">
              <Link to={`/editar-campanha/${id}`} className="edit-button">Editar Campanha</Link>
              <button onClick={handleDelete} className="delete-button">Excluir Campanha</button>
            </div>
            <div className="donation-section">
              <h4>Faça uma Doação</h4>
              {donationError && <p style={{ color: 'red' }}>{donationError}</p>}
              {donationSuccess && <p style={{ color: 'green' }}>{donationSuccess}</p>}
              <form onSubmit={handleDonationSubmit}>
                <label>
                  Valor da doação (R$):
                  <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    placeholder="Digite o valor"
                    min="1"
                    step="0.01"
                    required
                  />
                </label>
                <button type="submit">Doar</button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CampanhaDetalhes;