import { inject, injectable } from 'tsyringe'

import { TExecute } from './DeleteLike.types'

import { AppError } from '@modules/Error/models/AppError'
import { LikesRepository } from '@modules/Likes/repositories/LikesRepository'

@injectable()
class DeleteLikeService {
  constructor(
    @inject('LikesRepository')
    private likesRepository: LikesRepository
  ) {}

  execute: TExecute = async id => {
    const foundLike = await this.likesRepository.findById(id)

    if (!foundLike) throw new AppError('Like not found')

    await this.likesRepository.delete(id)

    return { deletedLike: foundLike }
  }
}

export { DeleteLikeService }
