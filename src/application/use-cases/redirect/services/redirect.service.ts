import { Injectable } from '@nestjs/common'
import { GetShortCodeService } from '../../urls/services/get-short-code.service'
import { UpdateClicksService } from '../../urls/services/update-clicks.service'

@Injectable()
export class RedirectUrlService {
	constructor(
		private readonly getShortCodeService: GetShortCodeService,
		private readonly updateClicksService: UpdateClicksService,
	) {}

	async execute(shortCode: string): Promise<string> {
		const url = await this.getShortCodeService.execute(shortCode)

		await this.updateClicksService.execute(url.id)
		return url.originalUrl
	}
}
