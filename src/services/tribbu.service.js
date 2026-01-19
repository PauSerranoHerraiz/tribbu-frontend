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

  addMemberToTribbu = (tribbuId, userId, role) => {
    return this.api.post(`/api/tribbus/${tribbuId}/members`, { userId, role });
  };

    getUserTribbus = () => {
    return this.api.get("/api/tribbus/user/my-tribbus");
  };

  addMemberToTribbu = (tribbuId, userId, role) => {
    return this.api.post(`/api/tribbus/${tribbuId}/members`, { userId, role });
  };
}

const tribbusService = new TribbusService();

export default tribbusService;