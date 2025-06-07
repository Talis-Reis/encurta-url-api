import { IAuth } from '@/application/interfaces/auth.interface'
import { Injectable } from '@nestjs/common'

@Injectable()
export class VerifyTokenService {
	constructor(private readonly authService: IAuth) {}

	async execute(token: string): Promise<any> {
		return await this.authService.verifyToken(token)
	}
}
