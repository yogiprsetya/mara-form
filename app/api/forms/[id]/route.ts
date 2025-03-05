import { requireUserAuth } from 'api-lib/protect-route';
import { db } from '~/config/db';
import { type NextRequest } from 'next/server';
import { handleSuccessResponse } from 'api-lib/handle-success-res';
import {
  handleDataNotFound,
  handleExpiredSession,
  handleInvalidRequest
} from 'api-lib/handle-error-res';
import { and, eq } from 'drizzle-orm';
import { bodyParse } from '../../_lib/body-parse';
import { createUpdateSchema } from 'drizzle-zod';
import { forms } from '~/model/schema/forms';

enum Prefix {
  QUESTIONS = 'q:',
  RESPONSES = 'r:'
}

type Params = {
  params: { id: `${Prefix.QUESTIONS | Prefix.RESPONSES}${string}` };
};

const createReqSchema = createUpdateSchema(forms);

export const GET = async (req: NextRequest, { params }: Params) => {
  const { id } = params;

  if (!id.startsWith(Prefix.QUESTIONS) && !id.startsWith(Prefix.RESPONSES)) {
    return handleInvalidRequest(
      `Invalid ID format. ID must start with "${Prefix.QUESTIONS}" or "${Prefix.RESPONSES}".`
    );
  }

  const isWithQuestions = id.startsWith(Prefix.QUESTIONS);
  const isWithResponses = id.startsWith(Prefix.RESPONSES);
  const [, formId] = id.split(':');

  return requireUserAuth(req, async (session) => {
    if (session) {
      const result = await db.query.forms.findFirst({
        where: eq(forms.id, formId),
        with: {
          questions: isWithQuestions ? true : undefined,
          responses: isWithResponses ? true : undefined
        }
      });

      if (!result) return handleDataNotFound();

      return handleSuccessResponse(result);
    }

    return handleExpiredSession();
  });
};

export const PUT = async (req: NextRequest, { params }: Params) => {
  const { id } = await params;
  const body = await bodyParse(req);
  const { data, success, error } = createReqSchema.safeParse(body);

  if (!success) {
    return handleInvalidRequest(error);
  }

  return requireUserAuth(req, async (session) => {
    if (session) {
      const result = await db
        .update(forms)
        .set({
          ...data,
          updatedAt: new Date()
        })
        .where(eq(forms.id, id))
        .returning();

      return handleSuccessResponse(result[0]);
    }

    return handleExpiredSession();
  });
};

export const DELETE = async (req: NextRequest, { params }: Params) => {
  const { id } = await params;

  return requireUserAuth(req, async (session) => {
    if (session) {
      const result = await db
        .delete(forms)
        .where(and(eq(forms.id, id), eq(forms.userId, session.id)))
        .returning();

      if (!result.length) return handleDataNotFound();

      return handleSuccessResponse(result[0]);
    }

    return handleExpiredSession();
  });
};
