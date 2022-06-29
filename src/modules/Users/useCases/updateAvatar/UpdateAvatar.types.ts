import { RequestHandler } from 'express'

import { IUserModel } from '@common/types/users/models/userModel.types'

interface IDataToUpdate {
  filename: string
  id: IUserModel['id']
}

type TExecute = (
  dataToUpdate: IDataToUpdate
) => Promise<{ updatedUser: IUserModel }>

type THandle = RequestHandler<any>

export type { TExecute, THandle }
