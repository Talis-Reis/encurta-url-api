import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class InputUserDTO {
	@ApiProperty()
	@IsEmail({}, { message: 'O campo email deve ser um email válido' })
	@IsString({ message: 'O campo email deve ser uma string' })
	@IsNotEmpty({ message: 'O campo email não pode ser vazio' })
	email: string

	@ApiProperty()
	@IsString({ message: 'O campo password deve ser uma string' })
	@IsNotEmpty({ message: 'O campo password não pode ser vazio' })
	password: string

	@ApiProperty()
	@IsString({ message: 'O campo password deve ser uma string' })
	@IsNotEmpty({ message: 'O campo password não pode ser vazio' })
	firstName: string

	@ApiProperty()
	@IsString({ message: 'O campo password deve ser uma string' })
	@IsNotEmpty({ message: 'O campo password não pode ser vazio' })
	lastName: string

	@ApiProperty()
	@IsBoolean({
		message: `O campo 'isActive' deve ser um booleano`,
	})
	isActive: boolean
}
