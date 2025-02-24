ALTER TABLE "forms" DROP CONSTRAINT "forms_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "responses" DROP CONSTRAINT "responses_user_id_user_id_fk";
--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'forms'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "forms" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "forms" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'responses'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "responses" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "responses" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "responses" ALTER COLUMN "id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "forms" ADD CONSTRAINT "forms_id_user_id_fk" FOREIGN KEY ("id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "responses" ADD CONSTRAINT "responses_id_user_id_fk" FOREIGN KEY ("id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "forms" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "responses" DROP COLUMN "user_id";