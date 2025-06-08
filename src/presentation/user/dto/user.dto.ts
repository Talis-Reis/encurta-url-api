import { ApiProperty } from '@nestjs/swagger'
import {
	ArrayNotEmpty,
	ArrayUnique,
	IsArray,
	IsEmail,
	IsIn,
	IsNotEmpty,
	IsString,
} from 'class-validator'

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
	@IsString({ message: 'O campo firstName deve ser uma string' })
	@IsNotEmpty({ message: 'O campo firstName não pode ser vazio' })
	firstName: string

	@ApiProperty()
	@IsString({ message: 'O campo lastName deve ser uma string' })
	@IsNotEmpty({ message: 'O campo lastName não pode ser vazio' })
	lastName: string

	@ApiProperty({ type: [String] })
	@IsArray({ message: 'O campo roles deve ser um array' })
	@ArrayNotEmpty({ message: 'O campo roles não pode ser vazio' })
	@ArrayUnique({
		message: 'O campo roles não pode conter valores duplicados',
	})
	@IsString({ each: true, message: 'Cada role deve ser uma string' })
	@IsIn(['admin', 'user'], {
		each: true,
		message: "Cada role deve ser uma das seguintes: 'admin' ou 'user'",
	})
	roles: string[]
}

export class UpdateUserDTO {
	@ApiProperty()
	@IsEmail({}, { message: 'O campo email deve ser um email válido' })
	@IsString({ message: 'O campo email deve ser uma string' })
	@IsNotEmpty({ message: 'O campo email não pode ser vazio' })
	email: string

	@ApiProperty()
	@IsString({ message: 'O campo firstName deve ser uma string' })
	@IsNotEmpty({ message: 'O campo firstName não pode ser vazio' })
	firstName: string

	@ApiProperty()
	@IsString({ message: 'O campo lastName deve ser uma string' })
	@IsNotEmpty({ message: 'O campo lastName não pode ser vazio' })
	lastName: string
}

export class UpdatePermissionsUserDTO {
	@ApiProperty({ type: [String] })
	@IsArray({ message: 'O campo roles deve ser um array' })
	@ArrayNotEmpty({ message: 'O campo roles não pode ser vazio' })
	@ArrayUnique({
		message: 'O campo roles não pode conter valores duplicados',
	})
	@IsString({ each: true, message: 'Cada role deve ser uma string' })
	@IsIn(['admin', 'user'], {
		each: true,
		message: "Cada role deve ser uma das seguintes: 'admin' ou 'user'",
	})
	roles: string[]
}

export class UpdateAccessUserDTO {
	firstAccess: Date
	lastAccess: Date
}
