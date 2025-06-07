import { IUserRepository } from '@/application/interfaces/user.inteface'
import { CreateUserService } from '@/application/use-cases/user/services/create-user.service'
import { GetUserByEmailService } from '@/application/use-cases/user/services/get-user-by-email.service'
import { UpdateUserService } from '@/application/use-cases/user/services/update-user.service'
import { UserRepository } from '@/infrastructure/repositories/user.repository'
import { Module } from '@nestjs/common'

const user = {
	provide: IUserRepository,
	useClass: UserRepository,
}

@Module({
	providers: [
		user,
		CreateUserService,
		GetUserByEmailService,
		UpdateUserService,
	],
	exports: [CreateUserService, GetUserByEmailService, UpdateUserService],
})
export class UserModule {}
