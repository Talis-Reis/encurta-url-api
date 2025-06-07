import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Index('UQ_97672ac88f789774dd47f7c8be3', ['email'], { unique: true })
@Index('pk_users_id', ['id'], { unique: true })
@Entity('users', { schema: 'public' })
export class Users {
	@PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
	id: number

	@Column('character varying', { name: 'email', unique: true })
	email: string

	@Column('character varying', { name: 'password' })
	password: string

	@Column('character varying', { name: 'firstName' })
	firstName: string

	@Column('character varying', { name: 'lastName' })
	lastName: string

	@Column('boolean', { name: 'isActive', default: () => 'true' })
	isActive: boolean

	@Column('timestamp with time zone', { name: 'createdAt', nullable: true })
	createdAt: Date | null

	@Column('timestamp with time zone', { name: 'updatedAt', nullable: true })
	updatedAt: Date | null
}
