import axiosClient from '@/lib/bootstrap'


export enum OrderStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  RECEIVED = 'RECEIVED',
  CANCELLED = 'CANCELLED',
}
export type PurchaseOrder = {
  id?: number
  supplierId: number
  createdById: number
  status: OrderStatus
  total: number
}



export const getPurchaseOrders = async (): Promise<PurchaseOrder[]> => {
  const { data } = await axiosClient.get('/purchaseorder')
  return data
}

export const getPurchaseOrderById = async (id: number): Promise<PurchaseOrder> => {
  const { data } = await axiosClient.get(`/purchaseorder/${id}`)
  return data
}

export const createPurchaseOrder = async (
  payload: Omit<PurchaseOrder, 'id'>
): Promise<PurchaseOrder> => {
  const { data } = await axiosClient.post('/purchaseorder', payload)
  return data
}

export const updatePurchaseOrder = async (
  id: number,
  payload: Partial<PurchaseOrder>
): Promise<PurchaseOrder> => {
  const { data } = await axiosClient.put(`/purchaseorder/${id}`, payload)
  return data
}

export const deletePurchaseOrder = async (id: number): Promise<void> => {
  await axiosClient.delete(`/purchaseorder/${id}`)
}