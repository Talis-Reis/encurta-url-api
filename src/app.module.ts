import { Module } from '@nestjs/common'
import { EnvModule } from './shared/infrastructure/config/env/env.module'

@Module({
	imports: [
		//Configs
		EnvModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
