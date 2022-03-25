

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


export interface ChannelModel {
  id: number,
  name: number,
  owner: string,
}


export interface UserModel {
  id: number,
  username: string,
  firstname: string,
  lastname: string,
  email: string,
}