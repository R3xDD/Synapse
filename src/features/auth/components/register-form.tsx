"use client"
import {zodResolver} from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import{useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {toast} from "sonner";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {Card,
CardHeader,
CardContent,
CardDescription,
CardTitle,
} from "@/components/ui/card";
import {Form,
FormField,
FormControl,
FormItem,
FormLabel,
FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import { authClient } from "@/lib/auth-client";


const registerSchema = z.object({
    email:z.email("Please enter a valid email address"),
    password: z.string().min(1,"Password is required"),
    confirmPassword: z.string().min(1,"Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;


export function RegisterForm(){
    const router = useRouter();
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues:{
            email:"",
            password:"",
            confirmPassword:"",
        },
    });
    const onSubmit = async (values : RegisterFormValues) => {
        await authClient.signUp.email({
            email: values.email,
            password: values.password,
            name:values.email,
            callbackURL:"/",


        },
        {
            onSuccess: ()=>{
                router.push("/");
            },
            onError : (ctx)=>{
                toast.error(ctx.error.message || "Something went wrong");
            }
        }
    )

    }

    const isPending = form.formState.isSubmitting;
    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Get started</CardTitle>
                    <CardDescription>Create an account to continue</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full gap-6">
                            <div className="grid gap-6">
                                <div className="flex flex-col gap-4">
                                    <Button
                                    variant="outline"
                                    type="button"
                                    disabled={isPending}
                                    className={cn("flex items-center justify-center gap-2", isPending && "cursor-not-allowed")}
                                    >
                                        <Image src="/icons/google.svg" alt="Google" width={20} height={20} />
                                        {isPending ? "Signing in..." : "Continue with Github"}
                                    </Button>

                                </div>
                                <div className="flex flex-col gap-4">
                                    <Button
                                    variant="outline"
                                    type="button"
                                    disabled={isPending}
                                    className={cn("flex items-center justify-center gap-2", isPending && "cursor-not-allowed")}
                                    >
                                        <Image src="/icons/google.svg" alt="Google" width={20} height={20} />
                                        {isPending ? "Signing in..." : "Continue with Google"}
                                    </Button>

                                </div>
                                <div className="grid gap-6">
                                    <FormField control={form.control} name="email" render={({field})=>(
                                <FormItem className="grid w-full gap-3">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your email" {...field} /> 
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="password" render={({field})=>(
                                <FormItem className="grid w-full gap-3">
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Enter your password" {...field} /> 
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="confirmPassword" render={({field})=>(
                                <FormItem className="grid w-full gap-3">
                                    <FormLabel>Confirm password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Confirm your password" {...field} /> 
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                             <Button type="submit" disabled={isPending}>
                                {isPending ? "Creating account..." : "Create account"}
                            </Button>

                                </div>
                                <div className="text-center text-sm">
                                    Already have an account?{" "}
                                    <Link href="/login" className="underline underline-offset-4 font-medium">
                                        Login
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}