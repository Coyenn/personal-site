import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "pages" ALTER COLUMN "slug" DROP NOT NULL;
ALTER TABLE "pages" ADD COLUMN "edit_slug" boolean;
CREATE UNIQUE INDEX IF NOT EXISTS "pages_slug_idx" ON "pages" ("slug");`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP INDEX IF EXISTS "pages_slug_idx";
ALTER TABLE "pages" ALTER COLUMN "slug" SET NOT NULL;
ALTER TABLE "pages" DROP COLUMN IF EXISTS "edit_slug";`);

};
