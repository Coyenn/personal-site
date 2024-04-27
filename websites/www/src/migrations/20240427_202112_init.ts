import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_pages_layout" AS ENUM('default');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_page_section_size" AS ENUM('default', 'xs', 'sm', 'lg', 'xl', '2xl', 'full');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_projects_blocks_page_section_size" AS ENUM('default', 'xs', 'sm', 'lg', 'xl', '2xl', 'full');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_blog_posts_blocks_page_section_size" AS ENUM('default', 'xs', 'sm', 'lg', 'xl', '2xl', 'full');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"login_attempts" numeric,
	"lock_until" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "pages_blocks_image" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_text" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"text" jsonb NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_show_reel" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_projects" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_blog_posts" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_inspirations" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_craft" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_image_slider_images" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "pages_blocks_image_slider" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_stats_stats" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"value" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "pages_blocks_stats" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_tools_tools" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar NOT NULL,
	"link" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "pages_blocks_tools" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_page_section" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"size" "enum_pages_blocks_page_section_size" NOT NULL,
	"disable_padding" boolean,
	"disable_container" boolean,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"slug" varchar,
	"edit_slug" boolean,
	"layout" "enum_pages_layout" NOT NULL,
	"in_header" boolean,
	"in_footer" boolean,
	"intro" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "pages_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"alt" varchar,
	"copyright" varchar,
	"caption" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"thumbnail_u_r_l" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric
);

CREATE TABLE IF NOT EXISTS "projects_blocks_image" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "projects_blocks_text" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"text" jsonb NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "projects_blocks_show_reel" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "projects_blocks_projects" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "projects_blocks_blog_posts" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "projects_blocks_inspirations" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "projects_blocks_craft" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "projects_blocks_image_slider_images" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "projects_blocks_image_slider" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "projects_blocks_stats_stats" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"value" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "projects_blocks_stats" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "projects_blocks_tools_tools" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar NOT NULL,
	"link" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "projects_blocks_tools" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "projects_blocks_page_section" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"size" "enum_projects_blocks_page_section_size" NOT NULL,
	"disable_padding" boolean,
	"disable_container" boolean,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar NOT NULL,
	"timeframe" varchar NOT NULL,
	"slug" varchar,
	"edit_slug" boolean,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "projects_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "blog_posts_authors" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"link" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "blog_posts_blocks_image" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "blog_posts_blocks_text" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"text" jsonb NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "blog_posts_blocks_show_reel" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "blog_posts_blocks_projects" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "blog_posts_blocks_blog_posts" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "blog_posts_blocks_inspirations" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "blog_posts_blocks_craft" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "blog_posts_blocks_image_slider_images" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "blog_posts_blocks_image_slider" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "blog_posts_blocks_stats_stats" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"value" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "blog_posts_blocks_stats" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "blog_posts_blocks_tools_tools" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar NOT NULL,
	"link" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "blog_posts_blocks_tools" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "blog_posts_blocks_page_section" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"size" "enum_blog_posts_blocks_page_section_size" NOT NULL,
	"disable_padding" boolean,
	"disable_container" boolean,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "blog_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"date" timestamp(3) with time zone NOT NULL,
	"slug" varchar,
	"edit_slug" boolean,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "blog_posts_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "craft_items_tags" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"tag" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "craft_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar,
	"slug" varchar,
	"edit_slug" boolean,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "craft_items_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "inspiration_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"link" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "inspiration_items_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar,
	"value" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"batch" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");
