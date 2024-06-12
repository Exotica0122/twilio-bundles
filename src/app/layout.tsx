import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import NextTopLoader from "nextjs-toploader";
import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/components/theme-provider";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/mode-toggle";
import { NavBar } from "@/components/navigation/navbar";
import { MobileNavbar } from "@/components/navigation/mobile-navbar";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Twilio Bundles",
  description: "Admin Panel for Twilio Bundles",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <NextTopLoader showSpinner={false} />
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr]">
              <NavBar />
              <div className="relative flex h-screen flex-col">
                <header className="flex h-14 max-h-60 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                  <MobileNavbar />
                  <div className="w-full flex-1">
                    <form>
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search..."
                          className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                        />
                      </div>
                    </form>
                  </div>
                  <ModeToggle />
                </header>
                <div className="h-full overflow-auto">
                  <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    {children}
                    <Toaster />
                  </main>
                </div>
              </div>
            </div>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
