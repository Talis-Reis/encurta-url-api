import { Test, TestingModule } from '@nestjs/testing'
import { UpdatePermissionUserService } from '../../services/update-permission-user.service'

describe('UpdatePermissionUserService', () => {
	let service: UpdatePermissionUserService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UpdatePermissionUserService],
		}).compile()

		service = module.get<UpdatePermissionUserService>(
			UpdatePermissionUserService,
		)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
