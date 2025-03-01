ALTER TABLE "responses" RENAME COLUMN "user_id" TO "respondent_email";--> statement-breakpoint
ALTER TABLE "responses" DROP CONSTRAINT "responses_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "responses" ADD COLUMN "questions_id" integer;--> statement-breakpoint
ALTER TABLE "responses" ADD CONSTRAINT "responses_questions_id_questions_id_fk" FOREIGN KEY ("questions_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;