import axios from "axios";

class TribbusService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005",
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  createTribbu = (requestBody) => {
    return this.api.post("/api/tribbus", requestBody);
  };

  getAllTribbus = () => {
    return this.api.get("/api/tribbus");
  };

  getTribbu = (id) => {
    return this.api.get(`/api/tribbus/${id}`);
  };

  updateTribbu = (id, requestBody) => {
    return this.api.put(`/api/tribbus/${id}`, requestBody);
  };

  deleteTribbu = (id) => {
    return this.api.delete(`/api/tribbus/${id}`);
  };
}

const tribbusService = new TribbusService();

export default tribbusService;
