const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class extendAcademicLevelEnum1668811942606 {
    name = 'extendAcademicLevelEnum1668811942606'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TYPE "public"."user_account_type_enum" RENAME TO "user_account_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_account_type_enum" AS ENUM('baby_sitter', 'home_care_assistant', 'client')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "account_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "account_type" TYPE "public"."user_account_type_enum" USING "account_type"::"text"::"public"."user_account_type_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "account_type" SET DEFAULT 'client'`);
        await queryRunner.query(`DROP TYPE "public"."user_account_type_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."sitter_account_highest_academic_level_enum" RENAME TO "sitter_account_highest_academic_level_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."sitter_account_highest_academic_level_enum" AS ENUM('no_academic_level', 'brevet', 'baccalaureat', 'bac_1', 'bac_2', 'bac_3', 'bac_4', 'bac_5')`);
        await queryRunner.query(`ALTER TABLE "sitter_account" ALTER COLUMN "highest_academic_level" TYPE "public"."sitter_account_highest_academic_level_enum" USING "highest_academic_level"::"text"::"public"."sitter_account_highest_academic_level_enum"`);
        await queryRunner.query(`DROP TYPE "public"."sitter_account_highest_academic_level_enum_old"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."sitter_account_highest_academic_level_enum_old" AS ENUM('no_academic_level', 'brevet', 'baccalaureat', 'BAC_1', 'BAC_2', 'BAC_3', 'BAC_4', 'BAC_5')`);
        await queryRunner.query(`ALTER TABLE "sitter_account" ALTER COLUMN "highest_academic_level" TYPE "public"."sitter_account_highest_academic_level_enum_old" USING "highest_academic_level"::"text"::"public"."sitter_account_highest_academic_level_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."sitter_account_highest_academic_level_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."sitter_account_highest_academic_level_enum_old" RENAME TO "sitter_account_highest_academic_level_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."user_account_type_enum_old" AS ENUM('sysadmin', 'baby_sitter', 'home_care_assistant', 'client')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "account_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "account_type" TYPE "public"."user_account_type_enum_old" USING "account_type"::"text"::"public"."user_account_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "account_type" SET DEFAULT 'client'`);
        await queryRunner.query(`DROP TYPE "public"."user_account_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_account_type_enum_old" RENAME TO "user_account_type_enum"`);
    }
}
