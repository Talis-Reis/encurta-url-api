import { IShortenUrlRepository } from '@/application/interfaces/shorten-url.interface'
import { Urls } from '@/domain/models/urls.entity'
import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { GetShortCodeService } from '../../services/get-short-code.service'

describe('GetShortCodeService Unit Test', () => {
	let service: GetShortCodeService
	let shortenUrlRepository: IShortenUrlRepository

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				GetShortCodeService,
				{
					provide: IShortenUrlRepository,
					useValue: {
						getByShortCode: jest.fn(),
					},
				},
			],
		}).compile()

		service = module.get<GetShortCodeService>(GetShortCodeService)
		shortenUrlRepository = module.get<IShortenUrlRepository>(
			IShortenUrlRepository,
		)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	it('should return Urls if short code exists', async () => {
		const url = { id: 1, shortCode: 'abc123' } as Urls
		jest.spyOn(
			shortenUrlRepository,
			'getByShortCode',
		).mockResolvedValueOnce(url)

		const result = await service.execute('abc123')

		expect(shortenUrlRepository.getByShortCode).toHaveBeenCalledWith(
			'abc123',
		)
		expect(result).toBe(url)
	})

	it('should throw NotFoundException if short code does not exist', async () => {
		jest.spyOn(
			shortenUrlRepository,
			'getByShortCode',
		).mockResolvedValueOnce(undefined)

		await expect(service.execute('notfound')).rejects.toThrow(
			NotFoundException,
		)
	})
})
