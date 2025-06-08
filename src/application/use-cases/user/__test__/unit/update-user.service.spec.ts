import { Test, TestingModule } from '@nestjs/testing'
import { UpdateAccessUserService } from '../../services/update-access-user.service'

describe('UpdateAccessUserService', () => {
	let service: UpdateAccessUserService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UpdateAccessUserService],
		}).compile()

		service = module.get<UpdateAccessUserService>(UpdateAccessUserService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
