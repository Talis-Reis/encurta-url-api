import { Users } from '@/domain/models/users.entity'
import { UpdateUserDTO } from '@/presentation/auth/dto/auth.dto'

export abstract class IUserRepository {
	abstract createUser(user: any): Promise<any>
	abstract getUserByEmail(email: string): Promise<Users>
	abstract updateUser(id: number, user: UpdateUserDTO): Promise<void>
}
