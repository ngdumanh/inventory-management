// types.ts

export interface APIServiceDataType {
  id: number
  name: string
  email: string
  status: string
  serviceId: string
}

export interface Warehouse {
  id: number
  name: string
  defaultStatus: string
}

export interface EditShopInfoData {
  auth_code_link: string
  shop_id: string
  shop_name: string
  shop_code: string
  access_token: string
  access_token_expire_in: Date
  user_id: number
  marketplace_id: number
  api_service_id: string
  subscription_start_date: Date
  subscription_expire_date: Date
  refresh_token: string
  refresh_token_expire_in: Date
  seller_base_region: string
  shop_cipher: string
  subscription_id: number
}

export interface StoreInfoDataType {
  id: number
  avatar: string
  fullName: string
  post: string
  email: string
  city: string
  start_date: string
  salary: number
  age: number
  experience: string
  status: number
  storeExpireTime: string
  storeCreatedTime: string
  scheduledTime: string
  totalOrder: number
  warehouses: Warehouse[]
}

export interface CreateStoreRequest {
  fullName: string
  post: string
  email: string
  city: string
  start_date: string
  salary: number
  age: number
  experience: string
  status: number
  storeExpireTime: string
  storeCreatedTime: string
  scheduledTime: string
  totalOrder: number
  warehouses: Warehouse[]
}

export interface CreateStoreResponse {
  success: boolean
  message: string
  data: StoreInfoDataType
}
