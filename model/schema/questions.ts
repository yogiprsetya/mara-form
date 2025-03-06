import { pgTable, serial, text, jsonb, boolean, integer } from 'drizzle-orm/pg-core';
import { forms } from './forms';

export const questions = pgTable('questions', {
  id: serial('id').primaryKey(),
  formId: text('form_id')
    .notNull()
    .references(() => forms.id, { onDelete: 'cascade' }),
  type: text('type', { enum: ['text', 'number', 'radio', 'checkbox'] }).notNull(),
  label: text('label').notNull(),
  required: boolean('required').notNull(),
  order: integer('order').notNull(),
  options: jsonb('options')
});
