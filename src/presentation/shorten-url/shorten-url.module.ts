import { ShortenUrlRepository } from './../../infrastructure/repositories/shorten-url.repository'

import { IShortenUrlRepository } from '@/application/interfaces/shorten-url.interface'
import { CreateShortenUrlService } from '@/application/use-cases/urls/services/ create-shortened-url.service'
import { Module } from '@nestjs/common'
import { ShortenUrlController } from './shorten-url.controller'

const shortenUrlProvider = {
	provide: IShortenUrlRepository,
	useClass: ShortenUrlRepository,
}

@Module({
	controllers: [ShortenUrlController],
	providers: [shortenUrlProvider, CreateShortenUrlService],
})
export class ShortenUrlModule {}
