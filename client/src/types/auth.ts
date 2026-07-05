export interface LoginFormData {
  email: string
  password: string
}

export interface SignupFormData {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export interface AuthResponse {
  success: boolean
  message: string
  token?: string
  user?: {
    id: string
    email: string
    username: string
  }
}

export interface createUser{
    username: string
    email:string
    password:string
}
