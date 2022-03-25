
export interface MessageModel {
  id: number,
  channel_id: number,
  user: string,
  text: Array<string>,
  date: Date,
}


export interface ChannelModel {
  id: number,
  name: number,
  owner: string,
}


export interface User {
  id: number,
  username: string,
  firstname: string,
  lastname: string,
  email: string,
}