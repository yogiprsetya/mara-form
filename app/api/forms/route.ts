import { requireUserAuth } from 'api-lib/protect-route';
import { db } from '~/config/db';
import { forms } from '~/model/schema/forms';
import { bodyParse } from 'api-lib/body-parse';
import { NextRequest } from 'next/server';
import { handleExpiredSession, handleInvalidRequest } from 'api-lib/handle-error-res';
import { createInsertSchema } from 'drizzle-zod';
import { handleSuccessResponse } from 'api-lib/handle-success-res';

const createReqSchema = createInsertSchema(forms).omit({ userId: true });

export const POST = async (req: NextRequest) => {
  const body = await bodyParse(req);
  const { data, success, error } = createReqSchema.safeParse(body);

  if (!success) {
    return handleInvalidRequest(error);
  }

  return requireUserAuth(req, async (session) => {
    if (session) {
      console.log(session);

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
