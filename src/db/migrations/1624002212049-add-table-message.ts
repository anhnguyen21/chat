import { MigrationInterface, QueryRunner } from 'typeorm'

export class addTableMessage1624002212049 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE "conversation"
    (
        "id"                serial        NOT NULL,
        "title"             varchar(255)  NOT NULL,
        "conversation_type" varchar(50)   NOT NULL,
        "last_message_info" json          NULL,
        "created_by"        int           NOT NULL,
        "created_at"        timestamp     NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "modified_at"       timestamp     NOT NULL DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT "pk_conversation" PRIMARY KEY ("id"),
        CONSTRAINT "fk_conversation_created_by" FOREIGN KEY (created_by) REFERENCES "users" (id)
    )
`)
    await queryRunner.query(`
    CREATE TABLE "message"
    (
        "id"                    serial        NOT NULL,
        "conversation_id"       int           NOT NULL,
        "sender_id"             int           NOT NULL,
        "message"               varchar(255)  NOT NULL,
        "message_type"          varchar(50)   NOT NULL,
        "created_at"            timestamp     NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "modified_at"           timestamp     NOT NULL DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT "pk_message" PRIMARY KEY ("id"),
        CONSTRAINT "fk_message_conversation_id" FOREIGN KEY (conversation_id) REFERENCES conversation (id),
        CONSTRAINT "fk_message_sender_id" FOREIGN KEY (sender_id) REFERENCES "users" (id)
    )
`)
    await queryRunner.query(`
    CREATE TABLE "participant"
    (
        "id"                    serial      NOT NULL,
        "user_id"               int         NOT NULL,
        "conversation_id"       int         NOT NULL,
        "seen"                  boolean     NOT NULL DEFAULT false,
        "isActive"              boolean     NOT NULL DEFAULT false,

        CONSTRAINT "pk_participant" PRIMARY KEY ("id"),
        CONSTRAINT "fk_participant_user_id" FOREIGN KEY (user_id) REFERENCES "users" (id),
        CONSTRAINT "fk_participant_conversation_id" FOREIGN KEY (conversation_id) REFERENCES conversation (id),
        CONSTRAINT "unq_participant_user_conversation" UNIQUE ("user_id", "conversation_id")
    );
  `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE participant;
        DROP TABLE message;
        DROP TABLE conversation;
    `)
  }
}
