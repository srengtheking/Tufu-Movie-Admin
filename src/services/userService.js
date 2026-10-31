import api, { assertApiConfigured } from "../config/api";

const API_URL = "/users";

// GET ALL
export async function getUsers() {
  assertApiConfigured();
  const response = await api.get(API_URL);
  return response.data;
}

// GET BY ID
export async function getUserById(id) {
  assertApiConfigured();
  const response = await api.get(`${API_URL}/${id}`);
  return response.data;
}

// CREATE
export async function createUser(user) {
  assertApiConfigured();
  const response = await api.post(API_URL, user);
  return response.data;
}

// UPDATE
export async function updateUser(id, user) {
  assertApiConfigured();
  const response = await api.put(`${API_URL}/${id}`, user);
  return response.data;
}

// DELETE
export async function deleteUser(id) {
  assertApiConfigured();
  await api.delete(`${API_URL}/${id}`);
}
