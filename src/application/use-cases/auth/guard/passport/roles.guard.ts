import { ROLES_KEY } from '@/shared/common/decorator/roles.decorator'
import {
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
	constructor(private reflector: Reflector) {
		super()
	}

	handleRequest(err, user, info, context: ExecutionContext) {
		if (err || !user) {
			throw err || new ForbiddenException('Usuário não autenticado.')
		}

		const roles: string[] = this.reflector.getAllAndOverride<string[]>(
			ROLES_KEY,
			[context.getHandler(), context.getClass()],
		)

		if (!roles || roles.length === 0) {
			return user
		}

		if (!user.authorization) {
			throw new ForbiddenException('Usuário sem autorização definida.')
		}

		const hasRole = roles.some(role => user.authorization.includes(role))

		if (!hasRole) {
			throw new ForbiddenException('Acesso negado.')
		}

		return user
	}
}
