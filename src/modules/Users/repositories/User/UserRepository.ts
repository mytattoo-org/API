import { UserModel } from '../../entities/UserModel'
import type { IUsersRepository } from './IUserRepository.types'

import { connectToDB } from '@config/connectToDB'

class UsersRepository implements IUsersRepository {
  create: IUsersRepository['create'] = async ({
    created_at,
    id,
    email,
    password,
    updated_at,
    username
  }) => {
    const database = await connectToDB()

    const query = `
      INSERT INTO users (
        id,
        email,
        username,
        password,
        created_at,
        updated_at
      ) VALUES (
        '${id}',
        '${email}',
        '${username}',
        '${password}',
        '${created_at}',
        '${updated_at}'
      );
    `

    await database.query<UserModel>(query)

    const createdUser = await this.findById(id)

    return createdUser
  }

  delete: IUsersRepository['delete'] = async id => {
    const database = await connectToDB()

    const query = `DELETE FROM Users WHERE id='${id}'`

    await database.query(query)
  }

  findAll: IUsersRepository['findAll'] = async () => {
    const database = await connectToDB()

    const query = 'SELECT * FROM Users'

    const allUsers = (await database.query<UserModel>(query)).rows

    return allUsers
  }

  findById: IUsersRepository['findById'] = async id => {
    const database = await connectToDB()

    const query = `SELECT * FROM Users WHERE id='${id}'`

    const foundUser = (await database.query<UserModel>(query)).rows[0]

    return foundUser
  }

  findByEmail: IUsersRepository['findByEmail'] = async email => {
    const database = await connectToDB()

    const query = `SELECT * FROM Users WHERE email='${email}'`

    const foundUser = (await database.query<UserModel>(query)).rows[0]

    return foundUser
  }

  findByUsername: IUsersRepository['findByUsername'] = async username => {
    const database = await connectToDB()

    const query = `SELECT * FROM Users WHERE username='${username}'`

    const foundUser = (await database.query<UserModel>(query)).rows[0]

    return foundUser
  }
}

export { UsersRepository }
