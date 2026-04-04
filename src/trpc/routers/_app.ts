import { createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { inngest } from '@/inngest/client';

export const appRouter = createTRPCRouter({
    getWorkflows: protectedProcedure.query(async ({ ctx }) => {
  console.log("PRISMA:", prisma);
  console.log("CTX:", ctx.auth.user.id);
  return prisma.workflow.findMany({
    where: {
      userId: ctx.auth.user.id,
    },
  });
}),
//   getWorkflows: protectedProcedure.query(async ({ ctx }) => {
//     return prisma.workflow.findMany({
//       where: {
//         userId: ctx.auth.user.id,
//       },
//     });
//   }),

  createWorkflow: protectedProcedure.mutation(async ({ ctx }) => {
    await inngest.send({
      name: "app/task.created",
      data: { email: ctx.auth.user.email },
    });
    return prisma.workflow.create({
      data: {
        name: "test-workflow",
        userId: ctx.auth.user.id,
      },
    });
  }),
});

export type AppRouter = typeof appRouter;