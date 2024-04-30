import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "pages_blocks_image" ADD COLUMN "lightbox" boolean;
ALTER TABLE "projects_blocks_image" ADD COLUMN "lightbox" boolean;
ALTER TABLE "blog_posts_blocks_image" ADD COLUMN "lightbox" boolean;`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "pages_blocks_image" DROP COLUMN IF EXISTS "lightbox";
ALTER TABLE "projects_blocks_image" DROP COLUMN IF EXISTS "lightbox";
ALTER TABLE "blog_posts_blocks_image" DROP COLUMN IF EXISTS "lightbox";`);

};
