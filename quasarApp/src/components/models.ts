
export interface User {
  id: number,
  username: string,
  firstname: string,
  lastname: string,
  email: string,

}

export interface MessageModel {
  id: number,
  channel_id: number,
  user: string,
  text: Array<string>,
  date: Date,
}
