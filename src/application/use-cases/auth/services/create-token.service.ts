import { LoginDTO } from '@/presentation/auth/dto/auth.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CreateTokenService {
	constructor() // private readonly authRepository: IAuthRepository,
	// private readonly userRepository: IAccountsRepository,
	{}

	async execute(login: LoginDTO): Promise<{ accessToken: string }> {
		return null as any
		// const resultUser: ExternalServiceUsers =
		//     await this.userRepository.getUser(login.userName);

		// if (!resultUser) throw new NotFoundException('Usuario não encontrado');

		// const {
		//     id,
		//     userName,
		//     accountId,
		// }: { id: number; userName: string; accountId: UUID } = resultUser;

		// const password = await comparePassword(
		//     login.password,
		//     resultUser.password,
		// );

		// if (!password)
		//     throw new UnauthorizedException('Usuário ou senha incorretos.');

		// const userUpdate = new UpdateUserDTO();

		// if (!resultUser.firstAccess) {
		//     userUpdate.firstAccess = new Date();
		// }

		// userUpdate.lastAccess = new Date();

		// const authorization: string[] = [];

		// if (resultUser.useRDV) authorization.push('rdv');
		// if (resultUser.useRTR) authorization.push('rtr');
		// if (resultUser.useOrders) authorization.push('pedidos');

		// const accessToken: string = await this.authRepository.createToken({
		//     jti: randomUUID(),
		//     sub: id,
		//     userId: resultUser.userId,
		//     userName: userName,
		//     accountId: accountId,
		//     authorization: authorization,
		// });

		// await this.userRepository.updateUser(accountId, id, userUpdate);

		// return { accessToken: accessToken };
	}
}
