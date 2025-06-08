import { IShortenUrlRepository } from '@/application/interfaces/shorten-url.interface'
import { Urls } from '@/domain/models/urls.entity'
import { Inject, Injectable } from '@nestjs/common'
import { IsNull, Repository } from 'typeorm'

@Injectable()
export class ShortenUrlRepository implements IShortenUrlRepository {
	constructor(
		@Inject('SHORTEN_URL_REPOSITORY')
		private readonly shortenUrlRepository: Repository<Urls>,
	) {}

	async getById(idUrl: number): Promise<Urls> {
		return await this.shortenUrlRepository.findOne({
			where: { id: idUrl, deletedAt: null },
		})
	}

	async createShortenUrl(
		urlOriginal: string,
		shortCode: string,
		idUser?: number,
	): Promise<Urls> {
		const newShortenUrl: Urls = this.shortenUrlRepository.create({
			shortCode: shortCode,
			originalUrl: urlOriginal,
			userId: idUser,
			createdAt: new Date(),
		})

		return await this.shortenUrlRepository.save(newShortenUrl)
	}

	async listByUser(idUser: number): Promise<Urls[]> {
		return await this.shortenUrlRepository.find({
			where: { userId: idUser, deletedAt: IsNull() },
			order: { createdAt: 'DESC' },
		})
	}

	updateUrl(id: string, originalUrl: string, userId: string): Promise<any> {
		throw new Error('Method not implemented.')
	}

	async deleteUrl(idUrl: number, idUser: number): Promise<void> {
		await this.shortenUrlRepository.update(
			{ id: idUrl, userId: idUser },
			{ deletedAt: new Date() },
		)
	}

	async getByShortCode(shortCode: string): Promise<Urls> {
		return await this.shortenUrlRepository.findOne({
			where: { shortCode: shortCode },
		})
	}
}
