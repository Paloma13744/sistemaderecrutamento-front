import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { postCandidate } from "../../services/api"; // Importando a função para postar dados
import './candidate.scss';

const CandidateForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skills: [] as string[], // Habilidades como array de strings
    yearsOfExperience: 0,
    isAvailableToRelocate: '', // Agora é uma string que será 'sim' ou 'não'
    location: '',
    jobPreferences: [] as string[], // Preferências de trabalho como array de strings
    expectedSalary: 0,
  });

  const [formError, setFormError] = useState<string | null>(null); // Para mensagens de erro

  // Função para lidar com a mudança de valor de qualquer campo
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Função para lidar com as habilidades
  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      skills: value.split(',').map((skill: string) => skill.trim()), // Dividindo as habilidades por vírgula
    });
  };

  // Função para lidar com as preferências de trabalho
  const handleJobPreferencesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      jobPreferences: value.split(',').map((preference: string) => preference.trim()), // Dividindo as preferências por vírgula
    });
  };

  // Função para lidar com a escolha de disponibilidade para relocação
  const handleRelocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      isAvailableToRelocate: value, // 'sim' ou 'não'
    });
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null); // Limpar erros anteriores

    // Verificar se todos os campos obrigatórios estão preenchidos
    if (!formData.name || !formData.email || !formData.skills.length || formData.isAvailableToRelocate === '') {
      setFormError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    console.log('Form Data:', formData);

    try {
      const result = await postCandidate(formData); // Chama a função postCandidate
      if (result) {
        // Se a requisição for bem-sucedida, limpar o formulário e exibir uma mensagem de sucesso
        alert("Candidato cadastrado com sucesso!");
        setFormData({
          name: '',
          email: '',
          skills: [],
          yearsOfExperience: 0,
          isAvailableToRelocate: '',
          location: '',
          jobPreferences: [],
          expectedSalary: 0,
        });
      }
    } catch (error) {
      console.error('Erro ao enviar os dados do formulário:', error);
      setFormError("Ocorreu um erro ao tentar cadastrar o candidato. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="vaga-form-container">
      <Header />

      <form className="vaga-form" onSubmit={handleSubmit}>
        <div className="vaga-form-title">Formulário de Candidato</div>

        {/* Exibição de erros */}
        {formError && <div className="form-error">{formError}</div>}

        <div className="form-group">
          <label htmlFor="name" className="form-label">Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="skills" className="form-label">Habilidades (separadas por vírgula)</label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={formData.skills.join(', ')}
            onChange={handleSkillsChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="yearsOfExperience" className="form-label">Anos de Experiência</label>
          <input
            type="number"
            id="yearsOfExperience"
            name="yearsOfExperience"
            value={formData.yearsOfExperience}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group relocation-group">
          <label className="form-label">Disponível para Relocar?</label>
          <div className="relocation-options">
            <label className="radio-label">
              <input
                type="radio"
                name="isAvailableToRelocate"
                value="sim"
                checked={formData.isAvailableToRelocate === 'sim'}
                onChange={handleRelocationChange}
              />
              Sim
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="isAvailableToRelocate"
                value="não"
                checked={formData.isAvailableToRelocate === 'não'}
                onChange={handleRelocationChange}
              />
              Não
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="location" className="form-label">Localização</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="jobPreferences" className="form-label">Preferências de Trabalho (separadas por vírgula)</label>
          <input
            type="text"
            id="jobPreferences"
            name="jobPreferences"
            value={formData.jobPreferences.join(', ')}
            onChange={handleJobPreferencesChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="expectedSalary" className="form-label">Salário Esperado</label>
          <input
            type="number"
            id="expectedSalary"
            name="expectedSalary"
            value={formData.expectedSalary}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <button type="submit" className="form-button">Enviar</button>
      </form>

      <Footer />
    </div>
  );
};

export default CandidateForm;
