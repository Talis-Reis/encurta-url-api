import { JwtAuthOptionalGuard } from '@/application/use-cases/auth/guard/passport/jwt-optional.guard'
import { JwtAuthGuard } from '@/application/use-cases/auth/guard/passport/jwt.guard'
import { CreateShortenUrlService } from '@/application/use-cases/urls/services/create-shorten-url.service'
import { DeleteShortenUrlService } from '@/application/use-cases/urls/services/delete-sorten-url.service'
import { ListShortenUrlByUserIdService } from '@/application/use-cases/urls/services/get-list-shorten-url-by-user-id.service'
import { UpdateUrlOriginalService } from '@/application/use-cases/urls/services/update-url-original.service'
import { ReqType } from '@/shared/common/@types/request.type'
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger'
import { InputUrlDTO } from './dto/shorten-url.dto'

@Controller('v1/shorten-url')
@ApiTags('Encurtar URL')
@ApiBearerAuth()
export class ShortenUrlController {
	constructor(
		private readonly createShortenUrlService: CreateShortenUrlService,
		private readonly listShortenUrlByUserIdService: ListShortenUrlByUserIdService,
		private readonly deleteShortenUrlService: DeleteShortenUrlService,
		private readonly updateUrlOriginalService: UpdateUrlOriginalService,
	) {}

	@Post()
	@ApiOperation({ summary: 'Cria uma URL encurtada' })
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
			'Lista todas as URLs encurtadas pelo usuário com contabilização de clicks',
	})
	@ApiResponse({
		status: 200,
		description: 'Success',
	})
	@ApiResponse({ status: 500, description: 'Server Error' })
	@ApiResponse({ status: 400, description: 'Bad Request' })
	@UseGuards(JwtAuthGuard)
	async list(@Req() req: ReqType) {
		const idUser: number = req.user.sub
		return this.listShortenUrlByUserIdService.execute(idUser)
	}

	@Patch(':id')
	@ApiOperation({
		summary:
			'Atualiza a URL de origem associada a uma URL encurtada existente.',
	})
	@ApiResponse({
		status: 200,
		description: 'Success',
	})
	@ApiResponse({ status: 500, description: 'Server Error' })
	@ApiResponse({ status: 400, description: 'Bad Request' })
	@UseGuards(JwtAuthGuard)
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() request: InputUrlDTO,
		@Req() req: ReqType,
	) {
		const idUser: number = req.user.sub
		return this.updateUrlOriginalService.execute(id, request.url, idUser)
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Remove uma URL encurtada.' })
	@ApiResponse({
		status: 200,
		description: 'Success',
	})
	@ApiResponse({ status: 500, description: 'Server Error' })
	@ApiResponse({ status: 400, description: 'Bad Request' })
	@UseGuards(JwtAuthGuard)
	async remove(
		@Param('id', ParseIntPipe) idUrl: number,
		@Req() req: ReqType,
	) {
		const idUser: number = req.user.sub
		return this.deleteShortenUrlService.execute(idUrl, idUser)
	}
}
