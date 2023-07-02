import { ReactNode } from 'react'

export interface ChildrenProps {
  children: ReactNode
}

export interface User extends SignUp {
  bookmarks: string[]
  follower: string[]
  following: string[]
  bio: string
  portfolio_link: string
  profile_pic: string
  profile_banner: string
}

export interface Login {
  email: string
  password: string
}

export interface SignUp {
  firstName: string
  lastName: string
  userName: string
  email: string
  password?: string
}

export interface ActionType {
  type: string
  payload: string | Array<any>
}

export interface PostType {
  _id: string
  userID: string
  caption: string
  image: string
  comments: string[]
  like: number
}
