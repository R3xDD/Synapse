import Link from "next/link";
import Image from "next/image";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-svh">
            {/* Left branding panel */}
            <div className="hidden lg:flex lg:w-1/2 bg-foreground flex-col items-center justify-center gap-6 p-12">
                <Link href="/" className="flex items-center gap-3">
                    <Image src="/logos/logo.svg" alt="Logo" width={40} height={40} />
                    <span className="text-background text-2xl font-semibold">Synapse</span>
                </Link>
                <p className="text-muted-foreground text-center text-sm max-w-xs  font-semibold leading-relaxed">
                    The open-source workflow automation platform. Build, automate, and scale your workflows.
                </p>
            </div>

            {/* Right form panel */}
            <div className="flex w-full lg:w-1/2 bg-muted flex-col items-center justify-center gap-6 p-6 md:p-12">
                {/* Mobile logo — only shows on small screens */}
                <Link href="/" className="flex lg:hidden items-center gap-2 font-medium">
                    <Image src="/logos/logo.svg" alt="Logo" width={28} height={28} />
                    Synapse
                </Link>
                <div className="w-full max-w-sm">
                    {children}
                </div>
            </div>
        </div>
    );
};