import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class InputUrlDTO {
	@ApiProperty()
	@IsString({ message: 'O campo email deve ser uma string' })
	@IsNotEmpty({ message: 'O campo email não pode ser vazio' })
	url: string
}

export class ResponseListShortenUrlDTO {
	@ApiProperty()
	id: number

	@ApiProperty()
	original_url: string

	@ApiProperty()
	clicks: number

	@ApiProperty()
	short_url: string

	constructor(
		id: number,
		originalUrl: string,
		clicks: number,
		shortUrl: string,
	) {
		this.id = id
		this.original_url = originalUrl
		this.clicks = clicks
		this.short_url = shortUrl
	}
}
