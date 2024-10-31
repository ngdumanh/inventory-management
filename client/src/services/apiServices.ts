import axios from 'axios'
import axiosInstance from './axiosInstance'
import { APIServiceDataType, StoreInfoDataType } from '../types'

export const getServiceIds = async (): Promise<{ service_id: string }[]> => {
  try {
    const response = await axiosInstance.get('/service-ids')
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response ? error.response.data : new Error('Network Error')
    } else {
      throw new Error('An unexpected error occurred')
    }
  }
}
