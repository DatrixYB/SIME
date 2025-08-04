import axiosClient from '@/lib/bootstrap'

export type Category = {
  id?: number
  name: string
}

export const getCategory = async (): Promise<Category[]> => {
  const { data } = await axiosClient.get('/Category')
  return data
}

export const getCategoryById = async (id: number): Promise<Category> => {
  const { data } = await axiosClient.get(`/Category/${id}`)
  return data
}

export const createCategory = async (payload: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> => {
  const { data } = await axiosClient.post('/Category', payload)
  return data
}

export const updateCategory = async (id: number, payload: Partial<Category>): Promise<Category> => {
  const { data } = await axiosClient.put(`/Category/${id}`, payload)
  return data
}

export const deleteCategory = async (id: number): Promise<void> => {
  await axiosClient.delete(`/Category/${id}`)
}