import { IUserModel } from '@common/types/users/userModel.types'

import { v4 as uuid } from 'uuid'

class UserModel implements IUserModel {
  id: string
  bio?: string
  email: string
  avatar?: string
  password: string
  username: string
  created_at: string
  updated_at: string
  full_name?: string
  short_bio?: string

  constructor() {
    this.id = this.id ?? uuid()
    this.created_at = this.created_at ?? new Date().toISOString()
    this.updated_at = this.updated_at ?? new Date().toISOString()
  }
}

export { UserModel }
