import { ShortenUrlRepository } from './../../infrastructure/repositories/shorten-url.repository'

import { IShortenUrlRepository } from '@/application/interfaces/shorten-url.interface'
import { CreateShortenUrlService } from '@/application/use-cases/urls/services/create-shorten-url.service'
import { DeleteShortenUrlService } from '@/application/use-cases/urls/services/delete-sorten-url.service'
import { ListShortenUrlByUserIdService } from '@/application/use-cases/urls/services/get-list-shorten-url-by-user-id.service'
import { GetShortCodeService } from '@/application/use-cases/urls/services/get-short-code.service'
import { UpdateClicksService } from '@/application/use-cases/urls/services/update-clicks.service'
import { UpdateUrlOriginalService } from '@/application/use-cases/urls/services/update-url-original.service'
import { Module } from '@nestjs/common'
import { ShortenUrlController } from './shorten-url.controller'

const shortenUrlProvider = {
	provide: IShortenUrlRepository,
	useClass: ShortenUrlRepository,
}

@Module({
	controllers: [ShortenUrlController],
	providers: [
		shortenUrlProvider,
		CreateShortenUrlService,
		ListShortenUrlByUserIdService,
		DeleteShortenUrlService,
		UpdateUrlOriginalService,
		GetShortCodeService,
		UpdateClicksService,
	],
	exports: [GetShortCodeService, UpdateClicksService],
})
export class ShortenUrlModule {}
