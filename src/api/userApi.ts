import { BASE_URL } from "../constants";
import type { User } from "../types/user";

const request = async <T>(url: string, options?: RequestInit): Promise<T> => {
    try {
        const response = await fetch(
            url, {
            headers: { "Content-Type": "application/json" },
            ...options
        }
        )

        if (!response.ok) {
            const error = {
                message: `Request failed: ${response.statusText}`,
                status: response.status,
            };
            throw error;
        }

        const text = await response.text();
        return text ? (JSON.parse(text) as T) : ({} as T);
    } catch (error) {
        throw error;
    }
}

export const getUsers = (): Promise<User[]> => {
    return request<User[]>(BASE_URL);
}

export const getUserById = (id: string) : Promise<User> => {
    return request<User>(`${BASE_URL}/${id}`)
}

export const createUser = (data: User) : Promise<User> => {
    return request<User>(BASE_URL, {
        method: 'POST',
        body: JSON.stringify(data)
    })
}

export const updateUser = (id: string, data: User) : Promise<User> => {
    return request<User>(`${BASE_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
}

export const deleteUser = (id: string) : Promise<User> => {
    return request<User>(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    })
}