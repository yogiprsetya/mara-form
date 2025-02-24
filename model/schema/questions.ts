import { pgTable, serial, text, integer, jsonb } from 'drizzle-orm/pg-core';
import { forms } from './forms';

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
