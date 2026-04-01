import type { Metadata } from "next";
import "./globals.css";
import CookieConstent from "@/components/cookie-content";

import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: {
    default: "WikiVerse",
    template: "%s | WikiVerse",
  },
  description:
    "WikiVerse — вселенная игровых вики. Исследуй миры, персонажей и истории любимых игр в одном месте.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
  <body>
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-background font-sans antialiased flex flex-col pb-16 md:pb-0">
        {children}
      </div>
    </ThemeProvider>
    <CookieConstent/>
  </body>
</html>

  );
}
