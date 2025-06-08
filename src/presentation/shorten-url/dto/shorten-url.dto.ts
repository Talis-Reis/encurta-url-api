import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class InputUrlDTO {
	@ApiProperty()
	@IsString({ message: 'O campo email deve ser uma string' })
	@IsNotEmpty({ message: 'O campo email não pode ser vazio' })
	url: string
}
