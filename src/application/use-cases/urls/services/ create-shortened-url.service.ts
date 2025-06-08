import { IShortenUrlRepository } from '@/application/interfaces/shorten-url.interface'
import { Urls } from '@/domain/models/urls.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CreateShortenUrlService {
	constructor(private readonly shortenUrlRepository: IShortenUrlRepository) {}

	private generateShortCode(): string {
		const chars =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
		let result = ''
		for (let i = 0; i < 6; i++) {
			result += chars.charAt(Math.floor(Math.random() * chars.length))
		}
		return result
	}

	private async generateUniqueShortCode(): Promise<string> {
		let code: string
		let exists: Urls
		do {
			code = this.generateShortCode()
			exists = await this.shortenUrlRepository.getByShortCode(code)
		} while (exists)
		return code
	}

	async execute(urlOriginal: string, idUser?: number): Promise<string> {
		const shortCode = await this.generateUniqueShortCode()

		await this.shortenUrlRepository.createShortenUrl(
			urlOriginal,
			shortCode,
			idUser,
		)

		const domain = process.env.APP_DOMAIN || 'http://localhost'
		return `${domain}/${shortCode}`
	}

	// async listByUser(userId: string): Promise<Url[]> {
	// 	return this.urlRepository.find({
	// 		where: {
	// 			user: { id: userId },
	// 			deleted_at: null,
	// 		},
	// 		order: { updated_at: 'DESC' },
	// 	})
	// }

	// async updateUrl(
	// 	id: string,
	// 	originalUrl: string,
	// 	userId: string,
	// ): Promise<Url> {
	// 	const url = await this.urlRepository.findOne({
	// 		where: { id, deleted_at: null },
	// 		relations: ['user'],
	// 	})

	// 	if (!url) {
	// 		throw new NotFoundException('URL not found')
	// 	}
	// 	if (!url.user || url.user.id !== userId) {
	// 		throw new UnauthorizedException('You cannot update this URL')
	// 	}

	// 	url.original_url = originalUrl
	// 	await this.urlRepository.save(url)
	// 	return url
	// }

	// async softDeleteUrl(id: string, userId: string): Promise<void> {
	// 	const url = await this.urlRepository.findOne({
	// 		where: { id, deleted_at: null },
	// 		relations: ['user'],
	// 	})

	// 	if (!url) {
	// 		throw new NotFoundException('URL not found')
	// 	}
	// 	if (!url.user || url.user.id !== userId) {
	// 		throw new UnauthorizedException('You cannot delete this URL')
	// 	}

	// 	url.deleted_at = new Date()
	// 	await this.urlRepository.save(url)
	// }

	// async getOriginalUrlAndCountClick(
	// 	shortCode: string,
	// ): Promise<string | null> {
	// 	const url = await this.urlRepository.findOne({
	// 		where: { short_code: shortCode, deleted_at: null },
	// 	})

	// 	if (!url) {
	// 		return null
	// 	}

	// 	url.clicks += 1
	// 	await this.urlRepository.save(url)

	// 	return url.original_url
	// }
}
