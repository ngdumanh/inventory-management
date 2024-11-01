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

// export interface EditShopInfoData {
//   auth_code_link: string
//   shop_id: string
//   shop_name: string
//   shop_code: string
//   access_token: string
//   access_token_expire_in: Date
//   user_id: number
//   marketplace_id: number
//   api_service_id: string
//   subscription_start_date: Date
//   subscription_expire_date: Date
//   refresh_token: string
//   refresh_token_expire_in: Date
//   seller_base_region: string
//   shop_cipher: string
//   subscription_id: number
// }

export interface CreateShopRequest {
  api_service_id: string
  auth_code_link: string
  shop_name: string
  shop_description: string
  subscription_id: number
}

export interface ShopResponse {
  shop_id: string
  shop_name: string
  shop_code: string
  access_token: string
  access_token_expire_in: string // Use string for ISO date strings
  user_id: number
  marketplace_id: number
  api_service_id: string
  subscription_start_date: string // Use string for ISO date strings
  subscription_expire_date: string // Use string for ISO date strings
  refresh_token: string
  refresh_token_expire_in: string // Use string for ISO date strings
  seller_base_region: string
  shop_cipher: string
  subscription_id: number
  shop_description: string // Optional field
}

export interface CreateShopResponse {
  success: boolean
  message: string
  data: ShopResponse
}
