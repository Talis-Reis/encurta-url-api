import { JwtAuthOptionalGuard } from '@/application/use-cases/auth/guard/passport/jwt-optional.guard'
import { CreateShortenUrlService } from '@/application/use-cases/urls/services/ create-shortened-url.service'
import { ReqType } from '@/shared/common/@types/request.type'
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { InputUrlDTO } from './dto/shorten-url.dto'

@Controller('/api/v1/shorten-url')
@ApiBearerAuth()
export class ShortenUrlController {
	constructor(
		private readonly createShortenUrlService: CreateShortenUrlService,
	) {}

	@Post('shorten')
	@ApiOperation({ summary: 'Encurta uma URL' })
	@ApiResponse({
		status: 200,
		description: 'Success',
	})
	@ApiResponse({ status: 500, description: 'Server Error' })
	@ApiResponse({ status: 400, description: 'Bad Request' })
	@UseGuards(JwtAuthOptionalGuard)
	async shorten(@Body() request: InputUrlDTO, @Req() req: ReqType) {
		const idUser: number = req.user?.sub
		const shortUrl = await this.createShortenUrlService.execute(
			request.url,
			idUser,
		)
		return { shortUrl }
	}
}
