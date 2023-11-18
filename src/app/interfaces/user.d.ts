export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

export interface CreateUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}
