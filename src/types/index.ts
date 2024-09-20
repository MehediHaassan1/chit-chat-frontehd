export interface ILoggedInUser {
  user: IUser
  accessToken: string
}

export interface IUser {
  _id: string
  name: string
  email: string
  phone: string
  image: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  __v: number
}


export interface ILoggedUser {
  email: string
  exp: number
  iat: number
  image: string
  phone: string
}