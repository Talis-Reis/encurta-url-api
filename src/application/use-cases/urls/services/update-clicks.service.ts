import { IShortenUrlRepository } from '@/application/interfaces/shorten-url.interface'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class UpdateClicksService {
	constructor(private readonly shortenUrlRepository: IShortenUrlRepository) {}

	async execute(idUrl: number): Promise<void> {
		const url = await this.shortenUrlRepository.getById(idUrl)

		if (!url) {
			throw new NotFoundException(
				`URL com ID ${idUrl} não encontrada no momento da atualização de cliques`,
			)
		}

		await this.shortenUrlRepository.updateClicks(idUrl, url.clicks + 1)
	}
}