CREATE INDEX IF NOT EXISTS "pages_blocks_image_order_idx" ON "pages_blocks_image" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_image_parent_id_idx" ON "pages_blocks_image" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_image_path_idx" ON "pages_blocks_image" ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_text_order_idx" ON "pages_blocks_text" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_text_parent_id_idx" ON "pages_blocks_text" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_text_path_idx" ON "pages_blocks_text" ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_show_reel_order_idx" ON "pages_blocks_show_reel" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_show_reel_parent_id_idx" ON "pages_blocks_show_reel" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_show_reel_path_idx" ON "pages_blocks_show_reel" ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_projects_order_idx" ON "pages_blocks_projects" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_projects_parent_id_idx" ON "pages_blocks_projects" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_projects_path_idx" ON "pages_blocks_projects" ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_blog_posts_order_idx" ON "pages_blocks_blog_posts" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_blog_posts_parent_id_idx" ON "pages_blocks_blog_posts" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_blog_posts_path_idx" ON "pages_blocks_blog_posts" ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_inspirations_order_idx" ON "pages_blocks_inspirations" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_inspirations_parent_id_idx" ON "pages_blocks_inspirations" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_inspirations_path_idx" ON "pages_blocks_inspirations" ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_craft_order_idx" ON "pages_blocks_craft" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_craft_parent_id_idx" ON "pages_blocks_craft" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_craft_path_idx" ON "pages_blocks_craft" ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_image_slider_images_order_idx" ON "pages_blocks_image_slider_images" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_image_slider_images_parent_id_idx" ON "pages_blocks_image_slider_images" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_image_slider_order_idx" ON "pages_blocks_image_slider" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_image_slider_parent_id_idx" ON "pages_blocks_image_slider" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_image_slider_path_idx" ON "pages_blocks_image_slider" ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_stats_stats_order_idx" ON "pages_blocks_stats_stats" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_stats_stats_parent_id_idx" ON "pages_blocks_stats_stats" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_stats_order_idx" ON "pages_blocks_stats" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_stats_path_idx" ON "pages_blocks_stats" ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_tools_tools_order_idx" ON "pages_blocks_tools_tools" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_tools_tools_parent_id_idx" ON "pages_blocks_tools_tools" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_tools_order_idx" ON "pages_blocks_tools" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_tools_parent_id_idx" ON "pages_blocks_tools" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_tools_path_idx" ON "pages_blocks_tools" ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_page_section_order_idx" ON "pages_blocks_page_section" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_page_section_parent_id_idx" ON "pages_blocks_page_section" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_page_section_path_idx" ON "pages_blocks_page_section" ("_path");
CREATE UNIQUE INDEX IF NOT EXISTS "pages_slug_idx" ON "pages" ("slug");
CREATE INDEX IF NOT EXISTS "pages_created_at_idx" ON "pages" ("created_at");
CREATE INDEX IF NOT EXISTS "pages_rels_order_idx" ON "pages_rels" ("order");
CREATE INDEX IF NOT EXISTS "pages_rels_parent_idx" ON "pages_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "pages_rels_path_idx" ON "pages_rels" ("path");
CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" ("filename");
CREATE INDEX IF NOT EXISTS "projects_blocks_image_order_idx" ON "projects_blocks_image" ("_order");
CREATE INDEX IF NOT EXISTS "projects_blocks_image_parent_id_idx" ON "projects_blocks_image" ("_parent_id");
CREATE INDEX IF NOT EXISTS "projects_blocks_image_path_idx" ON "projects_blocks_image" ("_path");
CREATE INDEX IF NOT EXISTS "projects_blocks_text_order_idx" ON "projects_blocks_text" ("_order");
CREATE INDEX IF NOT EXISTS "projects_blocks_text_parent_id_idx" ON "projects_blocks_text" ("_parent_id");
CREATE INDEX IF NOT EXISTS "projects_blocks_text_path_idx" ON "projects_blocks_text" ("_path");
CREATE INDEX IF NOT EXISTS "projects_blocks_show_reel_order_idx" ON "projects_blocks_show_reel" ("_order");
CREATE INDEX IF NOT EXISTS "projects_blocks_show_reel_parent_id_idx" ON "projects_blocks_show_reel" ("_parent_id");
CREATE INDEX IF NOT EXISTS "projects_blocks_show_reel_path_idx" ON "projects_blocks_show_reel" ("_path");
CREATE INDEX IF NOT EXISTS "projects_blocks_projects_order_idx" ON "projects_blocks_projects" ("_order");
CREATE INDEX IF NOT EXISTS "projects_blocks_projects_parent_id_idx" ON "projects_blocks_projects" ("_parent_id");
CREATE INDEX IF NOT EXISTS "projects_blocks_projects_path_idx" ON "projects_blocks_projects" ("_path");
CREATE INDEX IF NOT EXISTS "projects_blocks_blog_posts_order_idx" ON "projects_blocks_blog_posts" ("_order");
CREATE INDEX IF NOT EXISTS "projects_blocks_blog_posts_parent_id_idx" ON "projects_blocks_blog_posts" ("_parent_id");
CREATE INDEX IF NOT EXISTS "projects_blocks_blog_posts_path_idx" ON "projects_blocks_blog_posts" ("_path");
CREATE INDEX IF NOT EXISTS "projects_blocks_inspirations_order_idx" ON "projects_blocks_inspirations" ("_order");
CREATE INDEX IF NOT EXISTS "projects_blocks_inspirations_parent_id_idx" ON "projects_blocks_inspirations" ("_parent_id");
CREATE INDEX IF NOT EXISTS "projects_blocks_inspirations_path_idx" ON "projects_blocks_inspirations" ("_path");
CREATE INDEX IF NOT EXISTS "projects_blocks_craft_order_idx" ON "projects_blocks_craft" ("_order");
CREATE INDEX IF NOT EXISTS "projects_blocks_craft_parent_id_idx" ON "projects_blocks_craft" ("_parent_id");
CREATE INDEX IF NOT EXISTS "projects_blocks_craft_path_idx" ON "projects_blocks_craft" ("_path");
CREATE INDEX IF NOT EXISTS "projects_blocks_image_slider_images_order_idx" ON "projects_blocks_image_slider_images" ("_order");
CREATE INDEX IF NOT EXISTS "projects_blocks_image_slider_images_parent_id_idx" ON "projects_blocks_image_slider_images" ("_parent_id");
CREATE INDEX IF NOT EXISTS "projects_blocks_image_slider_order_idx" ON "projects_blocks_image_slider" ("_order");
CREATE INDEX IF NOT EXISTS "projects_blocks_image_slider_parent_id_idx" ON "projects_blocks_image_slider" ("_parent_id");
CREATE INDEX IF NOT EXISTS "projects_blocks_image_slider_path_idx" ON "projects_blocks_image_slider" ("_path");
CREATE INDEX IF NOT EXISTS "projects_blocks_stats_stats_order_idx" ON "projects_blocks_stats_stats" ("_order");
CREATE INDEX IF NOT EXISTS "projects_blocks_stats_stats_parent_id_idx" ON "projects_blocks_stats_stats" ("_parent_id");
CREATE INDEX IF NOT EXISTS "projects_blocks_stats_order_idx" ON "projects_blocks_stats" ("_order");
CREATE INDEX IF NOT EXISTS "projects_blocks_stats_parent_id_idx" ON "projects_blocks_stats" ("_parent_id");
CREATE INDEX IF NOT EXISTS "projects_blocks_stats_path_idx" ON "projects_blocks_stats" ("_path");
CREATE INDEX IF NOT EXISTS "projects_blocks_tools_tools_order_idx" ON "projects_blocks_tools_tools" ("_order");
CREATE INDEX IF NOT EXISTS "projects_blocks_tools_tools_parent_id_idx" ON "projects_blocks_tools_tools" ("_parent_id");
CREATE INDEX IF NOT EXISTS "projects_blocks_tools_order_idx" ON "projects_blocks_tools" ("_order");
CREATE INDEX IF NOT EXISTS "projects_blocks_tools_parent_id_idx" ON "projects_blocks_tools" ("_parent_id");
CREATE INDEX IF NOT EXISTS "projects_blocks_tools_path_idx" ON "projects_blocks_tools" ("_path");
CREATE INDEX IF NOT EXISTS "projects_blocks_page_section_order_idx" ON "projects_blocks_page_section" ("_order");
CREATE INDEX IF NOT EXISTS "projects_blocks_page_section_parent_id_idx" ON "projects_blocks_page_section" ("_parent_id");
CREATE INDEX IF NOT EXISTS "projects_blocks_page_section_path_idx" ON "projects_blocks_page_section" ("_path");
CREATE UNIQUE INDEX IF NOT EXISTS "projects_slug_idx" ON "projects" ("slug");
CREATE INDEX IF NOT EXISTS "projects_created_at_idx" ON "projects" ("created_at");
CREATE INDEX IF NOT EXISTS "projects_rels_order_idx" ON "projects_rels" ("order");
CREATE INDEX IF NOT EXISTS "projects_rels_parent_idx" ON "projects_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "projects_rels_path_idx" ON "projects_rels" ("path");
CREATE INDEX IF NOT EXISTS "blog_posts_authors_order_idx" ON "blog_posts_authors" ("_order");
CREATE INDEX IF NOT EXISTS "blog_posts_authors_parent_id_idx" ON "blog_posts_authors" ("_parent_id");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_image_order_idx" ON "blog_posts_blocks_image" ("_order");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_image_parent_id_idx" ON "blog_posts_blocks_image" ("_parent_id");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_image_path_idx" ON "blog_posts_blocks_image" ("_path");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_text_order_idx" ON "blog_posts_blocks_text" ("_order");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_text_parent_id_idx" ON "blog_posts_blocks_text" ("_parent_id");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_text_path_idx" ON "blog_posts_blocks_text" ("_path");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_show_reel_order_idx" ON "blog_posts_blocks_show_reel" ("_order");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_show_reel_parent_id_idx" ON "blog_posts_blocks_show_reel" ("_parent_id");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_show_reel_path_idx" ON "blog_posts_blocks_show_reel" ("_path");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_projects_order_idx" ON "blog_posts_blocks_projects" ("_order");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_projects_parent_id_idx" ON "blog_posts_blocks_projects" ("_parent_id");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_projects_path_idx" ON "blog_posts_blocks_projects" ("_path");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_blog_posts_order_idx" ON "blog_posts_blocks_blog_posts" ("_order");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_blog_posts_parent_id_idx" ON "blog_posts_blocks_blog_posts" ("_parent_id");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_blog_posts_path_idx" ON "blog_posts_blocks_blog_posts" ("_path");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_inspirations_order_idx" ON "blog_posts_blocks_inspirations" ("_order");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_inspirations_parent_id_idx" ON "blog_posts_blocks_inspirations" ("_parent_id");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_inspirations_path_idx" ON "blog_posts_blocks_inspirations" ("_path");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_craft_order_idx" ON "blog_posts_blocks_craft" ("_order");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_craft_parent_id_idx" ON "blog_posts_blocks_craft" ("_parent_id");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_craft_path_idx" ON "blog_posts_blocks_craft" ("_path");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_image_slider_images_order_idx" ON "blog_posts_blocks_image_slider_images" ("_order");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_image_slider_images_parent_id_idx" ON "blog_posts_blocks_image_slider_images" ("_parent_id");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_image_slider_order_idx" ON "blog_posts_blocks_image_slider" ("_order");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_image_slider_parent_id_idx" ON "blog_posts_blocks_image_slider" ("_parent_id");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_image_slider_path_idx" ON "blog_posts_blocks_image_slider" ("_path");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_stats_stats_order_idx" ON "blog_posts_blocks_stats_stats" ("_order");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_stats_stats_parent_id_idx" ON "blog_posts_blocks_stats_stats" ("_parent_id");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_stats_order_idx" ON "blog_posts_blocks_stats" ("_order");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_stats_parent_id_idx" ON "blog_posts_blocks_stats" ("_parent_id");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_stats_path_idx" ON "blog_posts_blocks_stats" ("_path");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_tools_tools_order_idx" ON "blog_posts_blocks_tools_tools" ("_order");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_tools_tools_parent_id_idx" ON "blog_posts_blocks_tools_tools" ("_parent_id");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_tools_order_idx" ON "blog_posts_blocks_tools" ("_order");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_tools_parent_id_idx" ON "blog_posts_blocks_tools" ("_parent_id");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_tools_path_idx" ON "blog_posts_blocks_tools" ("_path");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_page_section_order_idx" ON "blog_posts_blocks_page_section" ("_order");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_page_section_parent_id_idx" ON "blog_posts_blocks_page_section" ("_parent_id");
CREATE INDEX IF NOT EXISTS "blog_posts_blocks_page_section_path_idx" ON "blog_posts_blocks_page_section" ("_path");
CREATE UNIQUE INDEX IF NOT EXISTS "blog_posts_slug_idx" ON "blog_posts" ("slug");
CREATE INDEX IF NOT EXISTS "blog_posts_created_at_idx" ON "blog_posts" ("created_at");
CREATE INDEX IF NOT EXISTS "blog_posts_rels_order_idx" ON "blog_posts_rels" ("order");
CREATE INDEX IF NOT EXISTS "blog_posts_rels_parent_idx" ON "blog_posts_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "blog_posts_rels_path_idx" ON "blog_posts_rels" ("path");
CREATE INDEX IF NOT EXISTS "craft_items_tags_order_idx" ON "craft_items_tags" ("_order");
CREATE INDEX IF NOT EXISTS "craft_items_tags_parent_id_idx" ON "craft_items_tags" ("_parent_id");
CREATE UNIQUE INDEX IF NOT EXISTS "craft_items_slug_idx" ON "craft_items" ("slug");
CREATE INDEX IF NOT EXISTS "craft_items_created_at_idx" ON "craft_items" ("created_at");
CREATE INDEX IF NOT EXISTS "craft_items_rels_order_idx" ON "craft_items_rels" ("order");
CREATE INDEX IF NOT EXISTS "craft_items_rels_parent_idx" ON "craft_items_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "craft_items_rels_path_idx" ON "craft_items_rels" ("path");
CREATE INDEX IF NOT EXISTS "inspiration_items_created_at_idx" ON "inspiration_items" ("created_at");
CREATE INDEX IF NOT EXISTS "inspiration_items_rels_order_idx" ON "inspiration_items_rels" ("order");
CREATE INDEX IF NOT EXISTS "inspiration_items_rels_parent_idx" ON "inspiration_items_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "inspiration_items_rels_path_idx" ON "inspiration_items_rels" ("path");
CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" ("key");
CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" ("created_at");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" ("order");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" ("path");
CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" ("created_at");
DO $$ BEGIN
 ALTER TABLE "pages_blocks_image" ADD CONSTRAINT "pages_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_text" ADD CONSTRAINT "pages_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_show_reel" ADD CONSTRAINT "pages_blocks_show_reel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_projects" ADD CONSTRAINT "pages_blocks_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_blog_posts" ADD CONSTRAINT "pages_blocks_blog_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_inspirations" ADD CONSTRAINT "pages_blocks_inspirations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_craft" ADD CONSTRAINT "pages_blocks_craft_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_image_slider_images" ADD CONSTRAINT "pages_blocks_image_slider_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages_blocks_image_slider"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_image_slider" ADD CONSTRAINT "pages_blocks_image_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_stats_stats" ADD CONSTRAINT "pages_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_tools_tools" ADD CONSTRAINT "pages_blocks_tools_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages_blocks_tools"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_tools" ADD CONSTRAINT "pages_blocks_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_page_section" ADD CONSTRAINT "pages_blocks_page_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "projects_blocks_image" ADD CONSTRAINT "projects_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "projects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "projects_blocks_text" ADD CONSTRAINT "projects_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "projects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "projects_blocks_show_reel" ADD CONSTRAINT "projects_blocks_show_reel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "projects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "projects_blocks_projects" ADD CONSTRAINT "projects_blocks_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "projects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "projects_blocks_blog_posts" ADD CONSTRAINT "projects_blocks_blog_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "projects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "projects_blocks_inspirations" ADD CONSTRAINT "projects_blocks_inspirations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "projects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "projects_blocks_craft" ADD CONSTRAINT "projects_blocks_craft_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "projects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "projects_blocks_image_slider_images" ADD CONSTRAINT "projects_blocks_image_slider_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "projects_blocks_image_slider"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "projects_blocks_image_slider" ADD CONSTRAINT "projects_blocks_image_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "projects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "projects_blocks_stats_stats" ADD CONSTRAINT "projects_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "projects_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "projects_blocks_stats" ADD CONSTRAINT "projects_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "projects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "projects_blocks_tools_tools" ADD CONSTRAINT "projects_blocks_tools_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "projects_blocks_tools"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "projects_blocks_tools" ADD CONSTRAINT "projects_blocks_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "projects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "projects_blocks_page_section" ADD CONSTRAINT "projects_blocks_page_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "projects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "projects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "blog_posts_authors" ADD CONSTRAINT "blog_posts_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "blog_posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "blog_posts_blocks_image" ADD CONSTRAINT "blog_posts_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "blog_posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "blog_posts_blocks_text" ADD CONSTRAINT "blog_posts_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "blog_posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "blog_posts_blocks_show_reel" ADD CONSTRAINT "blog_posts_blocks_show_reel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "blog_posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "blog_posts_blocks_projects" ADD CONSTRAINT "blog_posts_blocks_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "blog_posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "blog_posts_blocks_blog_posts" ADD CONSTRAINT "blog_posts_blocks_blog_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "blog_posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "blog_posts_blocks_inspirations" ADD CONSTRAINT "blog_posts_blocks_inspirations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "blog_posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "blog_posts_blocks_craft" ADD CONSTRAINT "blog_posts_blocks_craft_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "blog_posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "blog_posts_blocks_image_slider_images" ADD CONSTRAINT "blog_posts_blocks_image_slider_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "blog_posts_blocks_image_slider"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "blog_posts_blocks_image_slider" ADD CONSTRAINT "blog_posts_blocks_image_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "blog_posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "blog_posts_blocks_stats_stats" ADD CONSTRAINT "blog_posts_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "blog_posts_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "blog_posts_blocks_stats" ADD CONSTRAINT "blog_posts_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "blog_posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "blog_posts_blocks_tools_tools" ADD CONSTRAINT "blog_posts_blocks_tools_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "blog_posts_blocks_tools"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "blog_posts_blocks_tools" ADD CONSTRAINT "blog_posts_blocks_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "blog_posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "blog_posts_blocks_page_section" ADD CONSTRAINT "blog_posts_blocks_page_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "blog_posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "blog_posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "craft_items_tags" ADD CONSTRAINT "craft_items_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "craft_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "craft_items_rels" ADD CONSTRAINT "craft_items_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "craft_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "craft_items_rels" ADD CONSTRAINT "craft_items_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "inspiration_items_rels" ADD CONSTRAINT "inspiration_items_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "inspiration_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "inspiration_items_rels" ADD CONSTRAINT "inspiration_items_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "users";
