import { JwtAuthGuard } from '@/application/use-cases/auth/guard/passport/jwt.guard'
import { RolesGuard } from '@/application/use-cases/auth/guard/passport/roles.guard'
import { UpdatePermissionUserService } from '@/application/use-cases/user/services/update-permission-user.service'
import { UpdateUserService } from '@/application/use-cases/user/services/update-user.service'
import { MessageType } from '@/shared/common/@types/message.type'
import { ReqType } from '@/shared/common/@types/request.type'
import { Roles } from '@/shared/common/decorator/roles.decorator'
import { Body, Controller, Param, Put, Req, UseGuards } from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger'
import { UpdatePermissionsUserDTO, UpdateUserDTO } from './dto/user.dto'

@Controller('/api/v1/users')
@ApiTags('Usuários')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
	constructor(
		private readonly updatePermissionUserService: UpdatePermissionUserService,
		private readonly updateUserService: UpdateUserService,
	) {}

	@Put('change-user')
	@ApiOperation({ summary: 'Altera dados de um usuário' })
	@ApiResponse({
		status: 200,
		description: 'Success',
	})
	@ApiResponse({ status: 500, description: 'Server Error' })
	@ApiResponse({ status: 400, description: 'Bad Request' })
	async alterarUser(
		@Body() user: UpdateUserDTO,
		@Req() req: ReqType,
	): Promise<MessageType> {
		const idUser: number = req.user.sub
		return await this.updateUserService.execute(idUser, user)
	}

	@Put(':id/permissions')
	@ApiOperation({ summary: 'Altera permissões de um usuário' })
	@ApiResponse({
		status: 200,
		description: 'Success',
	})
	@ApiResponse({ status: 500, description: 'Server Error' })
	@ApiResponse({ status: 400, description: 'Bad Request' })
	@Roles('admin')
	async alterarPermissoes(
		@Param('id') idUser: number,
		@Body() permissionUser: UpdatePermissionsUserDTO,
		@Req() req: ReqType,
	): Promise<MessageType> {
		return await this.updatePermissionUserService.execute(
			idUser,
			permissionUser,
		)
	}

	@Put('change-password')
	@ApiOperation({ summary: 'Altera senha de um usuário' })
	@ApiResponse({
		status: 200,
		description: 'Success',
	})
	@ApiResponse({ status: 500, description: 'Server Error' })
	@ApiResponse({ status: 400, description: 'Bad Request' })
	async alterarSenha(
		@Body() permissionUser: UpdatePermissionsUserDTO,
		@Req() req: ReqType,
	): Promise<MessageType> {
		const idUser: number = req.user.sub
		// return await this.updatePermissionUserService.execute(
		// 	idUser,
		// 	permissionUser,
		// )

		return null
	}
}
