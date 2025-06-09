import { IShortenUrlRepository } from '@/application/interfaces/shorten-url.interface'
import { Urls } from '@/domain/models/urls.entity'
import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { UpdateClicksService } from '../../services/update-clicks.service'

describe('UpdateClicksService Unit Test', () => {
	let service: UpdateClicksService
	let shortenUrlRepository: IShortenUrlRepository

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UpdateClicksService,
				{
					provide: IShortenUrlRepository,
					useValue: {
						getById: jest.fn(),
						updateClicks: jest.fn(),
					},
				},
			],
		}).compile()

		service = module.get<UpdateClicksService>(UpdateClicksService)
		shortenUrlRepository = module.get<IShortenUrlRepository>(
			IShortenUrlRepository,
		)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	it('should throw NotFoundException if url does not exist', async () => {
		jest.spyOn(shortenUrlRepository, 'getById').mockResolvedValueOnce(
			undefined,
		)

		await expect(service.execute(1)).rejects.toThrow(NotFoundException)
	})

	it('should update clicks if url exists', async () => {
		const url = { id: 1, clicks: 5 } as Urls
		jest.spyOn(shortenUrlRepository, 'getById').mockResolvedValueOnce(url)
		const updateSpy = jest
			.spyOn(shortenUrlRepository, 'updateClicks')
			.mockResolvedValueOnce(undefined)

		await service.execute(1)

		expect(shortenUrlRepository.getById).toHaveBeenCalledWith(1)
		expect(updateSpy).toHaveBeenCalledWith(1, 6)
	})
})
