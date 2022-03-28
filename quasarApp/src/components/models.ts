

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
