// services/product.ts
import axiosClient from '@/lib/bootstrap'

export type SalesData ={
        
        month: string,
        sales: number,
        orders: number,

}
export type TopSuppliers = {
     name: string, orders: number, amount: number 

}
export type TopProducts = {
     name: string, sales: number, revenue: number 

}
// Listar todos los productos
export const getTopProducts = async (): Promise<[TopProducts]> => {
  const { data } = await axiosClient.get('/products/top')
  console.log('Products fetched:', data)
  return data
}

export const getTopSuppliers = async (): Promise<[TopSuppliers]> => {
  const { data } = await axiosClient.get('/suppliers/top')
  console.log('Products fetched:', data)
  return data
}

export const getSaleData = async (): Promise<[SalesData]> => {
  const { data } = await axiosClient.get('/sales/mes')
  console.log('Products fetched:', data)
  return data
}