DROP TABLE "pages_blocks_image";
DROP TABLE "pages_blocks_text";
DROP TABLE "pages_blocks_show_reel";
DROP TABLE "pages_blocks_projects";
DROP TABLE "pages_blocks_blog_posts";
DROP TABLE "pages_blocks_inspirations";
DROP TABLE "pages_blocks_craft";
DROP TABLE "pages_blocks_image_slider_images";
DROP TABLE "pages_blocks_image_slider";
DROP TABLE "pages_blocks_stats_stats";
DROP TABLE "pages_blocks_stats";
DROP TABLE "pages_blocks_tools_tools";
DROP TABLE "pages_blocks_tools";
DROP TABLE "pages_blocks_page_section";
DROP TABLE "pages";
DROP TABLE "pages_rels";
DROP TABLE "media";
DROP TABLE "projects_blocks_image";
DROP TABLE "projects_blocks_text";
DROP TABLE "projects_blocks_show_reel";
DROP TABLE "projects_blocks_projects";
DROP TABLE "projects_blocks_blog_posts";
DROP TABLE "projects_blocks_inspirations";
DROP TABLE "projects_blocks_craft";
DROP TABLE "projects_blocks_image_slider_images";
DROP TABLE "projects_blocks_image_slider";
DROP TABLE "projects_blocks_stats_stats";
DROP TABLE "projects_blocks_stats";
DROP TABLE "projects_blocks_tools_tools";
DROP TABLE "projects_blocks_tools";
DROP TABLE "projects_blocks_page_section";
DROP TABLE "projects";
DROP TABLE "projects_rels";
DROP TABLE "blog_posts_authors";
DROP TABLE "blog_posts_blocks_image";
DROP TABLE "blog_posts_blocks_text";
DROP TABLE "blog_posts_blocks_show_reel";
DROP TABLE "blog_posts_blocks_projects";
DROP TABLE "blog_posts_blocks_blog_posts";
DROP TABLE "blog_posts_blocks_inspirations";
DROP TABLE "blog_posts_blocks_craft";
DROP TABLE "blog_posts_blocks_image_slider_images";
DROP TABLE "blog_posts_blocks_image_slider";
DROP TABLE "blog_posts_blocks_stats_stats";
DROP TABLE "blog_posts_blocks_stats";
DROP TABLE "blog_posts_blocks_tools_tools";
DROP TABLE "blog_posts_blocks_tools";
DROP TABLE "blog_posts_blocks_page_section";
DROP TABLE "blog_posts";
DROP TABLE "blog_posts_rels";
DROP TABLE "craft_items_tags";
DROP TABLE "craft_items";
DROP TABLE "craft_items_rels";
DROP TABLE "inspiration_items";
DROP TABLE "inspiration_items_rels";
DROP TABLE "payload_preferences";
DROP TABLE "payload_preferences_rels";
DROP TABLE "payload_migrations";`);

};
