import { db } from '~/config/db';
import { type NextRequest } from 'next/server';
import { handleSuccessResponse } from 'api-lib/handle-success-res';
import { handleDataNotFound, handleExpiredSession } from 'api-lib/handle-error-res';
import { and, eq } from 'drizzle-orm';
import { forms } from '~/model/schema/forms';
import { requireUserAuth } from 'api-lib/protect-route';

type Params = {
  params: { formId: string };
};

export const GET = async (req: NextRequest, { params }: Params) => {
  const { formId } = params;

  return requireUserAuth(req, async (session) => {
    if (session) {
      const result = await db.query.forms.findFirst({
        where: and(eq(forms.id, formId), eq(forms.userId, session.id)),
        with: {
          responses: true
        }
      });

      if (!result) return handleDataNotFound();

      return handleSuccessResponse(result);
    }

    return handleExpiredSession();
  });
};
