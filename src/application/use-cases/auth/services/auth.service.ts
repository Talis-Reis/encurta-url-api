import { IAuth } from '@/application/interfaces/auth.interface'
import { IEnvConfig } from '@/shared/infrastructure/interface/env.interface'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService implements IAuth {
	constructor(
		private readonly jwtService: JwtService,
		private readonly env: IEnvConfig,
	) {}

	async createToken(payload: any): Promise<string> {
		const options = {
			expiresIn: this.env.getExpirationKey(),
		}

		return this.jwtService.sign(payload, options)
	}

	async verifyToken(token: string): Promise<any> {
		try {
			const decoded = this.jwtService.verify(token, {
				secret: this.env.getKeySecret(),
			})
			return decoded
		} catch (error) {
			throw new UnauthorizedException('Não autorizado')
		}
	}
}
