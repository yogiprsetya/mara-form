ALTER TABLE "questions" ALTER COLUMN "required" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "questions" ADD COLUMN "order" integer NOT NULL;