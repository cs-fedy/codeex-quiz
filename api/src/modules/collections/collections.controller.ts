import { Body, Controller, HttpStatus, Inject, Post, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'
import AccountConfirmedGuard from 'src/guards/confirmed'
import { RoleGuard } from 'src/guards/role'
import { Roles, Routes, Services } from 'src/utils/constants'
import ICollectionService from './i-collections.services'
import CreateCollectionArgs from './validators/create-collection'

@Controller(Routes.collections)
@Controller(Routes.files)
@UseGuards(AccountConfirmedGuard())
@UseGuards(RoleGuard(Roles.admin, Roles.user))
export default class CollectionController {
  constructor(@Inject(Services.collection) private collectionService: ICollectionService) {}

  @Post()
  async createCollection(@Body() args: CreateCollectionArgs, @Res() res: Response) {
    const createdCollection = await this.collectionService.createCollection({
      ...args,
      creator: args.userId,
    })

    if (createdCollection.isRight()) {
      return res.status(HttpStatus.CREATED).json({ createdCollection: createdCollection.value })
    }
  }
}
