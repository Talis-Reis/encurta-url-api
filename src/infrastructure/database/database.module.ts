import { Global, Module } from '@nestjs/common'
import { DataBaseConfig } from './config/database-config'
import { databaseConnection } from './providers/database-connection.provider'
import { shortenUrlProvider } from './providers/shorten-url.provider'
import { userProvider } from './providers/user.provider'

@Global()
@Module({
	providers: [
		DataBaseConfig,
		...databaseConnection,
		...userProvider,
		...shortenUrlProvider,
	],
	exports: [...databaseConnection, ...userProvider, ...shortenUrlProvider],
})
export class DatabaseModule {}
