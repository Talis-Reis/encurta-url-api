import { RedirectUrlService } from '@/application/use-cases/redirect/services/redirect.service'
import { Module } from '@nestjs/common'
import { ShortenUrlModule } from '../shorten-url/shorten-url.module'
import { RedirectController } from './redirect.controller'

@Module({
	imports: [ShortenUrlModule],
	controllers: [RedirectController],
	providers: [RedirectUrlService],
})
export class RedirectModule {}
