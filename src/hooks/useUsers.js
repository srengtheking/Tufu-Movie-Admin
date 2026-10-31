import { useEffect, useState } from "react";

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../services/userService";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // GET ALL USERS
  async function loadUsers() {
    try {
      setLoading(true);

      const data = await getUsers();

      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // GET USER BY ID
  async function loadUserById(id) {
    try {
      setLoading(true);

      const data = await getUserById(id);

      return data;
    } catch (error) {
      console.error(error);

      throw error;
    } finally {
      setLoading(false);
    }
  }

  // CREATE
  async function addUser(user) {
    try {
      const newUser = await createUser(user);

      setUsers((current) => [...current, newUser]);

      return newUser;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  // UPDATE
  async function editUser(id, user) {
    try {
      const updatedUser = await updateUser(id, user);

      setUsers((current) =>
        current.map((item) => (item.id === id ? updatedUser : item)),
      );

      return updatedUser;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  // DELETE
  async function removeUser(id) {
    try {
      await deleteUser(id);

      setUsers((current) => current.filter((user) => user.id !== id));
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return {
    users,
    loading,
    loadUsers,
    loadUserById,
    addUser,
    editUser,
    removeUser,
  };
}
