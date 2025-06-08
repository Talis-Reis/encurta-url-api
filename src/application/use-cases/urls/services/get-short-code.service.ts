import { IShortenUrlRepository } from '@/application/interfaces/shorten-url.interface'
import { Urls } from '@/domain/models/urls.entity'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class GetShortCodeService {
	constructor(private readonly shortenUrlRepository: IShortenUrlRepository) {}

	async execute(shortCode: string): Promise<Urls> {
		const existsShortCode: Urls =
			await this.shortenUrlRepository.getByShortCode(shortCode)

		if (!existsShortCode) {
			throw new NotFoundException('Url encurtada não encontrada')
		}

		return existsShortCode
	}
}
