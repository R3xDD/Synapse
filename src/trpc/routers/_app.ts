import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { inngest } from '@/inngest/client';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export const appRouter = createTRPCRouter({
  testAi:baseProcedure.mutation( async () => {
  await inngest.send({
    name: "execute/ai",
    // data: { test: "data" }, 
    });
    return { success: true , message: "job queued"};
  }),

    







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
    return { success: true , message: "Workflow created successfully"};
  }),
});

export type AppRouter = typeof appRouter;