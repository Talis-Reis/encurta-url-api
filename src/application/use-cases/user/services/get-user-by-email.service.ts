import { IUserRepository } from '@/application/interfaces/user.inteface'
import { Users } from '@/domain/models/users.entity'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class GetUserByEmailService {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute(email: string): Promise<Users> {
		const user: Users = await this.userRepository.getUserByEmail(email)

		if (!user) {
			throw new NotFoundException('Usuário não encontrado.')
		}
		return user
	}
}
