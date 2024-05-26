import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "media" ADD COLUMN "focal_x" numeric;
ALTER TABLE "media" ADD COLUMN "focal_y" numeric;`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "media" DROP COLUMN IF EXISTS "focal_x";
ALTER TABLE "media" DROP COLUMN IF EXISTS "focal_y";`);

};
