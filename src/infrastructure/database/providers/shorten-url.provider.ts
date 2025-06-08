import { Urls } from '@/domain/models/urls.entity'
import { DataSource } from 'typeorm'

export const shortenUrlProvider = [
	{
		provide: 'SHORTEN_URL_REPOSITORY',
		useFactory: (dataSource: DataSource) => dataSource.getRepository(Urls),
		inject: ['DATABASE_TEDDY_CONNECTION'],
	},
]
