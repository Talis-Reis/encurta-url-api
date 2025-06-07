import { IUserRepository } from '@/application/interfaces/user.inteface'
import { Users } from '@/domain/models/users.entity'
import { UpdateUserDTO } from '@/presentation/auth/dto/auth.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UpdateUserService {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute(
		id: number,
		email: string,
		user: UpdateUserDTO,
	): Promise<void> {
		const existingUser: Users =
			await this.userRepository.getUserByEmail(email)

		if (!existingUser) {
			throw new Error(
				'Problema ao atualizar usuário: usuário não encontrado.',
			)
		}

		await this.userRepository.updateUser(id, user)
	}
}
