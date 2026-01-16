import axios from "axios";

class ChildService {
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
  
 createChild = (childData) => {
    return this.api.post("/api/children", childData);
};
  //createChild = (requestBody) => {
    //return this.api.post("/api/children", requestBody);
  //};

  getChildren = () => {
    return this.api.get("/api/children");
  };

  getChild = (id) => {
    return this.api.get(`/api/children/${id}`);
  };

  updateChild = (id, requestBody) => {
    return this.api.put(`/api/children/${id}`, requestBody);
  };

  deleteChild = (id) => {
    return this.api.delete(`/api/children/${id}`);
  };
}

const childService = new ChildService();

export default childService;