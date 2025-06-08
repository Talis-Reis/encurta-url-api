import { JwtAuthOptionalGuard } from '@/application/use-cases/auth/guard/passport/jwt-optional.guard'
import { CreateShortenUrlService } from '@/application/use-cases/urls/services/create-shorten-url.service'
import { ListShortenUrlByUserIdService } from '@/application/use-cases/urls/services/get-list-shorten-url-by-user-id.service'
import { ReqType } from '@/shared/common/@types/request.type'
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { InputUrlDTO } from './dto/shorten-url.dto'

@Controller('v1/shorten-url')
@ApiBearerAuth()
export class ShortenUrlController {
	constructor(
		private readonly createShortenUrlService: CreateShortenUrlService,
		private readonly listShortenUrlByUserIdService: ListShortenUrlByUserIdService,
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

	@Get()
	@ApiOperation({
		summary:
			'Listagem de URL Encurtados pelo usuário com contabilização de clicks',
	})
	@ApiResponse({
		status: 200,
		description: 'Success',
	})
	@ApiResponse({ status: 500, description: 'Server Error' })
	@ApiResponse({ status: 400, description: 'Bad Request' })
	async list(@Req() req: ReqType) {
		const idUser: number = req.user.sub
		return this.listShortenUrlByUserIdService.execute(idUser)
	}

	// @Patch(':id')
	// @ApiOperation({ summary: 'Encurta uma URL' })
	// @ApiResponse({
	// 	status: 200,
	// 	description: 'Success',
	// })
	// @ApiResponse({ status: 500, description: 'Server Error' })
	// @ApiResponse({ status: 400, description: 'Bad Request' })
	// async update(
	// 	@Param('id') id: string,
	// 	@Body('original_url') originalUrl: string,
	// ) {
	// 	// return this.urlService.updateUrl(id, originalUrl, user.id)
	// }

	// @Delete(':id')
	// @ApiOperation({ summary: 'Encurta uma URL' })
	// @ApiResponse({
	// 	status: 200,
	// 	description: 'Success',
	// })
	// @ApiResponse({ status: 500, description: 'Server Error' })
	// @ApiResponse({ status: 400, description: 'Bad Request' })
	// async remove(@Param('id') id: string, @Req() req: ReqType) {
	// 	// return this.urlService.softDeleteUrl(id, user.id)
	// }
}
