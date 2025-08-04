import axiosClient from '@/lib/bootstrap'
import { SaleItem } from './saleItem-service'
import { Client } from './client-service'
import { User } from './user-service'
import { Payment, PaymentStatus } from './payment-service'

export enum SaleStatus {
  PENDING = 'PENDING',// Venta registrada pero no pagada
  PAID = 'PAID',// Pago confirmado
  CANCELLED = 'CANCELLED',// Venta anulada
  REFUNDED = 'REFUNDED'// Venta devuelta
}

export type Sale = {
  orden:number
  total: number
  totalItems?: number
  clientId: number
  paymentId: number
  userId: number
  status: SaleStatus
  id?: number
  date?: Date
  client?: Client
  user?: User
  payment?: Payment
  items?: SaleItem[]
  paymentMethod?: string
  statusPayment?: PaymentStatus
  statusSale?: SaleStatus
  // status?: string
}

export const getSales = async (): Promise<Sale[]> => {
  const { data } = await axiosClient.get('/sales')
  return data
}

export const getSaleById = async (id: number): Promise<Sale> => {
  const { data } = await axiosClient.get(`/sales/${id}`)
  return data
}

export const createSale = async (payload: Omit<Sale, 'id'>): Promise<Sale> => {
  console.log("payload", payload)
  alert("payload"+JSON.stringify(payload))
  const { data } = await axiosClient.post('/sales', payload)
  return data
}

export const updateSale = async (id: number, payload: Partial<Sale>): Promise<Sale> => {
  const { data } = await axiosClient.put(`/sales/${id}`, payload)
  return data
}

export const deleteSale = async (id: number): Promise<void> => {
  await axiosClient.delete(`/sales/${id}`)
}