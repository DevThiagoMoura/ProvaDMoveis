// services/api.js
import axios from "axios";

// ⚙️ Endereço da API (ajustado para sua rede)
const BASE_URL = "http://10.49.3.25:4000";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ================================
// 🔐 AUTENTICAÇÃO
// ================================
export async function login(username, password) {
  const response = await api.post("/users/login", { username, password });
  return response.data;
}

export async function register(username, password) {
  const response = await api.post("/users/register", { username, password });
  return response.data;
}

// ================================
// 📦 CRUD DE ITENS
// ================================
export async function getItems(token) {
  const response = await api.get("/items", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function createItem(name, token) {
  const response = await api.post(
    "/items",
    { name },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}

export async function updateItem(id, name, token) {
  const response = await api.put(
    `/items/${id}`,
    { name },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}

export async function deleteItem(id, token) {
  const response = await api.delete(`/items/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export default api;
