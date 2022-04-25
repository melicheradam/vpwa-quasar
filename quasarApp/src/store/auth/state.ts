import { UserModel } from 'src/components/models'

export interface AuthError{
  message: string,
  field?: string
}

export interface AuthStateInterface {
  user: UserModel | null,
  status: 'pending' | 'success' | 'error',
  errors: AuthError[]
}

function state (): AuthStateInterface {
  return {
    user: null,
    status: 'pending',
    errors: []
  }
}

export default state
