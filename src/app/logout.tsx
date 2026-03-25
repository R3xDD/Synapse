"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export  const LogoutButton = () => {
  const router = useRouter();
  return (
    <Button variant="outline"onClick={()=> authClient.signOut()}>

        Logout  
    </Button>
  );
}
