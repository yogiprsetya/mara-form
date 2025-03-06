import { db } from '~/config/db';
import { type NextRequest } from 'next/server';
import { handleSuccessResponse } from 'api-lib/handle-success-res';
import { handleDataNotFound } from 'api-lib/handle-error-res';
import { eq } from 'drizzle-orm';
import { forms } from '~/model/schema/forms';

type Params = {
  params: { formId: string };
};

export const GET = async (_req: NextRequest, { params }: Params) => {
  const { formId } = params;

  const result = await db.query.forms.findFirst({
    where: eq(forms.id, formId),
    with: {
      questions: {
        columns: {
          formId: false
        }
      }
    },
    columns: {
      id: false,
      userId: false
    }
  });

  if (!result) return handleDataNotFound();

  return handleSuccessResponse(result);
};
