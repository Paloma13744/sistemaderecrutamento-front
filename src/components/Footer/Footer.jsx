import './footer.scss';

const Footer = () => {
  return (
    <div className="quem-somos">
      <h3>Quem Somos</h3>
      <p>
            {`A Talent Fusion é uma pequena empresa de recrutamento especializada em conectar empresas e 
    profissionais com talento excepcional.\n
    Nosso objetivo é entender as necessidades de cada cliente e as habilidades de cada candidato, 
    criando uma fusão perfeita entre as duas partes.\n
    Acreditamos no poder das conexões humanas e trabalhamos para construir equipes fortes e bem-sucedidas, 
    oferecendo soluções de recrutamento personalizadas e ágeis.`}
      </p>
      <p className="copyright">&copy; 2024 Talent Fusion</p>
    </div>
  );
};

export default Footer;
