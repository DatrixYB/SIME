import axiosClient from '@/lib/bootstrap'
import { Product } from './product-service'
import { Sale } from './sale-service'

export type SaleItem = {
  id?: number
  saleId?: number
  productId: number
  quantity: number
  price: number
  product?: Product
  sale?: Sale
}
// export interface SaleItems extends SaleItem {
//   [index: number]: SaleItem
// }
export type SaleOrderItems = {
  saleId?: number
  // orderId: number
  items?: SaleItem[]
}
export const getSaleItem = async (): Promise<SaleItem> => {
  const { data } = await axiosClient.get(`/sale-item/`)
  return data
}
export const createSaleItem = async (
  payload: Omit<SaleItem, 'id' | 'product' | 'sale'>
): Promise<SaleItem> => {
  // alert(JSON.stringify(payload))
  const { data } = await axiosClient.post('/sale-item', payload)
  return data
}
export const createSaleOrderItems = async (
  payload: Omit<SaleOrderItems, 'id'>
): Promise<SaleOrderItems> => {
  // alert(JSON.stringify(payload))
  const { data } = await axiosClient.post('/sale-item/bulk', payload)
  return data
}