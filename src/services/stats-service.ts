import axiosClient from '@/lib/bootstrap'

export const getStats = async (): Promise<[]> => {
  const { data } = await axiosClient.get('/stat/stats')
  return data
}
