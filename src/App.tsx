import './style.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import Home from './pages/home/Home';
import VagaForm from './pages/form/VagaForm';
import VagaList from './pages/List/VagaList';
import CandidateForm from './pages/form/CandidateForm';

const App = () => {
  return (
    <Router>  
      <Routes>
        <Route path="/" element={<Home />} /> {/* Página inicial */}
        <Route path="/vagas" element={<VagaList />} /> {/* Página para visualizar vagas */}
        <Route path="/create-job" element={<VagaForm />} /> {/* Página para cadastrar vagas */}
        <Route path="/candidato" element={<CandidateForm />} /> {/* Página para formulário do candidato */}

      </Routes>
    </Router>  
  );
}

export default App;
