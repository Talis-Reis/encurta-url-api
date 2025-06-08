import { IShortenUrlRepository } from '@/application/interfaces/shorten-url.interface'
import { Urls } from '@/domain/models/urls.entity'
import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

@Injectable()
export class ShortenUrlRepository implements IShortenUrlRepository {
	constructor(
		@Inject('SHORTEN_URL_REPOSITORY')
		private readonly shortenUrlRepository: Repository<Urls>,
	) {}

	async createShortenUrl(
		urlOriginal: string,
		shortCode: string,
		idUser?: number,
	): Promise<Urls> {
		const newShortenUrl = this.shortenUrlRepository.create({
			shortCode: shortCode,
			originalUrl: urlOriginal,
			userId: idUser,
			createdAt: new Date(),
		})

		return this.shortenUrlRepository.save(newShortenUrl)
	}

	listByUser(userId: string): Promise<any[]> {
		throw new Error('Method not implemented.')
	}
	updateUrl(id: string, originalUrl: string, userId: string): Promise<any> {
		throw new Error('Method not implemented.')
	}
	deleteUrl(id: string, userId: string): Promise<void> {
		throw new Error('Method not implemented.')
	}

	async getByShortCode(shortCode: string): Promise<Urls> {
		return await this.shortenUrlRepository.findOne({
			where: { shortCode: shortCode },
		})
	}
}
