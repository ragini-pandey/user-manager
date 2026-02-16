import { useState, useCallback, useEffect } from 'react';
import type { User, UserPayload, ApiError } from '../types/user';
import * as api from '../api/userApi';
interface UseUsersReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  addUser: (data: UserPayload) => Promise<void>;
  editUser: (id: number, data: UserPayload) => Promise<void>;
  removeUser: (id: number) => Promise<void>;
  clearError: () => void;
}
export function useUsers(): UseUsersReturn {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getUsers();
      setUsers(data);
    } catch (err) {
      setError((err as ApiError).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addUser = useCallback(async (data: UserPayload) => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await api.createUser(data);
      setUsers((prev) => [...prev, newUser]);
    } catch (err) {
      setError((err as ApiError).message);
      throw err; // re-throw so the UI can keep the dialog open
    } finally {
      setLoading(false);
    }
  }, []);

  const editUser = useCallback(async (id: number, data: UserPayload) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await api.updateUser(id, data);
      setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)));
    } catch (err) {
      setError((err as ApiError).message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeUser = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await api.deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      setError((err as ApiError).message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    fetchUsers,
    addUser,
    editUser,
    removeUser,
    clearError,
  };
}
