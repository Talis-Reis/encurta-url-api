import { IShortenUrlRepository } from '@/application/interfaces/shorten-url.interface'
import { Urls } from '@/domain/models/urls.entity'
import { ResponseListShortenUrlDTO } from '@/presentation/shorten-url/dto/shorten-url.dto'
import { IEnvConfig } from '@/shared/common/infrastructure/interface/env.interface'
import getUrlDomain from '@/shared/utils/url-domain'
import { Test, TestingModule } from '@nestjs/testing'
import { ListShortenUrlByUserIdService } from '../../services/get-list-shorten-url-by-user-id.service'

jest.mock('@/shared/utils/url-domain', () => ({
	__esModule: true,
	default: jest.fn(),
}))

describe('ListShortenUrlByUserIdService Unit Test', () => {
	let service: ListShortenUrlByUserIdService
	let shortenUrlRepository: IShortenUrlRepository
	let envConfig: IEnvConfig

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ListShortenUrlByUserIdService,
				{
					provide: IShortenUrlRepository,
					useValue: {
						listByUser: jest.fn(),
					},
				},
				{
					provide: IEnvConfig,
					useValue: {
						getAppDomain: jest.fn(),
					},
				},
			],
		}).compile()

		service = module.get<ListShortenUrlByUserIdService>(
			ListShortenUrlByUserIdService,
		)
		shortenUrlRepository = module.get<IShortenUrlRepository>(
			IShortenUrlRepository,
		)
		envConfig = module.get<IEnvConfig>(IEnvConfig)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	it('should return a list of ResponseListShortenUrlDTO', async () => {
		const urls: Urls[] = [
			{
				id: 1,
				originalUrl: 'https://a.com',
				shortCode: 'abc123',
				clicks: 5,
			} as Urls,
			{
				id: 2,
				originalUrl: 'https://b.com',
				shortCode: 'def456',
				clicks: 10,
			} as Urls,
		]
		jest.spyOn(shortenUrlRepository, 'listByUser').mockResolvedValueOnce(
			urls,
		)
		jest.spyOn(envConfig, 'getAppDomain').mockReturnValue(
			'https://encurta.dev',
		)
		const getUrlDomainMock = getUrlDomain as jest.Mock
		getUrlDomainMock
			.mockReturnValueOnce('https://encurta.dev/abc123')
			.mockReturnValueOnce('https://encurta.dev/def456')

		const result = await service.execute(42)

		expect(shortenUrlRepository.listByUser).toHaveBeenCalledWith(42)
		expect(envConfig.getAppDomain).toHaveBeenCalled()
		expect(getUrlDomainMock).toHaveBeenNthCalledWith(
			1,
			'https://encurta.dev',
			'abc123',
		)
		expect(getUrlDomainMock).toHaveBeenNthCalledWith(
			2,
			'https://encurta.dev',
			'def456',
		)
		expect(result).toEqual([
			new ResponseListShortenUrlDTO(
				1,
				'https://a.com',
				5,
				'https://encurta.dev/abc123',
			),
			new ResponseListShortenUrlDTO(
				2,
				'https://b.com',
				10,
				'https://encurta.dev/def456',
			),
		])
	})

	it('should return an empty array if user has no urls', async () => {
		jest.spyOn(shortenUrlRepository, 'listByUser').mockResolvedValueOnce([])
		jest.spyOn(envConfig, 'getAppDomain').mockReturnValue(
			'https://encurta.dev',
		)

		const result = await service.execute(99)

		expect(shortenUrlRepository.listByUser).toHaveBeenCalledWith(99)
		expect(result).toEqual([])
	})
})
