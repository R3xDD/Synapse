import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";




const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});
export const execute = inngest.createFunction(
  { id: "execute", triggers: { event: "execute/ai" } },
  async ({ event, step }) => {
    await step.sleep("pretend","5s")
    const {steps} = await step.ai.wrap(
      "gemini-generate-text",
      generateText , {
        model: google("gemini-2.5-flash"),
        system: "You are a helpful assistant for generating text.",
        prompt:"what is 2 + 2 ?",
        experimental_telemetry:{
          isEnabled:true,
          recordInputs:true,
          recordOutputs: true,
        },
      })
      return steps;

      //if we pay ,we can add openai and anthropic and whatever we want by havin the secret api keys
  }
);