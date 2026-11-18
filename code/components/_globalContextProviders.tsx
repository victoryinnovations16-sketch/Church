import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeModeProvider } from "../helpers/themeMode";
import { TooltipProvider } from "./Tooltip";
import { Toaster } from "./Toaster";
import { ScrollToHashElement } from "./ScrollToHashElement";
import { queryClient } from "../helpers/queryClient";

export const GlobalContextProviders = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeModeProvider>
        <ScrollToHashElement />
        <TooltipProvider>
          {children}
          {/* Renders every toast(...) from helpers/toast. Mounted once, here. */}
          <Toaster />
        </TooltipProvider>
      </ThemeModeProvider>
    </QueryClientProvider>
  );
}
