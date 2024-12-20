import './header.scss';
import logo from '../Header/logo.png';
import { Link } from 'react-router-dom'; 


const Header = () => {
    return (
        <div className="header">
            <div className="logo-container">
                <img src={logo} alt="Talent Fusion" className="logo" />
            </div>

            
            <nav className="nav">
                <Link to="/" className="nav-link">Home</Link> 
                <Link to="/vagas" className="nav-link">Visualizar Vagas</Link> 
                <Link to="/create-job" className="nav-link">Cadastrar Vagas</Link> 
                <Link to="/candidato" className="nav-link">Candidato</Link> 
                <Link to="/fitScore" className="nav-link">FitScore</Link> 
                <Link to="/vagas-por-periodo" className="nav-link">Vagas por periodo</Link> 
                <Link to="/vagas-mais-aplicadas" className="nav-link">Vagas mais aplicadas</Link> 

            </nav>


            <div className="profile-icon">
                <i className="fas fa-user-circle"></i>
            </div>
        </div>
    );
}

export default Header;
