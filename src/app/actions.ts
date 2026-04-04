"use server";
import { inngest } from "@/inngest/client";

export async function createTask(id: string) {
  await inngest.send({
    name: "app/task.created",
    data: { id },
  });
}