const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialMigration1668805354377 {
    name = 'initialMigration1668805354377'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."user_account_type_enum" AS ENUM('sysadmin', 'baby_sitter', 'home_care_assistant', 'client')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying(200) NOT NULL, "password" character varying(200) NOT NULL, "first_name" character varying(200) NOT NULL, "last_name" character varying(200) NOT NULL, "account_type" "public"."user_account_type_enum" NOT NULL DEFAULT 'client', "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."client_account_account_status_enum" AS ENUM('approved', 'banned', 'blocked', 'pending', 'pending_confirmation')`);
        await queryRunner.query(`CREATE TABLE "client_account" ("id" SERIAL NOT NULL, "country" character varying(200) NOT NULL, "city" character varying(200) NOT NULL, "address" character varying(200) NOT NULL, "postal_code" character varying(200) NOT NULL, "account_status" "public"."client_account_account_status_enum" NOT NULL DEFAULT 'pending_confirmation', "is_email_verified" boolean NOT NULL DEFAULT false, "profile_picture" character varying, "phone_number" character varying(200), "is_phone_number_verified" boolean, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "userId" integer, CONSTRAINT "REL_069cad6e894923a04b062a18e1" UNIQUE ("userId"), CONSTRAINT "PK_b3627c981b3d782cb5a2845e3d8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."sitter_account_account_status_enum" AS ENUM('approved', 'banned', 'blocked', 'pending', 'pending_confirmation')`);
        await queryRunner.query(`CREATE TYPE "public"."sitter_account_highest_academic_level_enum" AS ENUM('no_academic_level', 'brevet', 'baccalaureat', 'BAC_1', 'BAC_2', 'BAC_3', 'BAC_4', 'BAC_5')`);
        await queryRunner.query(`CREATE TABLE "sitter_account" ("id" SERIAL NOT NULL, "country" character varying(200) NOT NULL, "city" character varying(200) NOT NULL, "address" character varying(200) NOT NULL, "postal_code" character varying(200) NOT NULL, "date_of_birth" date NOT NULL, "bio" character varying(1000) NOT NULL, "account_status" "public"."sitter_account_account_status_enum" NOT NULL DEFAULT 'pending_confirmation', "profile_completion_progress" numeric NOT NULL DEFAULT '0', "is_kyc_completed" boolean NOT NULL DEFAULT false, "spoken_languages" text NOT NULL, "hourly_rate" numeric NOT NULL, "availability_periods" text NOT NULL, "is_email_verified" boolean NOT NULL DEFAULT false, "profile_picture" character varying NOT NULL, "proposed_services" text NOT NULL, "phone_number" character varying(200), "is_phone_number_verified" boolean, "highest_academic_level" "public"."sitter_account_highest_academic_level_enum", "years_of_xp" integer, "xp_types" text, "client_with_special_need_xp" boolean, "characteristics" text, "additional_characteristics" text, "official_identity_document" character varying, "criminal_record_document" character varying, "is_criminal_record_document_verified" boolean, "bafa_certificate" character varying, "is_bafa_certificate_verified" boolean, "first_aid_certificate" character varying, "is_first_aid_certificate_verified" boolean, "badges" text, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "userId" integer, CONSTRAINT "REL_6c1a17994b095d29f39fc4ce2b" UNIQUE ("userId"), CONSTRAINT "PK_60dd52bead95c734915d1e3dfc5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "client_account" ADD CONSTRAINT "FK_069cad6e894923a04b062a18e19" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sitter_account" ADD CONSTRAINT "FK_6c1a17994b095d29f39fc4ce2ba" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "sitter_account" DROP CONSTRAINT "FK_6c1a17994b095d29f39fc4ce2ba"`);
        await queryRunner.query(`ALTER TABLE "client_account" DROP CONSTRAINT "FK_069cad6e894923a04b062a18e19"`);
        await queryRunner.query(`DROP TABLE "sitter_account"`);
        await queryRunner.query(`DROP TYPE "public"."sitter_account_highest_academic_level_enum"`);
        await queryRunner.query(`DROP TYPE "public"."sitter_account_account_status_enum"`);
        await queryRunner.query(`DROP TABLE "client_account"`);
        await queryRunner.query(`DROP TYPE "public"."client_account_account_status_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_account_type_enum"`);
    }
}
