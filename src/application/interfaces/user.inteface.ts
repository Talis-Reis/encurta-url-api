export abstract class IUserRepository {
	abstract createUser(user: any): Promise<any>
	abstract findUserByEmail(email: string): Promise<any>
	abstract findUserById(id: string): Promise<any>
}
