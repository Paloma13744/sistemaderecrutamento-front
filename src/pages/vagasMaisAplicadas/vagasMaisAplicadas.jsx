import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import "./vagasMaisAplicadas.scss";

const VagasMaisAplicadas = () => {
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVagasMaisAplicadas = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/applications/most-applied`);
      setVagas(response.data);
    } catch (err) {
      console.error("Erro ao buscar vagas:", err);
      setError("Não foi possível carregar as vagas. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVagasMaisAplicadas();
  }, []);

  return (
    <>
      <Header />
      <div className="vagas-mais-aplicadas-layout">
        <div className="vagas-mais-aplicadas-container">
          <h1>Vagas Mais Aplicadas</h1>
          {error && <p className="error">{error}</p>}
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
                <p><strong>Aplicações:</strong> {vaga.applicationsCount}</p> {/* Supondo que o campo applicationsCount exista */}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VagasMaisAplicadas;
