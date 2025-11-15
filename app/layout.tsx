"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "../store/StoreProvider";
import { Toaster } from "@/components/ui/sonner";
import RouteTransitionWrapper from "@/components/RouteTransitionWrapper";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body className={inter.className}>
        <MantineProvider>
          <StoreProvider>
            <RouteTransitionWrapper>
              {children}
              <Toaster />
            </RouteTransitionWrapper>
          </StoreProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
