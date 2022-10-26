import { UserModel } from '../../models/UserModel'
import type { IUsersRepository } from './IUserRepository.types'

import { query } from '@shared/database'

class UsersRepository implements IUsersRepository {
  update: IUsersRepository['update'] = async data => {
    const updateQuery = (name: string, value: string) =>
      `
        UPDATE
          "User"
        SET
          "${name}" = '${value}'
        WHERE
          "id" = '${data.id}';
      `

    let queryData = ''
    const dataToUpdate: any[][] = Object.entries(data)

    for (let i = 0; i < dataToUpdate.length; i++) {
      const name = dataToUpdate[i][0]
      const value = dataToUpdate[i][1]

      if (name && value) queryData = queryData + updateQuery(name, value)
    }

    await query<UserModel>(queryData)

    const updatedUser = await this.findById(data.id)

    return updatedUser
  }

  create: IUsersRepository['create'] = async ({
    id,
    email,
    password,
    username,
    created_at,
    updated_at
  }) => {
    const queryData = `
      INSERT INTO "User" (
        "id",
        "email",
        "username",
        "password",
        "created_at",
        "updated_at"
      ) VALUES (
        '${id}',
        '${email}',
        '${username}',
        '${password}',
        '${created_at}',
        '${updated_at}'
      );
    `

    await query<UserModel>(queryData)

    const createdUser = await this.findById(id)

    return createdUser
  }

  delete: IUsersRepository['delete'] = async id => {
    const queryData = `DELETE FROM "User" WHERE "id"='${id}';`

    await query(queryData)
  }

  findAll: IUsersRepository['findAll'] = async () => {
    const queryData = 'SELECT * FROM "User";'

    const allUsers = (await query<UserModel>(queryData)).rows

    return allUsers
  }

  findById: IUsersRepository['findById'] = async id => {
    const queryData = `SELECT * FROM "User" WHERE "id"='${id}';`

    const foundUser = (await query<UserModel>(queryData)).rows[0]

    return foundUser
  }

  findByEmail: IUsersRepository['findByEmail'] = async email => {
    const queryData = `SELECT * FROM "User" WHERE lower("email")='${email.toLowerCase()}';`

    const foundUser = (await query<UserModel>(queryData)).rows[0]

    return foundUser
  }

  findByUsername: IUsersRepository['findByUsername'] = async username => {
    const queryData = `SELECT * FROM "User" WHERE lower("username")='${username.toLowerCase()}';`

    const foundUser = (await query<UserModel>(queryData)).rows[0]

    return foundUser
  }
}

export { UsersRepository }
