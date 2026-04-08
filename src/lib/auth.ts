import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db";
import {checkout , polar,portal} from "@polar-sh/better-auth";
import { polarClient } from "./polar";
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  trustedOrigins: ["http://localhost:3000"],
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use:[
        checkout({
          products:[{
            productId:"98ea7256-3046-4a1f-a524-d8dc3c90e536",
            slug:"pro",
          }
          ],
          successUrl: process.env.POLAR_SUCCESS_URL || "http://localhost:3000",
          authenticatedUsersOnly: true,

        }),
        portal()
      ]
    }),
  ],
});