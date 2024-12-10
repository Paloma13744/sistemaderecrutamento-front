import { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { postFuncion } from "../../services/api"; 
import './vagaform.scss';

export default function VagaForm() {
  const [vaga, setVaga] = useState({
    id: null,  
    title: '',
    description: '',
    enterprise: '',
    location: '',
    modality: '',
    salary: '',
    tipoDeJob: '',  
    postingDate: '',
    expiredDate: '',
    jobVisibility: '', // Novo campo para visibilidade da vaga
    isActive: true, // Campo interno com valor default true
  });

  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVaga((prevVaga) => ({ ...prevVaga, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!vaga.title) errors.title = 'O campo título é obrigatório.';
    if (!vaga.description) errors.description = 'O campo descrição é obrigatório.';
    if (!vaga.salary || isNaN(parseFloat(vaga.salary)) || parseFloat(vaga.salary) <= 0) {
      errors.salary = 'O salário deve ser um número maior que zero e no formato correto (ex: 1848.40).';
    }
    if (!vaga.location) errors.location = 'O campo localização é obrigatório.';
    if (!vaga.modality) errors.modality = 'O campo modalidade de trabalho é obrigatório.';
    if (!vaga.tipoDeJob) errors.tipoDeJob = 'O campo tipo de trabalho é obrigatório.';
    if (!vaga.enterprise) errors.enterprise = 'O campo empresa é obrigatório.';
    if (!vaga.postingDate) errors.postingDate = 'A data de postagem é obrigatória.';
    if (!vaga.expiredDate) errors.expiredDate = 'A data de expiração é obrigatória.';
    if (!vaga.jobVisibility) errors.jobVisibility = 'A visibilidade da vaga é obrigatória.'; // Validação para jobVisibility
    return errors;
  };

  const resetForm = () => {
    setVaga({
      id: null,  
      title: '',
      description: '',
      enterprise: '',
      location: '',
      modality: '',
      salary: '',
      tipoDeJob: '',  
      postingDate: '',
      expiredDate: '',
      jobVisibility: '', // Resetando o campo jobVisibility
      isActive: true, // Mantendo o valor default true para isActive
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    setFormErrors({});

    try {
      await postFuncion(vaga);  // Enviar a vaga incluindo o campo isActive
      alert("Vaga cadastrada com sucesso!");
      resetForm();
    } catch (error) {
      console.error("Erro na requisição:", error.response?.data || error.message);
      alert("Erro ao cadastrar vaga. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vaga-form-container">
      <Header />
      <form onSubmit={handleSubmit} className="vaga-form">
        <h2 className="vaga-form-title">Cadastro de Vagas</h2>

        <div className="form-group">
          <label htmlFor="title" className="form-label">Título</label>
          <input
            id="title"
            name="title"
            type="text"
            value={vaga.title}
            onChange={handleChange}
            className="form-input"
            required
          />
          {formErrors.title && <p className="error">{formErrors.title}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">Descrição</label>
          <textarea
            id="description"
            name="description"
            value={vaga.description}
            onChange={handleChange}
            className="form-textarea"
            required
          />
          {formErrors.description && <p className="error">{formErrors.description}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="salary" className="form-label">Salário</label>
          <input
            id="salary"
            name="salary"
            type="number"
            step="0.01" 
            value={vaga.salary}
            onChange={handleChange}
            className="form-input"
            required
          />
          {formErrors.salary && <p className="error">{formErrors.salary}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="location" className="form-label">Localização</label>
          <input
            id="location"
            name="location"
            type="text"
            value={vaga.location}
            onChange={handleChange}
            className="form-input"
            required
          />
          {formErrors.location && <p className="error">{formErrors.location}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="modality" className="form-label">Modalidade</label>
          <input
            id="modality"
            name="modality"
            type="text"
            value={vaga.modality}
            onChange={handleChange}
            className="form-input"
            required
          />
          {formErrors.modality && <p className="error">{formErrors.modality}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="tipoDeJob" className="form-label">Tipo de Vaga</label>
          <select
            id="tipoDeJob"
            name="tipoDeJob"
            value={vaga.tipoDeJob}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="OPCAO">Selecione uma opção</option>
            <option value="ARTE">Arte</option>
            <option value="ADMINISTRACAO">Administração</option>
            <option value="COMERCIO">Comércio</option>
            <option value="EDUCACAO">Educação</option>
            <option value="ENGENHARIA">Engenharia</option>
            <option value="INDUSTRIA">Indústria</option>
            <option value="LOGISTICA">Logística</option>
            <option value="MARKETING">Marketing</option>
            <option value="TECNOLOGIA">Tecnologia</option>
            <option value="SAUDE">Saúde</option>
            <option value="OUTROS">Outros</option>
          </select>
          {formErrors.tipoDeJob && <p className="error">{formErrors.tipoDeJob}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="enterprise" className="form-label">Empresa</label>
          <input
            id="enterprise"
            name="enterprise"
            type="text"
            value={vaga.enterprise}
            onChange={handleChange}
            className="form-input"
            required
          />
          {formErrors.enterprise && <p className="error">{formErrors.enterprise}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="postingDate" className="form-label">Data de Postagem</label>
          <input
            id="postingDate"
            name="postingDate"
            type="date"
            value={vaga.postingDate}
            onChange={handleChange}
            className="form-input"
            required
          />
          {formErrors.postingDate && <p className="error">{formErrors.postingDate}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="expiredDate" className="form-label">Data de Expiração</label>
          <input
            id="expiredDate"
            name="expiredDate"
            type="date"
            value={vaga.expiredDate}
            onChange={handleChange}
            className="form-input"
            required
          />
          {formErrors.expiredDate && <p className="error">{formErrors.expiredDate}</p>}
        </div>

        {/* Novo campo de JobVisibility com opções HIGH, MEDIUM, LOW */}
        <div className="form-group">
          <label htmlFor="jobVisibility" className="form-label">Urgência da Vaga</label>
          <select
            id="jobVisibility"
            name="jobVisibility"
            value={vaga.jobVisibility}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Selecione uma opção</option>
            <option value="HIGH">Alta</option>
            <option value="MEDIUM">Média</option>
            <option value="LOW">Baixa</option>
          </select>
          {formErrors.jobVisibility && <p className="error">{formErrors.jobVisibility}</p>}
        </div>

        <button type="submit" className="form-button" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
      <Footer />
    </div>
  );
}
