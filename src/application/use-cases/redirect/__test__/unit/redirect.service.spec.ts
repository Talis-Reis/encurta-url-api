import { Urls } from '@/domain/models/urls.entity'
import { Test, TestingModule } from '@nestjs/testing'
import { GetShortCodeService } from '../../../urls/services/get-short-code.service'
import { UpdateClicksService } from '../../../urls/services/update-clicks.service'
import { RedirectUrlService } from '../../services/redirect.service'

describe('RedirectUrlService Unit Test', () => {
	let service: RedirectUrlService
	let getShortCodeService: GetShortCodeService
	let updateClicksService: UpdateClicksService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				RedirectUrlService,
				{
					provide: GetShortCodeService,
					useValue: {
						execute: jest.fn(),
					},
				},
				{
					provide: UpdateClicksService,
					useValue: {
						execute: jest.fn(),
					},
				},
			],
		}).compile()

		service = module.get<RedirectUrlService>(RedirectUrlService)
		getShortCodeService =
			module.get<GetShortCodeService>(GetShortCodeService)
		updateClicksService =
			module.get<UpdateClicksService>(UpdateClicksService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	it('should return originalUrl and update clicks', async () => {
		const url = { id: 1, originalUrl: 'https://original.com' } as Urls
		jest.spyOn(getShortCodeService, 'execute').mockResolvedValueOnce(url)
		const updateSpy = jest
			.spyOn(updateClicksService, 'execute')
			.mockResolvedValueOnce(undefined)

		const result = await service.execute('abc123')

		expect(getShortCodeService.execute).toHaveBeenCalledWith('abc123')
		expect(updateSpy).toHaveBeenCalledWith(1)
		expect(result).toBe('https://original.com')
	})
})
