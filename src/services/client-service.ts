import axiosClient from '@/lib/bootstrap'

export type Client = {
  id: number
  name: string
  email?: string
  phone?: string
  createdAt: string
  updatedAt: string
}

export const getClients = async (): Promise<Client[]> => {
  const { data } = await axiosClient.get('/client')
  return data
}

export const getClientById = async (id: number): Promise<Client> => {
  const { data } = await axiosClient.get(`/client/${id}`)
  return data
}

export const createClient = async (payload: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Promise<Client> => {
  const { data } = await axiosClient.post('/client', payload)
  return data
}

export const updateClient = async (id: number, payload: Partial<Client>): Promise<Client> => {
  const { data } = await axiosClient.put(`/client/${id}`, payload)
  return data
}

export const deleteClient = async (id: number): Promise<void> => {
  await axiosClient.delete(`/client/${id}`)
}