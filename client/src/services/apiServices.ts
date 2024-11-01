import axios from 'axios'
import axiosInstance from './axiosInstance'
import { getSession } from 'next-auth/react' // Import getSession from NextAuth
import { APIServiceDataType, CreateShopResponse, ShopResponse, StoreInfoDataType } from '../types'

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

export const createShop = async (shopData: any): Promise<ShopResponse> => {
  try {
    const session = await getSession() // Get the current session
    if (!session || !session.user) {
      throw new Error('User not authenticated')
    }

    const user_id = session.user.id // Get user_id from session

    const payload = {
      ...shopData,
      user_id // Include user_id in the request payload
    }

    console.log('createShop with shopData', payload)

    const response = await axiosInstance.post('/create-shop', payload)
    // check status
    if (response.status !== 200) {
      throw new Error('Failed to create shop')
    }
    const data: ShopResponse = response.data

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response ? error.response.data : new Error('Network Error')
    } else {
      throw new Error('An unexpected error occurred')
    }
  }
}
