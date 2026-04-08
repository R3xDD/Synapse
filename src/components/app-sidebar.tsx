"use client";

import {
    CreditCardIcon,
    FolderOpen,
    HistoryIcon,
    KeyIcon,
    LogOutIcon,
    StarIcon,
} from "lucide-react";
import Link from "next/link";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Sign } from "crypto";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useHasActiveSubscription } from "@/features/subscriptions/use-subscription";
const menuItems = [
    {
        title: "Home",
        items: [
            {
                label: "workflows",
                icon: <FolderOpen size={18} />,
                href: "/workflows",
            },
            {
                label: "credentials",
                icon: <KeyIcon size={18} />,
                href: "/credentials",
            },
            {
                label: "executions",
                icon: <HistoryIcon size={18} />,
                href: "/executions",
            },
        ],
    },
];

export const AppSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const {hasActiveSubscription, isLoading} = useHasActiveSubscription();
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        tooltip="Home"
                        isActive={pathname === "/dashboard"}
                        asChild
                        className="gap-x-4 h-10 px-4"
                    >
                        <Link href="/workflows" prefetch className="flex items-center gap-x-4">
                            
                            <Image src="/logos/logo.svg" alt="Logo" width={30} height={30} />
                            <span className="font-medium text-sm">Synapse</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarHeader>

            <SidebarContent>

                {menuItems.map((group, index) => (
                    <SidebarGroup key={`${group.title}-${index}`}>
                        <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => (
                                <SidebarMenuItem key={item.label}>
                                    <SidebarMenuButton
                                        tooltip={item.label}
                                        isActive={
                                            item.href === "/"
                                                ? pathname === "/"
                                                : pathname?.startsWith(item.href)
                                        }
                                        asChild
                                        className="gap-x-4 h-10 px-4"
                                    >
                                        <Link href={item.href} prefetch className="flex items-center gap-x-4">
                                            {item.icon}
                                            <span className="font-medium">{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                            </SidebarMenu>
                            
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                    {!hasActiveSubscription && !isLoading && (
                        <SidebarMenuButton
                            tooltip="Upgrade To Pro"
                            onClick={() => {
                                toast("Upgraded to Pro");
                                authClient.checkout({slug:"pro"})
                            }
                            }
                            className="gap-x-4 h-10 px-4"
                        >
                            <StarIcon size={18} />
                            <span className="font-medium">Upgrade To Pro</span>
                        </SidebarMenuButton>
                    )}
                    
                        
                        <SidebarMenuButton
                            tooltip="Billing Portal"
                            onClick={() => authClient.customer.portal()}
                            className="gap-x-4 h-10 px-4"
                        >
                            <CreditCardIcon size={18} />
                            <span className="font-medium">Billing Portal</span>
                        </SidebarMenuButton>
                        <SidebarMenuButton
                            tooltip="Sign Out"
                            onClick={() => authClient.signOut({
                                fetchOptions: {
                                    onSuccess: () => {  
                                        toast("Signed out successfully");
                                        router.push("/login");
                                    }
                                },
                            })}
                            className="gap-x-4 h-10 px-4"
                        >
                            <LogOutIcon size={18} />
                            <span className="font-medium">Sign Out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
};