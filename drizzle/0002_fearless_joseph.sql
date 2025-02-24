ALTER TABLE "questions" DROP CONSTRAINT "questions_form_id_forms_id_fk";
--> statement-breakpoint
ALTER TABLE "responses" DROP CONSTRAINT "responses_form_id_forms_id_fk";
--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'questions'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "questions" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "questions" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_id_forms_id_fk" FOREIGN KEY ("id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "responses" ADD CONSTRAINT "responses_id_forms_id_fk" FOREIGN KEY ("id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "questions" DROP COLUMN "form_id";--> statement-breakpoint
ALTER TABLE "responses" DROP COLUMN "form_id";