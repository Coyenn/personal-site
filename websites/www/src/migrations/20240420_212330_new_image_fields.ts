import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "media" ADD COLUMN "copyright" varchar;
ALTER TABLE "media" ADD COLUMN "caption" varchar;`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "media" DROP COLUMN IF EXISTS "copyright";
ALTER TABLE "media" DROP COLUMN IF EXISTS "caption";`);

};
