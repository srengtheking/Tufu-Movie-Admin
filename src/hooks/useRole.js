import { useEffect, useState } from "react";

import {
    getRoles,
    getRoleById,
    createRole,
    assignOrunassignRolePermissions as updateRolePermissions,
    deleteRole,
} from "../services/roleService";

export function useRoles() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // GET ALL ROLES
  async function loadRoles() {
    try {
      setLoading(true);
      setError(null);

      const data = await getRoles();

      setRoles(data);
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : "Failed to get roles");
    } finally {
      setLoading(false);
    }
  }

  // GET ROLE BY ID
  async function loadRoleById(id) {
    try {
      setLoading(true);

      const data = await getRoleById(id);

      return data;
    } catch (error) {
      console.error(error);

      throw error;
    } finally {
      setLoading(false);
    }
  }

  // CREATE
  async function addRole(role) {
    try {
      const newRole = await createRole(role);

      setRoles((current) => [...current, newRole]);

      return newRole;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  // UPDATE
  async function assignOrunassignRolePermissions(id, role) {
    try {
      const updatedRole = await updateRolePermissions(id, role);

      setRoles((current) =>
        current.map((item) => (item.id === id ? updatedRole : item)),
      );

      return updatedRole;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  // DELETE
  async function removeRole(id) {
    try {
      await deleteRole(id);

      setRoles((current) => current.filter((role) => role.id !== id));
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  useEffect(() => {
    let active = true;

    getRoles()
      .then((data) => {
        if (active) {
          setRoles(data);
        }
      })
      .catch((error) => {
        console.error(error);
        if (active) {
          setError(error instanceof Error ? error.message : "Failed to get roles");
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return {
    roles,
    loading,
    error,
    loadRoles,
    loadRoleById,
    addRole,
    assignOrunassignRolePermissions,
    removeRole,
  };
}
