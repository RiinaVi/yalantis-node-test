import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UsersTable1629310809376 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'text',
            isPrimary: true,
          },
          {
            name: 'first_name',
            type: 'text',
          },
          {
            name: 'last_name',
            type: 'text',
          },
          {
            name: 'email',
            type: 'text',
          },
          {
            name: 'image',
            type: 'text',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
