import { IShortenUrlRepository } from '@/application/interfaces/shorten-url.interface'
import { Urls } from '@/domain/models/urls.entity'
import { ResponseListShortenUrlDTO } from '@/presentation/shorten-url/dto/shorten-url.dto'
import { IEnvConfig } from '@/shared/common/infrastructure/interface/env.interface'
import getUrlDomain from '@/shared/utils/url-domain'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ListShortenUrlByUserIdService {
	constructor(
		private readonly shortenUrlRepository: IShortenUrlRepository,
		private readonly envConfig: IEnvConfig,
	) {}

	async execute(idUser: number): Promise<ResponseListShortenUrlDTO[]> {
		const listaUrl: Urls[] =
			await this.shortenUrlRepository.listByUser(idUser)

		const domain: string = this.envConfig.getAppDomain()
		const port: number = this.envConfig.getAppPort()

		return listaUrl.map(url => {
			const urlShorten: string = getUrlDomain(domain, port, url.shortCode)
			return new ResponseListShortenUrlDTO(
				url.id,
				url.originalUrl,
				url.clicks,
				urlShorten,
			)
		})
	}
}
