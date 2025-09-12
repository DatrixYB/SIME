import axiosClient from '@/lib/bootstrap'

export enum PaymentType {
  CASH = 'CASH',
  CARD = 'CARD',
  TRANSFER = 'TRANSFER',
  DIGITAL_WALLET = 'DIGITAL_WALLET',
}

export enum PaymentStatus {
  PENDING = 'PENDING',// Venta registrada pero no pagada
  COMPLETED = 'COMPLETED',// Pago COMPETADO
  FAILED = 'FAILED',// Venta FALLO
  REFUNDED = 'REFUNDED'// Venta devuelta
}

export type Payment = {
  id?: number
  method: PaymentType
  status: PaymentStatus
  amount: number
  reference?: string 
  paidAt?: string
}

export const getPayments = async (): Promise<Payment[]> => {
  const { data } = await axiosClient.get('/payment')
  return data
}

export const getPaymentById = async (id: number): Promise<Payment> => {
  const { data } = await axiosClient.get(`/payment/${id}`)
  return data
}

export const createPayment = async (
  payload: Omit<Payment, 'id' | 'paidAt'>
): Promise<Payment> => {
  const { data } = await axiosClient.post('/payment', payload)
  return data
}

export const updatePayment = async (id: number, payload: Partial<Payment>): Promise<Payment> => {
  const { data } = await axiosClient.put(`/payment/${id}`, payload)
  return data
}

export const deletePayment = async (id: number): Promise<void> => {
  await axiosClient.delete(`/payment/${id}`)
}