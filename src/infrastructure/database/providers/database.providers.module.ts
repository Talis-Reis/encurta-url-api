import { Module } from '@nestjs/common'
import { DataBaseConfig } from '../config/database-config'
import { databaseConnection } from './database-connection.provider'

@Module({
	imports: [],
	providers: [DataBaseConfig, ...databaseConnection],
	exports: [...databaseConnection],
})
export class DatabaseProvidersModule {}
