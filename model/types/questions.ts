import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { questions } from '../schema/questions';

export type QuestionsType = InferSelectModel<typeof questions>;

export type CreateQuestionsType = {
  formId: string;
  questions: Array<{
    type: InferInsertModel<typeof questions>['type'];
    label: InferInsertModel<typeof questions>['label'];
    required: InferInsertModel<typeof questions>['required'];
    options?: string[];
  }>;
};

export type QuestionType = QuestionsType['type'];
