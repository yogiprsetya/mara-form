import { pgTable, serial, text, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { forms } from './forms';
import { users } from './users';

export const responses = pgTable('responses', {
  id: serial('id').primaryKey(),
  formId: text('form_id')
    .notNull()
    .references(() => forms.id, { onDelete: 'cascade' }),
  userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
  answers: jsonb('answers').notNull(), // Store responses as JSON
  createdAt: timestamp('created_at').defaultNow().notNull()
});
