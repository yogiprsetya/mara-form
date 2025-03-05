import { requireUserAuth } from 'api-lib/protect-route';
import { db } from '~/config/db';
import { questions } from '~/model/schema/questions';
import { bodyParse } from 'api-lib/body-parse';
import { NextRequest } from 'next/server';
import { handleExpiredSession, handleInvalidRequest } from 'api-lib/handle-error-res';
import { createInsertSchema } from 'drizzle-zod';
import { handleSuccessResponse } from 'api-lib/handle-success-res';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

const createReqSchema = z.object({
  ...createInsertSchema(questions).pick({ formId: true }).shape,
  questions: createInsertSchema(questions).omit({ formId: true, id: true }).array()
});

export const POST = async (req: NextRequest) => {
  const body = await bodyParse(req);
  const { data, success, error } = createReqSchema.safeParse(body);

  if (!success) {
    return handleInvalidRequest(error);
  }

  return requireUserAuth(req, async (session) => {
    if (session) {
      await db.delete(questions).where(eq(questions.formId, data.formId));

      const values = data.questions.map((q) => ({ ...q, formId: data.formId }));

      const result = await db.insert(questions).values(values).returning();

      return handleSuccessResponse(result);
    }

    return handleExpiredSession();
  });
};
