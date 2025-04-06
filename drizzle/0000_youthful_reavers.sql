CREATE TABLE "comments" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "comments_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"content" varchar(255),
	"postId" integer NOT NULL,
	"updatedAt" timestamp (3),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "posts_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"slug" uuid DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"content" varchar(255) NOT NULL,
	"updatedAt" timestamp (3),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp,
	CONSTRAINT "posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_postId_posts_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;