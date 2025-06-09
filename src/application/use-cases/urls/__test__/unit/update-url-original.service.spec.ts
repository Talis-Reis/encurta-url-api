import { IShortenUrlRepository } from '@/application/interfaces/shorten-url.interface'
import { Urls } from '@/domain/models/urls.entity'
import { IEnvConfig } from '@/shared/common/infrastructure/interface/env.interface'
import { ForbiddenException, NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { UpdateUrlOriginalService } from '../../services/update-url-original.service'

describe('UpdateUrlOriginalService Unit Test', () => {
	let service: UpdateUrlOriginalService
	let shortenUrlRepository: IShortenUrlRepository

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UpdateUrlOriginalService,
				{
					provide: IShortenUrlRepository,
					useValue: {
						getById: jest.fn(),
						updateUrlOriginal: jest.fn(),
					},
				},
				{
					provide: IEnvConfig,
					useValue: {},
				},
			],
		}).compile()

		service = module.get<UpdateUrlOriginalService>(UpdateUrlOriginalService)
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

		await expect(
			service.execute(1, 'https://nova.com', 10),
		).rejects.toThrow(NotFoundException)
	})

	it('should throw ForbiddenException if user is not the owner', async () => {
		const url = { id: 1, userId: 99 } as Urls
		jest.spyOn(shortenUrlRepository, 'getById').mockResolvedValueOnce(url)

		await expect(
			service.execute(1, 'https://nova.com', 10),
		).rejects.toThrow(ForbiddenException)
	})

	it('should update url original and return success message', async () => {
		const url = { id: 1, userId: 10 } as Urls
		jest.spyOn(shortenUrlRepository, 'getById').mockResolvedValueOnce(url)
		const updateSpy = jest
			.spyOn(shortenUrlRepository, 'updateUrlOriginal')
			.mockResolvedValueOnce(undefined)

		const result = await service.execute(1, 'https://nova.com', 10)

		expect(shortenUrlRepository.getById).toHaveBeenCalledWith(1)
		expect(updateSpy).toHaveBeenCalledWith(1, 'https://nova.com', 10)
		expect(result).toEqual({
			message: 'URL de origem atualizada com sucesso',
		})
	})
})
