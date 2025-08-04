import axiosClient from '@/lib/bootstrap'

export type Supplier = {
  id: number
  name: string
  contactName: string
  email: string
  phone?: string
  address?: string
  createdAt?: string
  updatedAt?: string
  totalProducts?: number
}

export const getSuppliers = async (): Promise<Supplier[]> => {
  const { data } = await axiosClient.get('/suppliers')
  return data
}

export const getSupplierById = async (id: number): Promise<Supplier> => {
  const { data } = await axiosClient.get(`/suppliers/${id}`)
  return data
}
export const delSupplierById = async (id: number): Promise<Supplier> => {
  const { data } = await axiosClient.delete(`/suppliers/${id}`)
  return data
}

export const createSupplier = async (
  payload: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Supplier> => {
  console.log('Creating supplier with payload:', payload)
  const { data } = await axiosClient.post('/suppliers', payload)
  return data
}
export const updateSupplier = async (
  id: number,
  payload: Partial<Supplier>
): Promise<Supplier> => {
  console.log(`Updating supplier with ID ${id} and payload:`, payload)
  const { data } = await axiosClient.patch(`/suppliers/${id}`, payload)
  return data
}