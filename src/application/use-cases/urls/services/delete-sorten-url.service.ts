import { IShortenUrlRepository } from '@/application/interfaces/shorten-url.interface'
import { Urls } from '@/domain/models/urls.entity'
import { MessageType } from '@/shared/common/@types/message.type'
import { IEnvConfig } from '@/shared/common/infrastructure/interface/env.interface'
import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'

@Injectable()
export class DeleteShortenUrlService {
	constructor(
		private readonly shortenUrlRepository: IShortenUrlRepository,
		private readonly envConfig: IEnvConfig,
	) {}

	async execute(idUrl: number, idUser: number): Promise<MessageType> {
		const url: Urls = await this.shortenUrlRepository.getById(idUrl)

		if (!url) {
			throw new NotFoundException(`URL com ID ${idUrl} não encontrada`)
		}

		if (url.userId !== idUser) {
			throw new ForbiddenException(
				'Você não tem permissão para excluir esta URL',
			)
		}

		await this.shortenUrlRepository.deleteUrl(idUrl, idUser)

		return { message: 'URL excluída com sucesso' }
	}
}
