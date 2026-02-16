
import type { User, UserPayload, ApiError } from '../types/user';
const BASE_URL = '/api/users';
async function request<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    if (!response.ok) {
      const error: ApiError = {
        message: `Request failed: ${response.statusText}`,
        status: response.status,
      };
      throw error;
    }
    const text = await response.text();
    return text ? (JSON.parse(text) as T) : ({} as T);
  } catch (err) {
    if ((err as ApiError).status) throw err;
    throw {
      message:
        err instanceof Error
          ? err.message
          : 'An unexpected network error occurred. Is the API server running?',
    } satisfies ApiError;
  }
}
export async function getUsers(): Promise<User[]> {
  return request<User[]>(BASE_URL);
}
export async function getUserById(id: number): Promise<User> {
  return request<User>(`${BASE_URL}/${id}`);
}
export async function createUser(data: UserPayload): Promise<User> {
  return request<User>(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
export async function updateUser(id: number, data: UserPayload): Promise<User> {
  return request<User>(`${BASE_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}
export async function deleteUser(id: number): Promise<void> {
  await request<Record<string, never>>(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
}
