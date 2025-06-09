import { RedirectUrlService } from '@/application/use-cases/redirect/services/redirect.service'
import { Controller, Get, Param, Res } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'

@Controller('v1/redirect')
@ApiTags('Redirecionar URL encurtada')
export class RedirectController {
	constructor(private readonly redirectUrlService: RedirectUrlService) {}

	@Get(':shortCode')
	@ApiOperation({ summary: 'Redireciona o usuário para a URL original' })
	@ApiResponse({
		status: 302,
		description: 'Redireciona para a URL original',
	})
	@ApiResponse({ status: 404, description: 'URL não encontrada' })
	async redirectToOriginal(
		@Param('shortCode') shortCode: string,
		@Res() res: Response,
	) {
		const originalUrl: string =
			await this.redirectUrlService.execute(shortCode)
		return res.redirect(originalUrl)
	}
}
