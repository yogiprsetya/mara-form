import { questions } from '~/model/schema/questions';
import { type InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { forms } from '../schema/forms';

export type FormsType = InferSelectModel<typeof forms>;

export type CreateFormsType = Omit<InferInsertModel<typeof forms>, 'userId'>;

export type FormWithQuestionsType = FormsType & {
  questions: InferSelectModel<typeof questions>[];
};
