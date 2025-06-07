import { IUserRepository } from '@/application/interfaces/user.inteface'
import { Users } from '@/domain/models/users.entity'
import { UpdateUserDTO } from '@/presentation/auth/dto/auth.dto'
import { HttpException, Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

@Injectable()
export class UserRepository implements IUserRepository {
	constructor(
		@Inject('USER_REPOSITORY')
		private readonly userRepository: Repository<Users>,
	) {}

	async createUser(user: any): Promise<any> {
		return await this.userRepository.save(user)
	}

	async getUserByEmail(email: string): Promise<Users> {
		return await this.userRepository.findOne({
			where: {
				email: email,
			},
		})
	}

	async updateUser(id: number, user: UpdateUserDTO): Promise<void> {
		try {
			await this.userRepository.update(
				{
					id: id,
				},
				{
					...user,
				},
			)
		} catch (err) {
			throw new HttpException(err.message, err.status)
		}
	}
}
