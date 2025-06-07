import { IUserRepository } from '@/application/interfaces/user.inteface'
import { CreateUserService } from '@/application/use-cases/user/services/create-user.service'
import { UserRepository } from '@/infrastructure/repositories/user.repository'
import { Module } from '@nestjs/common'

const user = {
	provide: IUserRepository,
	useClass: UserRepository,
}

@Module({
	providers: [user, CreateUserService],
	exports: [CreateUserService],
})
export class UserModule {}
