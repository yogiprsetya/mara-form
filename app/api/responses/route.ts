import { requireUserAuth } from 'api-lib/protect-route';
import { db } from '~/config/db';
import { responses } from '~/model/schema/responses';
import { bodyParse } from 'api-lib/body-parse';
import { NextRequest } from 'next/server';
import { handleExpiredSession, handleInvalidRequest } from 'api-lib/handle-error-res';
import { createInsertSchema } from 'drizzle-zod';
import { handleSuccessResponse } from 'api-lib/handle-success-res';

const createReqSchema = createInsertSchema(responses).array();

export const POST = async (req: NextRequest) => {
  const body = await bodyParse(req);
  const { data, success, error } = createReqSchema.safeParse(body);

  if (!success) {
    return handleInvalidRequest(error);
  }

  return requireUserAuth(req, async (session) => {
    if (session) {
      const result = await db.insert(responses).values(data).returning();

      return handleSuccessResponse(result[0]);
    }

    return handleExpiredSession();
  });
};
