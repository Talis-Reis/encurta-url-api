import { IShortenUrlRepository } from '@/application/interfaces/shorten-url.interface'
import { Urls } from '@/domain/models/urls.entity'
import { IEnvConfig } from '@/shared/common/infrastructure/interface/env.interface'
import getUrlDomain from '@/shared/utils/url-domain'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CreateShortenUrlService {
	constructor(
		private readonly shortenUrlRepository: IShortenUrlRepository,
		private readonly envConfig: IEnvConfig,
	) {}

	private generateShortCode(): string {
		const chars: string =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
		let result: string = ''
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
		const shortCode: string = await this.generateUniqueShortCode()

		await this.shortenUrlRepository.createShortenUrl(
			urlOriginal,
			shortCode,
			idUser,
		)

		const domain: string = this.envConfig.getAppDomain()
		const port: number = this.envConfig.getAppPort()

		return getUrlDomain(domain, port, shortCode)
	}
}
