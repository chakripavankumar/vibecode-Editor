"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bot,
  Code,
  FileText,
  Import,
  Loader2,
  PowerOff,
  Braces,
  Variable,
} from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import { ToggleAIProps } from "../types";
import { Button } from "@/components/ui/button";

const ToggleAI = ({
  isEnabled,
  onToggle,
  suggestionLoading,
  loadingProgess = 0,
  activeFeature,
}: ToggleAIProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={"sm"}
          variant={isEnabled ? "default" : "outline"}
          className={cn(
            "relative h-8 gap-2 px-3 text-sm font-medium transition-all duration-200",
            isEnabled
              ? "txet-zinc-50 border-zinc-800 bg-zinc-900 hover:bg-zinc-800 dark:border-zinc-200 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
              : "bg-background hover:bg-accent text-foreground border-border",
            suggestionLoading && "opacity-75",
          )}
          onClick={(e) => e.preventDefault()}
        >
          {" "}
          {suggestionLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Bot className="h-4 w-4" />
          )}
          <span>AI</span>
          {isEnabled ? (
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
          ) : (
            <div className="h-2 w-2 animate-spin rounded-full bg-red-500"></div>
          )}
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};

export default ToggleAI;
