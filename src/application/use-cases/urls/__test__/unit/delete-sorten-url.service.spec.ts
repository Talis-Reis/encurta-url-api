import { IShortenUrlRepository } from '@/application/interfaces/shorten-url.interface'
import { Urls } from '@/domain/models/urls.entity'
import { IEnvConfig } from '@/shared/common/infrastructure/interface/env.interface'
import { ForbiddenException, NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { DeleteShortenUrlService } from '../../services/delete-sorten-url.service'

describe('DeleteShortenUrlService Unit Test', () => {
	let service: DeleteShortenUrlService
	let shortenUrlRepository: IShortenUrlRepository

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				DeleteShortenUrlService,
				{
					provide: IShortenUrlRepository,
					useValue: {
						getById: jest.fn(),
						deleteUrl: jest.fn(),
					},
				},
				{
					provide: IEnvConfig,
					useValue: {},
				},
			],
		}).compile()

		service = module.get<DeleteShortenUrlService>(DeleteShortenUrlService)
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

		await expect(service.execute(1, 10)).rejects.toThrow(NotFoundException)
	})

	it('should throw ForbiddenException if user is not the owner', async () => {
		const url = { id: 1, userId: 99 } as Urls
		jest.spyOn(shortenUrlRepository, 'getById').mockResolvedValueOnce(url)

		await expect(service.execute(1, 10)).rejects.toThrow(ForbiddenException)
	})

	it('should delete url and return success message', async () => {
		const url = { id: 1, userId: 10 } as Urls
		jest.spyOn(shortenUrlRepository, 'getById').mockResolvedValueOnce(url)
		const deleteSpy = jest
			.spyOn(shortenUrlRepository, 'deleteUrl')
			.mockResolvedValueOnce(undefined)

		const result = await service.execute(1, 10)

		expect(shortenUrlRepository.getById).toHaveBeenCalledWith(1)
		expect(deleteSpy).toHaveBeenCalledWith(1, 10)
		expect(result).toEqual({ message: 'URL excluída com sucesso' })
	})
})
