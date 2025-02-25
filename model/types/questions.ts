import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { questions } from '../schema/questions';

export type QuestionsType = InferSelectModel<typeof questions>;

export type CreateQuestionsType = InferInsertModel<typeof questions>;
