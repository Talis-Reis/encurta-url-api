import { IUserRepository } from '@/application/interfaces/user.inteface'
import { Injectable } from '@nestjs/common'

@Injectable()
export class GetUserByEmailService {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute(email: string): Promise<any> {
		const user = await this.userRepository.getUserByEmail(email)

		if (!user) {
			throw new Error('Usuário não encontrado.')
		}
		return user
	}
}
