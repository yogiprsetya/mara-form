import { pgTable, serial, text, timestamp, jsonb, integer } from 'drizzle-orm/pg-core';
import { forms } from './forms';
import { questions } from './questions';

export const responses = pgTable('responses', {
  id: serial('id').primaryKey(),
  formId: text('form_id')
    .notNull()
    .references(() => forms.id, { onDelete: 'cascade' }),
  respondentEmail: text('respondent_email').notNull(),
  questionsId: integer('questions_id').references(() => questions.id, { onDelete: 'cascade' }),
  answers: jsonb('answers').notNull(), // Store responses as JSON
  createdAt: timestamp('created_at').defaultNow().notNull()
});
