import './style.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import Home from './pages/home/Home';
import VagaForm from './pages/form/VagaForm';
import VagaList from './pages/List/VagaList';
import CandidateForm from './pages/form/CandidateForm';
import FitScore from './pages/fitScore/FitScore';
import VagasPorPeriodo from './pages/vagasFiltro/VagasPorPeriodo';
import VagasMaisAplicadas from './pages/vagasMaisAplicadas/VagasMasiAplicadas';

const App = () => {
  return (
    <Router>  
      <Routes>
        <Route path="/" element={<Home />} /> {/* Página inicial */}
        <Route path="/vagas" element={<VagaList />} /> {/* Página para visualizar vagas */}
        <Route path="/create-job" element={<VagaForm />} /> {/* Página para cadastrar vagas */}
        <Route path="/candidato" element={<CandidateForm />} /> {/* Página para formulário do candidato */}
        <Route path="/fitScore" element={<FitScore />} /> {/* Página fitScore do candidato */}
        <Route path="/vagas-por-periodo" element={<VagasPorPeriodo />} /> {/* Página fitScore do candidato */}
        <Route path="/vagas-por-periodo" element={<VagasPorPeriodo />} /> {/* Página fitScore do candidato */}
        <Route path="/vagas-mais-aplicadas" element={<VagasMaisAplicadas />} /> {/* Página para as vagas mais aplicadas */}
      </Routes>
    </Router>  
  );
}

export default App;
