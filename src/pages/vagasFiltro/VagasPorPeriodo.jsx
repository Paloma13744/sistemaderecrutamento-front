import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import "./vagasPorPeriodo.scss";

const VagasPorPeriodo = () => {
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [periodo, setPeriodo] = useState("last-month");

  const fetchVagas = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/jobs/${periodo}`);
      setVagas(response.data);
    } catch (err) {
      console.error("Erro ao buscar vagas:", err);
      setError("Não foi possível carregar as vagas. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="vagas-por-periodo-layout">
        <div className="vagas-por-periodo-container">
          <h1>Vagas por Período</h1>
          {error && <p className="error">{error}</p>}
          <div className="filter-container">
            <label htmlFor="periodo">Selecione o Período:</label>
            <select
              id="periodo"
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
            >
              <option value="last-month">Último Mês</option>
              <option value="last-three-months">Últimos 3 Meses</option>
              <option value="last-six-months">Últimos 6 Meses</option>
            </select>
            <button onClick={fetchVagas} disabled={loading}>
              {loading ? "Carregando..." : "Carregar Vagas"}
            </button>
          </div>
          <div className="vagas-grid">
            {vagas.map((vaga, index) => (
              <div className="vaga-card" key={index}>
                <h2>{vaga.title}</h2>
                <p><strong>Descrição:</strong> {vaga.description}</p>
                <p><strong>Localização:</strong> {vaga.location}</p>
                <p><strong>Empresa:</strong> {vaga.enterprise}</p>
                <p><strong>Área:</strong> {vaga.tipoJob}</p>
                <p><strong>Data:</strong> {new Date(vaga.postingDate).toLocaleDateString("pt-BR")}</p>
                <p><strong>Modalidade:</strong> {vaga.modality}</p>
                <p><strong>Salario:</strong> {vaga.salary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VagasPorPeriodo;
