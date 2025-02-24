import { type InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { forms } from '../schema/forms';

export type FormsType = InferSelectModel<typeof forms>;

export type CreateFormsType = InferInsertModel<typeof forms>;
