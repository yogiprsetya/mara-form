import type { InferSelectModel } from 'drizzle-orm';
import { questions } from '../schema/questions';
import { FormsType } from './forms';

export type QuestionsType = InferSelectModel<typeof questions>;

type Questions = Array<{
  id: QuestionsType['type'];
  type: QuestionsType['type'];
  label: QuestionsType['label'];
  required: QuestionsType['required'];
  order: QuestionsType['order'];
  options?: string[];
}>;

export type CreateQuestionsType = {
  formId: string;
  questions: Questions;
};

export type QuestionType = QuestionsType['type'];

export type QuestionForms = Omit<FormsType, 'id' | 'userId'> & {
  questions: Questions;
};
