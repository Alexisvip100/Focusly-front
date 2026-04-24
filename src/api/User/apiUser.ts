import { API_BASE_URL } from '@/config/env.config';
import type { UserResponse } from './apiUserType';

export const UserPost = async (userResponse: UserResponse): Promise<UserResponse> => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userResponse),
  });

  return response.json();
};

export const UserGet = async (id: string): Promise<UserResponse> => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  return response.json();
};

export const UserUpdate = async (id: string, userData: Partial<UserResponse>): Promise<UserResponse> => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  return response.json();
};
