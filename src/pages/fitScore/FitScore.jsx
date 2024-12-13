import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { getFitScores } from "../../services/api";
import "./fitScoreList.scss";

const FitScore = () => {
  const [fitScores, setFitScores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jobType, setJobType] = useState("TECNOLOGIA");

  const fetchFitScores = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFitScores(jobType);
      console.log(data); // Verifique os dados retornados pela API
      setFitScores(data);
    } catch (err) {
      console.error("Erro ao buscar fitScores:", err);
      setError("Não foi possível carregar os fitScores.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="fit-score-container">
        <h1>Visualização dos FitScores</h1>
        {error && <p className="error">{error}</p>}
        <div className="filter-container">
          <label htmlFor="jobType">Selecione o Tipo de Vaga:</label>
          <select
            id="jobType"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="TECNOLOGIA">Tecnologia</option>
            <option value="ADMINISTRACAO">Administração</option>
            <option value="MARKETING">Marketing</option>
            <option value="SAUDE">Saude</option>
            <option value="ENGENHARIA">Engenharia</option>
            <option value="EDUCACAO">Educação</option>
            <option value="COMERCIO">Comercio</option>
            <option value="INDUSTRIA">Industria</option>
            <option value="LOGISTICA">Logística</option>
            <option value="ARTE">Artes</option>
          </select>
          <button onClick={fetchFitScores} disabled={loading}>
            {loading ? "Carregando..." : "Carregar FitScores"}
          </button>
        </div>
        <div className="fit-score-grid">
          {fitScores.length === 0 ? (
            <p>Nenhum FitScore disponível.</p>
          ) : (
            fitScores.map((fitScore, index) => (
              <div className="fit-score-card" key={index}>
                <h2>{fitScore.name}</h2>  {/* Nome do candidato */}
                <p><strong>FitScore:</strong> {fitScore.fitScore}</p>  {/* FitScore do candidato */}
              </div>
            ))
          )}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default FitScore;
