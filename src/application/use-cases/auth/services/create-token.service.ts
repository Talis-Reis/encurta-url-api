import { IAuth } from '@/application/interfaces/auth.interface'
import { Users } from '@/domain/models/users.entity'
import { LoginDTO, UpdateUserDTO } from '@/presentation/auth/dto/auth.dto'
import { comparePassword } from '@/shared/utils/password'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { GetUserByEmailService } from '../../user/services/get-user-by-email.service'
import { UpdateUserService } from '../../user/services/update-user.service'

@Injectable()
export class CreateTokenService {
	constructor(
		private readonly authService: IAuth,
		private readonly getUserByEmailService: GetUserByEmailService,
		private readonly updateUserService: UpdateUserService,
	) {}

	async execute(login: LoginDTO): Promise<{ accessToken: string }> {
		const resultUser: Users = await this.getUserByEmailService.execute(
			login.email,
		)

		const { id, email }: { id: number; email: string } = resultUser

		const password = await comparePassword(
			login.password,
			resultUser.password,
		)

		if (!password)
			throw new UnauthorizedException('Usuário ou senha incorretos.')

		const userUpdate = new UpdateUserDTO()

		if (!resultUser.firstAccess) {
			userUpdate.firstAccess = new Date()
		}

		userUpdate.lastAccess = new Date()

		const authorization: string[] = resultUser.roles

		const accessToken: string = await this.authService.createToken({
			jti: randomUUID(),
			sub: id,
			email: email,
			authorization: authorization,
		})

		await this.updateUserService.execute(id, email, userUpdate)

		return { accessToken: accessToken }
	}
}
