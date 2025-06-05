import { Global, Module } from '@nestjs/common'
import { DatabaseProvidersModule } from './providers/database.providers.module'

@Global()
@Module({
	imports: [DatabaseProvidersModule],
})
export class DatabaseModule {}
