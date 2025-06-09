import { IShortenUrlRepository } from '@/application/interfaces/shorten-url.interface'
import { Urls } from '@/domain/models/urls.entity'
import { IEnvConfig } from '@/shared/common/infrastructure/interface/env.interface'
import getUrlDomain from '@/shared/utils/url-domain'
import { Test, TestingModule } from '@nestjs/testing'
import { CreateShortenUrlService } from '../../services/create-shorten-url.service'

jest.mock('@/shared/utils/url-domain', () => ({
	__esModule: true,
	default: jest.fn(),
}))

describe('CreateShortenUrlService Unit Test', () => {
	let service: CreateShortenUrlService
	let shortenUrlRepository: IShortenUrlRepository
	let envConfig: IEnvConfig

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CreateShortenUrlService,
				{
					provide: IShortenUrlRepository,
					useValue: {
						getByShortCode: jest.fn(),
						createShortenUrl: jest.fn(),
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

		service = module.get<CreateShortenUrlService>(CreateShortenUrlService)
		shortenUrlRepository = module.get<IShortenUrlRepository>(
			IShortenUrlRepository,
		)
		envConfig = module.get<IEnvConfig>(IEnvConfig)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	it('should generate a unique short code and return the shortened URL', async () => {
		jest.spyOn(
			shortenUrlRepository,
			'getByShortCode',
		).mockResolvedValueOnce(undefined as unknown as Urls)
		jest.spyOn(
			shortenUrlRepository,
			'createShortenUrl',
		).mockResolvedValueOnce(undefined)
		jest.spyOn(envConfig, 'getAppDomain').mockReturnValue(
			'https://encurta.dev',
		)
		const getUrlDomainMock = getUrlDomain as jest.Mock
		getUrlDomainMock.mockReturnValue('https://encurta.dev/abc123')

		jest.spyOn<any, any>(service, 'generateShortCode').mockReturnValue(
			'abc123',
		)

		const result = await service.execute('https://original.com', 42)

		expect(shortenUrlRepository.getByShortCode).toHaveBeenCalledWith(
			'abc123',
		)
		expect(shortenUrlRepository.createShortenUrl).toHaveBeenCalledWith(
			'https://original.com',
			'abc123',
			42,
		)
		expect(envConfig.getAppDomain).toHaveBeenCalled()
		expect(getUrlDomainMock).toHaveBeenCalledWith(
			'https://encurta.dev',
			'abc123',
		)
		expect(result).toBe('https://encurta.dev/abc123')
	})

	it('should retry if short code already exists', async () => {
		jest.spyOn<any, any>(service, 'generateShortCode')
			.mockReturnValueOnce('exist1')
			.mockReturnValueOnce('uniq12')
		jest.spyOn(shortenUrlRepository, 'getByShortCode')
			.mockResolvedValueOnce({} as Urls)
			.mockResolvedValueOnce(undefined as unknown as Urls)
		jest.spyOn(
			shortenUrlRepository,
			'createShortenUrl',
		).mockResolvedValueOnce(undefined)
		jest.spyOn(envConfig, 'getAppDomain').mockReturnValue(
			'https://encurta.dev',
		)
		const getUrlDomainMock = getUrlDomain as jest.Mock
		getUrlDomainMock.mockReturnValue('https://encurta.dev/uniq12')

		const result = await service.execute('https://original.com')

		expect(shortenUrlRepository.getByShortCode).toHaveBeenCalledTimes(2)
		expect(shortenUrlRepository.getByShortCode).toHaveBeenNthCalledWith(
			1,
			'exist1',
		)
		expect(shortenUrlRepository.getByShortCode).toHaveBeenNthCalledWith(
			2,
			'uniq12',
		)
		expect(shortenUrlRepository.createShortenUrl).toHaveBeenCalledWith(
			'https://original.com',
			'uniq12',
			undefined,
		)
		expect(envConfig.getAppDomain).toHaveBeenCalled()
		expect(getUrlDomainMock).toHaveBeenCalledWith(
			'https://encurta.dev',
			'uniq12',
		)
		expect(result).toBe('https://encurta.dev/uniq12')
	})
})
