import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUser1685436333973 implements MigrationInterface {
  name = 'createUser1685436333973';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (
        \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`email\` varchar(255) NOT NULL, 
        \`name\` varchar(255) NULL, 
        \`password\` varchar(255) NULL, 
        \`role\` varchar(255) NULL, 
        \`provider\` varchar(255) NULL, 
        UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
