

export type RawMessage = string

export interface MessageModelDB {
  /**
   * If user is empty, message is assigned as logged users message.
   */
  id: number,
  channel: number,
  user: string,
  content: string,
  createdAt: number,
  updatedAt: number
}


export interface MessageModel {
  /**
   * If user is empty, message is assigned as logged users message.
   */
  id: number,
  channel_id: number,
  user: string,
  text: Array<string>,
  date: number,
}

export interface ChannelModel{
  id: number;
  name: string;
  private: boolean;
  owner_id: number;
  state: 'invite' | 'joined' | null,
}

export interface ChannelUsersModel extends ChannelModel {
  users: Array<UserModel>
}


export interface UserModel {
  id: number,
  username: string,
  firstname: string,
  lastname: string,
  email: string,
  status: string,
}

export interface ApiToken {
  type: 'bearer'
  token: string
  expires_at?: string
  expires_in?: number
}

export interface RegisterData {
  password: string
  passwordConfirmation: string
  user: UserModel
}

export interface LoginCredentials {
  email: string
  password: string
  remember: boolean
}
