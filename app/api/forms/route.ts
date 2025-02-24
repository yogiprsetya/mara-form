import { requireUserAuth } from 'api-lib/protect-route';
import { db } from '~/config/db';
import { forms } from '~/model/schema/forms';
import { bodyParse } from 'api-lib/body-parse';
import { NextRequest } from 'next/server';
import { handleExpiredSession, handleInvalidRequest } from 'api-lib/handle-error-res';
import { createInsertSchema } from 'drizzle-zod';
import { handleSuccessResponse } from 'api-lib/handle-success-res';
import { and, ilike, asc, desc } from 'drizzle-orm';
import { createMeta } from 'api-lib/create-meta';

const LIMIT = 10;

const createReqSchema = createInsertSchema(forms).omit({ userId: true });

export const POST = async (req: NextRequest) => {
  const body = await bodyParse(req);
  const { data, success, error } = createReqSchema.safeParse(body);

  if (!success) {
    return handleInvalidRequest(error);
  }

  return requireUserAuth(req, async (session) => {
    if (session) {
      const result = await db
        .insert(forms)
        .values({
          title: data.title,
          description: data.description,
          userId: session.id
        })
        .returning();

      return handleSuccessResponse(result[0]);
    }

    return handleExpiredSession();
  });
};

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;

  const params = {
    sort: searchParams.get('sort'),
    limit: searchParams.get('limit'),
    keyword: searchParams.get('keyword'),
    page: searchParams.get('page')
  };

  const limitRow = Number(params?.limit || LIMIT);
  const searchCodition = params.keyword ? ilike(forms.title, `%${params.keyword}%`) : undefined;
  const offset = params.page ? (Number(params.page) - 1) * limitRow : 0;
  const queryFilter = and(searchCodition);
  const sorted = params.sort || 'asc';

  const sortedWith = sorted === 'asc' ? asc(forms.updatedAt) : desc(forms.updatedAt);

  return requireUserAuth(req, async (session) => {
    if (session) {
      const result = await db
        .select()
        .from(forms)
        .where(queryFilter)
        .limit(limitRow)
        .offset(offset)
        .orderBy(sortedWith);

      const meta = await createMeta({
        table: forms,
        limit: limitRow,
        page: Number(params.page || 1),
        query: queryFilter
      });

      return handleSuccessResponse(result, meta);
    }

    return handleExpiredSession();
  });
};
