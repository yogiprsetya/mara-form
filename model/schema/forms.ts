import { pgTable, serial, text, integer, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './users';

export const forms = pgTable('forms', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const questions = pgTable('questions', {
  id: serial('id').primaryKey(),
  formId: integer('form_id')
    .notNull()
    .references(() => forms.id, { onDelete: 'cascade' }),
  type: text('type', { enum: ['text', 'number', 'radio', 'checklist'] }).notNull(),
  label: text('label').notNull(),
  required: integer('required').default(0).notNull(), // 0 = false, 1 = true
  options: jsonb('options') // Only applicable for multiple-choice
});

export const responses = pgTable('responses', {
  id: serial('id').primaryKey(),
  formId: integer('form_id')
    .notNull()
    .references(() => forms.id, { onDelete: 'cascade' }),
  userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
  answers: jsonb('answers').notNull(), // Store responses as JSON
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export const formsRelations = relations(forms, ({ many }) => ({
  questions: many(questions),
  responses: many(responses)
}));

export const questionsRelations = relations(questions, ({ one }) => ({
  form: one(forms, { fields: [questions.formId], references: [forms.id] })
}));

export const responsesRelations = relations(responses, ({ one }) => ({
  form: one(forms, { fields: [responses.formId], references: [forms.id] })
}));
