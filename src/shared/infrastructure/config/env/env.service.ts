import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IEnvConfig } from '../../interface/env.interface'

@Injectable()
export class EnvService implements IEnvConfig {
	constructor(private readonly configService: ConfigService) {}

	getPort(): number {
		return this.configService.get<number>('PORT') || 3000
	}
	getNodeEnv(): string {
		return this.configService.get<string>('NODE_ENV') || 'development'
	}
}
