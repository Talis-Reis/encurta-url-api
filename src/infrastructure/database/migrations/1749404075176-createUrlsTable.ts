import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey,
	TableIndex,
} from 'typeorm'

export class CreateUrlsTable1749404075176 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'urls',
				columns: [
					{
						name: 'id',
						type: 'serial',
						isPrimary: true,
						primaryKeyConstraintName: 'pk_urls_id',
					},
					{
						name: 'originalUrl',
						type: 'text',
						isNullable: false,
					},
					{
						name: 'shortCode',
						type: 'varchar',
						length: '6',
						isUnique: true,
						isNullable: false,
					},
					{
						name: 'userId',
						type: 'int',
						isNullable: true,
					},
					{
						name: 'clicks',
						type: 'int',
						default: 0,
					},
					{
						name: 'deletedAt',
						type: 'timestamp',
						isNullable: true,
					},
					{
						name: 'createdAt',
						type: 'timestamp with time zone',
						isNullable: true,
					},
					{
						name: 'updatedAt',
						type: 'timestamp with time zone',
						isNullable: true,
					},
				],
			}),
		)

		await queryRunner.createForeignKey(
			'urls',
			new TableForeignKey({
				columnNames: ['userId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'users',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
				name: 'FK_urls_userId',
			}),
		)

		await queryRunner.createIndex(
			'urls',
			new TableIndex({
				name: 'IX_urls_userId',
				columnNames: ['userId'],
			}),
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('urls', true, true, true)
	}
}
