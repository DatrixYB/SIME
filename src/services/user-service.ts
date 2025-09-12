import axiosClient from '@/lib/bootstrap'

export enum UserRole {
  ADMIN = 'ADMIN',
  SELLER = 'SELLER',
  MANAGER = 'MANAGER',
}

export type User = {
  id?: number
  email: string
  name?: string
  password: string
  role: UserRole
  image?: string
  createdAt?: string
  updatedAt?: string
}

export const getUsers = async (): Promise<User[]> => {
  const token = localStorage.getItem('token') || ''
  console.log(token)
  const { data } = await axiosClient.get('/users'
    // headers: {
      // Authorization: `Bearer ${token}`,
    // },
  )
  return data
}

export const getUserById = async (id: number): Promise<User> => {
  const { data } = await axiosClient.get(`/users/${id}`)
  return data
}

export const createUser = async (payload: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
  const { data } = await axiosClient.post('/users', payload)
  return data
}

export const updateUser = async (id: number, payload: Partial<User>): Promise<User> => {
  // alert(JSON.stringify(payload)+id)
  const { data } = await axiosClient.put(`/users/${id}`, payload)
  return data
}

export const deleteUser = async (id: number): Promise<void> => {
  await axiosClient.delete(`/users/${id}`)
}