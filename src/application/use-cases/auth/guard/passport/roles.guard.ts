import { ROLES_KEY } from '@/shared/common/decorator/roles.decorator'
import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const roles: string[] = this.reflector.getAllAndOverride<string[]>(
			ROLES_KEY,
			[context.getHandler(), context.getClass()],
		)

		if (!roles || roles.length === 0) {
			return true
		}

		const { user } = context.switchToHttp().getRequest()

		if (!user || !user.authorization) {
			throw new ForbiddenException('Usuário não autorizado.')
		}

		const hasRole = roles.some(role => user.authorization.includes(role))

		if (!hasRole) {
			throw new ForbiddenException('Acesso negado.')
		}

		return true
	}
}
