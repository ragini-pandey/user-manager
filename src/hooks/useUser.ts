import { useCallback, useEffect, useState } from "react";
import type { User } from "../types/user";
import * as api from '../api/userApi';


interface UseUsers {
    users: User[]
    loading: boolean;
    fetchUsers: () => Promise<void>;
    createUser: (user: User) => Promise<void>;
    updateUser: (id: string, user: User) => Promise<void>;
    removeUser: (id: string) => Promise<void>;
}


export const useUsers = (): UseUsers=> {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const data = await api.getUsers();
            setUsers(data)
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    const createUser = useCallback(async (user: User) => {
        setLoading(true);
        try {
            const newUser = await api.createUser(user);
            setUsers((prev) => [...prev, newUser]);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateUser = useCallback(async (id: string, user: User) => {
        setLoading(true);
        try {
            const updatedUser = await api.updateUser(id, user);
            setUsers((prev) => prev.map((u) => u.id === id ? updatedUser : u));
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    const removeUser = useCallback(async (id: string) => {
        setLoading(true);
        try {
            await api.deleteUser(id);
            setUsers(prev => prev.filter((u) => u.id !== id));
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [])

    return {
        users,
        loading,
        fetchUsers,
        createUser,
        updateUser,
        removeUser
    }
}