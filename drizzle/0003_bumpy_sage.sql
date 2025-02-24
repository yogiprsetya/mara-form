ALTER TABLE "forms" DROP CONSTRAINT "forms_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "questions" DROP CONSTRAINT "questions_id_forms_id_fk";
--> statement-breakpoint
ALTER TABLE "responses" DROP CONSTRAINT "responses_id_forms_id_fk";
--> statement-breakpoint
ALTER TABLE "responses" DROP CONSTRAINT "responses_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "forms" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "forms" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "questions" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "questions" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "responses" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "responses" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "responses" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "forms" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "questions" ADD COLUMN "form_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "responses" ADD COLUMN "form_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "responses" ADD COLUMN "user_id" text;--> statement-breakpoint
ALTER TABLE "forms" ADD CONSTRAINT "forms_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "responses" ADD CONSTRAINT "responses_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "responses" ADD CONSTRAINT "responses_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;