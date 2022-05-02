

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
  channelId: number,
  user: string,
  text: Array<string>,
  date: number,
}

export interface ChannelModel{
  id: number;
  name: string;
  private: boolean;
  ownerId: number;
  state: 'invite' | 'joined' | null,
}

export interface ChannelModelForm{
  name: string;
  private: boolean;
  owner: number;
}

export interface ChannelUsersModel extends ChannelModel {
  users: Array<UserModel>
}


export interface UserModel {
  id: number,
  userName: string,
  firstName: string,
  lastName: string,
  email: string,
  status: string,
}

export interface ApiToken {
  type: 'bearer'
  token: string
  expiresAt?: string
  expiresIn?: number
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
