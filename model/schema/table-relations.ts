import { relations } from 'drizzle-orm';
import { questions } from './questions';
import { forms } from './forms';
import { responses } from './responses';

export const questionsRelations = relations(questions, ({ one }) => ({
  form: one(forms, { fields: [questions.formId], references: [forms.id] })
}));

export const formsRelations = relations(forms, ({ many }) => ({
  questions: many(questions),
  responses: many(responses)
}));

export const responsesRelations = relations(responses, ({ one }) => ({
  form: one(forms, { fields: [responses.formId], references: [forms.id] })
}));
