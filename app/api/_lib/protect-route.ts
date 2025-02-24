import { NextRequest, NextResponse } from 'next/server';
import { getToken, type JWT } from 'next-auth/jwt';

type AuthController = (s: JWT | null) => Promise<NextResponse>;

export const requireUserAuth = async (request: NextRequest, controller: AuthController) => {
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return controller(session);
};
