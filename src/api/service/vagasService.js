import httpClient from "../httpClient"

const vagasService = {
    getVagas: async () => {
        const response = await httpClient.get("/jobs")
        return response.data
    }
}

export default vagasService