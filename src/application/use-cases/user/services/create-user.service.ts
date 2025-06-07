import { IUserRepository } from '@/application/interfaces/user.inteface'
import { Users } from '@/domain/models/users.entity'
import { InputUserDTO } from '@/presentation/user/dto/user.dto'
import { createPassword } from '@/shared/utils/password'
import { BadRequestException, Injectable } from '@nestjs/common'

@Injectable()
export class CreateUserService {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute(inputUser: InputUserDTO): Promise<{ message: string }> {
		const resultUser: Users = await this.userRepository.getUserByEmail(
			inputUser.email,
		)

		if (resultUser) throw new BadRequestException('Email já em uso.')

		if (!this.validarSenha(inputUser.password)) {
			throw new BadRequestException(
				'A senha precisa ter no mínimo: 1 caracter especial, 1 número e 1 letra maiúscula.',
			)
		}

		inputUser.password = await createPassword(inputUser.password)

		await this.userRepository.createUser(inputUser)
		return { message: 'Usuário criado com sucesso.' }
	}

	private validarSenha(senha: string): boolean {
		const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/
		return regex.test(senha)
	}
}
