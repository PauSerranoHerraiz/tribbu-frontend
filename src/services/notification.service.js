import axios from "axios";

class NotificationService {
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

  getNotifications = () => {
    return this.api.get("/api/notifications");
  };

  getNotificationsByTribbu = (tribbuId) => {
    return this.api.get(`/api/notifications/tribbu/${tribbuId}`);
  };

  markAsRead = (notificationId) => {
    return this.api.patch(`/api/notifications/${notificationId}/read`);
  };

  markAllAsRead = () => {
    return this.api.patch("/api/notifications/mark-all-read");
  };

  deleteNotification = (notificationId) => {
    return this.api.delete(`/api/notifications/${notificationId}`);
  };

  getUnreadCount = () => {
    return this.api.get("/api/notifications/unread/count");
  };
}

const notificationService = new NotificationService();
export default notificationService;