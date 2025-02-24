import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as users from '~/model/schema/users';
import * as forms from '~/model/schema/forms';
import * as questions from '~/model/schema/questions';
import * as responses from '~/model/schema/responses';
import * as tableRelations from '~/model/schema/table-relations';

const client = postgres(process.env.POSTGRES_URL || '', { prepare: false });

const db = drizzle(client, { schema: { ...users, ...forms, ...questions, ...responses, ...tableRelations } });

export { db };
