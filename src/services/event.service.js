import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("authToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const getEventsByTribbu = tribbuId =>
  api.get(`/events?tribbuId=${tribbuId}`);

const getEventById = eventId =>
  api.get(`/events/${eventId}`);

const createEvent = data =>
  api.post("/events", data);

const updateEvent = (eventId, data) =>
  api.put(`/events/${eventId}`, data);

const deleteEvent = eventId =>
  api.delete(`/events/${eventId}`);

export default {
  getEventsByTribbu,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};