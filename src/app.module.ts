import { Module } from '@nestjs/common'
import { DatabaseModule } from './infrastructure/database/database.module'
import { EnvModule } from './shared/infrastructure/config/env/env.module'
@Module({
	imports: [
		//Configs
		EnvModule,
		DatabaseModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
