import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import vagasService from "../../api/service/vagasService";
import "./vagaList.scss";


const tipoDeJobDescricao = {
  TECNOLOGIA: 'Tecnologia',
  ADMINISTRACAO: 'Administração',
  MARKETING: 'Marketing',
  SAUDE: 'Saúde',
  ENGENHARIA: 'Engenharia',
  EDUCACAO: 'Educação',
  COMERCIO: 'Comércio',
  INDUSTRIA: 'Indústria',
  LOGISTICA: 'Logística',
  ARTE: 'Arte',
};

const VagaList = () => {
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVagas = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await vagasService.getVagas();
      setVagas(data);
    } catch (err) {
      console.error("Erro ao buscar vagas:", err);
      setError("Não foi possível carregar as vagas.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="vaga-list-container">
        <h1>Visualização das Vagas</h1>
        {error && <p className="error">{error}</p>}
        <button onClick={fetchVagas} disabled={loading}>
          {loading ? "Carregando..." : "Carregar Vagas"}
        </button>
        <div className="vaga-grid">
          {vagas.map((vaga, index) => (
            <div className="vaga-card" key={index}>
              <h2>{vaga.title}</h2>
              <p><strong>Descrição:</strong> {vaga.description}</p>
              <p><strong>Localização:</strong> {vaga.location}</p>
              <p><strong>Empresa:</strong> {vaga.enterprise}</p>
              <p><strong>Área do Job:</strong> {tipoDeJobDescricao[vaga.tipoDeJob] || vaga.tipoDeJob}</p>
              <p><strong>Data:</strong> {new Date(vaga.postingDate).toLocaleDateString("pt-BR")}</p>
              <p><strong>Modalidade:</strong> {vaga.modality}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VagaList;
