export interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string
  address: string
}

export interface CreateUser {
  first_name: string
  last_name: string
  email: string
  phone: string
  address: string
}
