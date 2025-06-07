import { IUserRepository } from '@/application/interfaces/user.inteface'
import { Users } from '@/domain/models/users.entity'
import { Inject, Injectable } from '@nestjs/common'
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

	async findUserByEmail(email: string): Promise<any> {
		return await this.userRepository.findOne({
			where: {
				email: email,
			},
		})
	}

	async findUserById(id: string): Promise<any> {
		throw new Error('Method not implemented.')
	}
}
