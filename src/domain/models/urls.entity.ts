import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { Users } from './users.entity'

@Index('pk_urls_id', ['id'], { unique: true })
@Index('UQ_34ced802e4a45bf6a6346f2eb97', ['shortCode'], { unique: true })
@Index('IX_urls_userId', ['userId'], {})
@Entity('urls', { schema: 'public' })
export class Urls {
	@PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
	id: number

	@Column('text', { name: 'originalUrl' })
	originalUrl: string

	@Column('character varying', { name: 'shortCode', unique: true, length: 6 })
	shortCode: string

	@Column('integer', { name: 'userId', nullable: true })
	userId: number | null

	@Column('integer', { name: 'clicks', default: () => '0' })
	clicks: number

	@Column('timestamp without time zone', {
		name: 'deletedAt',
		nullable: true,
	})
	deletedAt: Date | null

	@Column('timestamp with time zone', { name: 'createdAt', nullable: true })
	createdAt: Date | null

	@Column('timestamp with time zone', { name: 'updatedAt', nullable: true })
	updatedAt: Date | null

	@ManyToOne(() => Users, users => users.urls, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	@JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
	user: Users
}
