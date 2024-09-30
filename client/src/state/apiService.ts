// src/services/apiService.ts
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const login = async (email: string, password: string) => {
  const response = await api.post('/login', { email, password })
  return response.data
}

export const verifyToken = async (token: string) => {
  const response = await api.get('/verify-token', {
    headers: {
      'x-access-token': token
    }
  })
  return response.data
}
