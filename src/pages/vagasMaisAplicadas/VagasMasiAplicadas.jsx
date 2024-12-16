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
          {loading ? (
            <div className="loading">Carregando vagas...</div>
          ) : (
            <div className="vagas-grid">
              {vagas.length === 0 ? (
                <p>Nenhuma vaga encontrada.</p>
              ) : (
                vagas.map((vaga, index) => (
                  <div className="vaga-card" key={index}>
                    <h2>{vaga.title}</h2>
                    <p><strong>Empresa:</strong> {vaga.enterprise}</p> {/* Exibindo empresa */}
                    <p><strong>Salário:</strong> R${vaga.salary.toFixed(2)}</p> {/* Exibindo salário */}
                    <p><strong>Aplicações:</strong> {vaga.applicationCount}</p> {/* Exibindo quantidade de aplicações */}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VagasMaisAplicadas;
