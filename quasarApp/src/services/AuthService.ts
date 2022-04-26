import type { AxiosError, AxiosRequestConfig } from 'axios'
import type { ApiToken, LoginCredentials, RegisterData, UserModel } from 'src/components/models'
import { api } from 'src/boot/axios'

class AuthService {
  me (dontTriggerLogout = false): Promise<UserModel> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return api.get(
      'auth/me',
      { dontTriggerLogout } as AxiosRequestConfig
    )
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      .then((response) => response.data)
      .catch((error: AxiosError) => {
        if (error.response?.status === 401) {
          return null
        }

        return Promise.reject(error)
      })
  }

  async register (data: RegisterData): Promise<UserModel> {
    const response = await api.post<UserModel>('auth/register', data)
    return response.data
  }

  async login (credentials: LoginCredentials): Promise<ApiToken> {
    const response = await api.post<ApiToken>('auth/login', credentials)
    return response.data
  }

  async logout (): Promise<void> {
    await api.post('auth/logout')
  }
}

export default new AuthService()