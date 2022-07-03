import { v4 as uuid } from 'uuid'

import type { IUserModel } from '@common/types/users/models/userModel.types'

class UserModel implements IUserModel {
  id: string
  bio?: string
  email: string
  avatar?: any
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
