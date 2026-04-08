import { initTRPC, TRPCError } from '@trpc/server';
import { auth } from '@/lib/auth';
import { polarClient } from '@/lib/polar';

export const createTRPCContext = async (req: Request) => {
  return { headers: req.headers };
};

const t = initTRPC.context<typeof createTRPCContext>().create();

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  const session = await auth.api.getSession({
    headers: ctx.headers,
  });

  if (!session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource',
    });
  }

  return next({
    ctx: {
      ...ctx,
      auth: session,
    },
  });
});


export const premiumProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  const { auth } = ctx;
  const customer = await polarClient.customers.getStateExternal({
    externalId:ctx.auth.user.id,
  });

  if (!customer || !customer.activeSubscriptions || customer.activeSubscriptions.length === 0) { 
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'You must have an active subscription to access this resource',
    });
  } 

  return next({
    ctx: {
      ...ctx,

      customer,
    },
  });
} );
