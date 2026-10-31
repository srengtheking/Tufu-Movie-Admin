import api, { assertApiConfigured } from "../config/api";

const API_URL = "/roles";

// GET ALL
export async function getRoles() {
  assertApiConfigured();
  const response = await api.get(API_URL);

  if (!Array.isArray(response.data)) {
    throw new Error(
      "The roles API did not return a list. Check that the API URL points to the backend.",
    );
  }

  return response.data;
}

// GET BY ID
export async function getRoleById(id) {
  assertApiConfigured();
  const response = await api.get(`${API_URL}/${id}`);
  return response.data;
}

// CREATE
export async function createRole(role) {
  assertApiConfigured();
  const response = await api.post(API_URL, role);
  return response.data;
}

// UPDATE
export async function assignOrunassignRolePermissions(id, role) {
  assertApiConfigured();
  const response = await api.put(`${API_URL}/${id}`, role);
  return response.data;
}

// DELETE
export async function deleteRole(id) {
  assertApiConfigured();
  await api.delete(`${API_URL}/${id}`);
}
