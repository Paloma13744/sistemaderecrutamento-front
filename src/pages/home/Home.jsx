
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import imghome from './img-home.png';
import './home.scss';

const Home = () => {
  return (
    <div className='page-container'>
      <Header />

      {/* Seção de informações da empresa */}
      <main className="informacoes">
        <h2>Bem-vindos à Talent Fusion</h2>
        <div className='imghome'>
          <img src={imghome} alt='Logo da Talent Fusion' />
        </div>
        <div className='descricao'>
          <p>
            Na Talent Fusion, inovamos para conectar talentos excepcionais às empresas que buscam crescer e prosperar.<br></br>
            Nossa abordagem personalizada e eficiente revoluciona os processos de recrutamento, garantindo agilidade,
            assertividade e os melhores resultados.
            <br />

            <br></br>Por que escolher a Talent Fusion?<br></br>

            Identificação precisa de talentos alinhados à sua cultura organizacional.<br>
            </br>
            Ferramentas modernas que simplificam e otimizam todo o processo.<br></br>
            Foco na experiência tanto dos candidatos quanto das empresas.
          </p>

  
          <p>
            Se você está em busca de talentos ou oportunidades, a Talent Fusion é o seu parceiro ideal para um futuro de sucesso.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
