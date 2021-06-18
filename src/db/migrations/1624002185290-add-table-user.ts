import { MigrationInterface, QueryRunner } from 'typeorm'

export class addTableUser1624002185290 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "work"(
          "id"          serial          NOT NULL,
          "name"        VARCHAR         NOT NULL,
          "description" VARCHAR         NOT NULL,
          CONSTRAINT "pk_work_id" PRIMARY KEY ("id"),
          CONSTRAINT "uq_work_name" UNIQUE ("name")
        );
      `)

    await queryRunner.query(`
      CREATE TABLE "users"(
          "id"          serial          NOT NULL,
          "name"        varchar(50)     NOT NULL,
          "password"    varchar(50)     NOT NULL,
          "avatar"      varchar(50)     NOT NULL,
          "address"     varchar(50)     NOT NULL,
          "work_id"     int             NOT NULL,

          CONSTRAINT "pk_user_id" PRIMARY KEY ("id"),
          CONSTRAINT "uq_user_name" UNIQUE ("name"),
          CONSTRAINT "fk_user_work_id" FOREIGN KEY (work_id) REFERENCES work (id)
      );`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP table work;
        DROP table user;
      `)
  }
}
