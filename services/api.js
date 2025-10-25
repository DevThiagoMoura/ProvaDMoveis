// ⚙️ CONFIGURAÇÃO DE CONEXÃO COM A API
// ====================================
// 🔧 ATENÇÃO: Altere o IP abaixo (BASE_URL) conforme onde o projeto for executado.
//
// ▶ Se estiver rodando TUDO no mesmo computador (API + app):
//    use: http://localhost:4000
//
// ▶ Se estiver rodando o app no celular (Expo Go) e a API no computador:
//    use o IP local do computador (veja com "ipconfig" no Windows)
//    Exemplo: http://10.49.3.25:4000
//
// ▶ Se a API estiver hospedada online:
//    use o endereço HTTPS público do servidor.
//
// ====================================


import axios from "axios";

// ⚙️ Endereço da API
const BASE_URL = "http://10.49.3.25:4000"; // <-- troque este IP se for rodar em outro PC

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
