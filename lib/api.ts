import axios from "axios";
import { User } from "../types";

const API_BASE_URL = "https://dummyjson.com";

export async function getUsers(page: number): Promise<User[]> {
  const skip = (page - 1) * 10;
  const response = await axios.get(
    `${API_BASE_URL}/users?limit=10&skip=${skip}`
  );
  return response.data.users;
}

export async function getUserById(id: number): Promise<User> {
  const response = await axios.get(`${API_BASE_URL}/users/${id}`);
  return response.data;
}

export async function searchUsers(query: string): Promise<User[]> {
  const response = await axios.get(`${API_BASE_URL}/users/search?q=${query}`);
  return response.data.users;
}
