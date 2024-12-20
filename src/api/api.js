import axios from "axios";

// Configuração da URL da API
const API_URL = process.env.REACT_APP_API_URL;

// Método para buscar os fitScores
export const getFitScores = async (tipoDeJob) => {
  try {
    console.log("Chamando API:", `${API_URL}/candidates/fitScores?tipoDeJob=${tipoDeJob}`);
    const response = await axios.get(`${API_URL}/candidates/fitScores`, {
      params: { tipoDeJob },
    });

    console.log("Resposta recebida:", response.data);

    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error("Dados inesperados:", response.data);
      throw new Error("Formato de dados inesperado.");
    }
  } catch (error) {
    console.error("Erro ao buscar fitScores:");
    if (error.response) {
      console.error("Erro da API:", error.response.status, error.response.data); // Log detalhado da API
    } else if (error.request) {
      console.error("Nenhuma resposta do servidor:", error.request);
    } else {
      console.error("Erro ao configurar a requisição:", error.message);
    }
    alert("Erro ao carregar os fitScores. Tente novamente mais tarde.");
    throw error; // Repassa o erro para que seja tratado
  }
};

// Método para buscar as vagas mais aplicadas
export const getJobsMostApplied = async () => {
  try {
    const response = await axios.get(`${API_URL}/jobs/most-applied`);
    console.log("Vagas mais aplicadas:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar vagas mais aplicadas:", error.response?.data || error.message);
    throw error;
  }
};



// Método para buscar todas as vagas
export const getFuncion = async () => {
  try {
    console.log("Chamando API:", `${API_URL}/jobs`); // Log da URL chamada
    const response = await axios.get(`${API_URL}/jobs`);
    console.log("Resposta recebida:", response.data); 

    if (Array.isArray(response.data) && response.data.every(item => typeof item === 'object')) {
      return response.data;
    } else {
      console.error("Dados inesperados:", response.data);
      throw new Error("Formato de dados inesperado.");
    }
  } catch (error) {
    console.error("Erro ao buscar dados:");
    if (error.response) {
      console.error("Erro da API:", error.response.status, error.response.data); // Log detalhado da API
    } else if (error.request) {
      console.error("Nenhuma resposta do servidor:", error.request);
    } else {
      console.error("Erro ao configurar a requisição:", error.message);
    }
    alert("Erro ao carregar as vagas. Tente novamente mais tarde.");
    throw error; // Repassa o erro para que seja tratado
  }
};

// Método para buscar vagas do último mês
export const getJobsLastMonth = async () => {
  try {
    const response = await axios.get(`${API_URL}/jobs/last-month`);
    console.log("Vagas do último mês:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar vagas do último mês:", error.response?.data || error.message);
    throw error;
  }
};

// Método para buscar vagas dos últimos três meses
export const getJobsLastThreeMonths = async () => {
  try {
    const response = await axios.get(`${API_URL}/jobs/last-three-months`);
    console.log("Vagas dos últimos três meses:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar vagas dos últimos três meses:", error.response?.data || error.message);
    throw error;
  }
};

// Método para buscar vagas dos últimos seis meses
export const getJobsLastSixMonths = async () => {
  try {
    const response = await axios.get(`${API_URL}/jobs/last-six-months`);
    console.log("Vagas dos últimos seis meses:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar vagas dos últimos seis meses:", error.response?.data || error.message);
    throw error;
  }
};

export const postFuncion = async (vaga) => {
  try {
    const response = await axios.post(`${API_URL}/jobs`, vaga);
    console.log("Código de status:", response.status); // Exibe o status da resposta para depuração

    if (response.status === 201) {
      // Mostra a mensagem de sucesso apenas quando o status for 201
      alert("Vaga cadastrada com sucesso!");
      console.log("Dados retornados:", response.data); // Exibe os dados retornados para depuração
      return response.data;
    }

    return response.data;
  } catch (error) {
    // A resposta do erro pode estar disponível em error.response
    console.error("Erro na requisição:", error.response?.data || error.message);
    alert("Erro ao cadastrar vaga. Tente novamente.");
    throw error; // Lança o erro para ser tratado em outro lugar
  }
};

export const postCandidate = async (candidate) => {
  console.log("Enviando dados do candidato:", candidate); // Log para verificar os dados enviados
  try {
    const response = await axios.post(`${API_URL}/candidates`, candidate);
    console.log("Código de status:", response.status);

    if (response.status === 201) {
      alert("Candidato cadastrado com sucesso!");
      console.log("Dados retornados:", response.data);
      return response.data;
    } else {
      alert("Erro ao cadastrar candidato. Código de erro: " + response.status);
      console.error("Erro ao cadastrar candidato:", response.data);
      return response.data;
    }
  } catch (error) {
    console.error("Erro na requisição:", error.response?.data || error.message);
    alert("Erro ao cadastrar candidato. Tente novamente.");
    throw error;
  }
};
