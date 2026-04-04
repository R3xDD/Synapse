"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "./logout";
import { toast } from "sonner";

const Page = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());
  const queryClient = useQueryClient();

  const testAi = useMutation(trpc.testAi.mutationOptions({
    onSuccess: () => {toast.success("AI job executed");}
  }));  
  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess: () => {
        toast.success("Workflow created");
    }
  }));

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      <p>protected server component</p>
      <div>{JSON.stringify(data)}</div>
      <Button disabled={testAi.isPending} onClick={()=> testAi.mutate()}>
        Test AI
      </Button>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        Create workflow
      </Button>
      <LogoutButton />
    </div>
  );
}

export default Page;