import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common'
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

  @Get(':collectionId')
  async getCollection(@Body('userId') userId: string, @Param('collectionId') collectionId: string) {
    const collection = await this.collectionService.getCollection({ userId, collectionId })
    if (collection.isLeft()) {
      const { message, code, status } = collection.error
      throw new HttpException({ message, code }, status)
    }

    return { collection: collection.value }
  }

  @Get(Routes.logged)
  async ListLoggedUserCollections(@Body('userId') userId: string) {
    const collections = await this.collectionService.listCreatorCollection({
      userId,
      creator: userId,
    })

    if (collections.isRight()) {
      return { collections: collections.value }
    }
  }

  @Get('creator/:creatorId')
  async ListCreatorCollections(
    @Body('userId') userId: string,
    @Param('creatorId') creatorId: string,
  ) {
    const collections = await this.collectionService.listCreatorCollection({
      userId,
      creator: creatorId,
    })

    if (collections.isRight()) {
      return { collections: collections.value }
    }
  }

  @Get(Routes.public)
  async listPublicCollections(@Body('userId') userId: string) {
    const collections = await this.collectionService.listPublicCollections(userId)
    if (collections.isRight()) {
      return { collections: collections.value }
    }
  }
}
