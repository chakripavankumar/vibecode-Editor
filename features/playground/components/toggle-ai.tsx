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
  Power,
} from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import { ToggleAIProps } from "../types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

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
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            <Bot className="text-foreground h-4 w-4" />
            <span className="text-sm font-medium">AI Assistant</span>
          </div>
          <Badge
            variant="outline"
            className={cn(
              "text-xs",
              isEnabled
                ? "txet-zinc-50 border-zinc-800 bg-zinc-900 hover:bg-zinc-800 dark:border-zinc-200 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                : "bg-background hover:bg-accent text-foreground border-border",
            )}
          >
            {" "}
            {isEnabled ? "Active" : "Inactive"}
          </Badge>
        </DropdownMenuLabel>

        {suggestionLoading && activeFeature && (
          <div className="px-3 pb-3">
            <div className="space-y-2">
              <div className="text-muted-foreground flex items-center justify-between text-xs">
                <span>{activeFeature}</span>
                <span>{Math.round(loadingProgess)}%</span>
              </div>
              <Progress value={loadingProgess} className="h-1.5" />
            </div>
          </div>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => onToggle(!isEnabled)}
          className="cursor-pointer py-2.5"
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-3">
              {isEnabled ? (
                <Power className="text-muted-foreground size-4" />
              ) : (
                <PowerOff className="text-muted-foreground size-4" />
              )}
              <div>
                <div className="text-sm font-medium">
                  {isEnabled ? "Disable" : "Enable"} AI
                </div>
                <div className="text-muted-foreground text-sm">
                  Toggle AI Assistance
                </div>
              </div>
            </div>
            <div
              className={cn(
                "relative h-4 w-8 rounded-full border transition-all duration-200",
                isEnabled
                  ? "border-zinc-900 bg-zinc-900 dark:border-zinc-50 dark:bg-zinc-50"
                  : "bg-muted border-border",
              )}
            >
              <div
                className={cn(
                  "bg-background absolute top-0.5 h-3 w-3 rounded-full transition-all duration-200",
                  isEnabled ? "left-4" : "left-0.5",
                )}
              />
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {}} className="cursor-pointer py-2.5">
          <div className="flex w-full items-center gap-3">
            <FileText className="text-muted-foreground size-4" />
            <div>
              <div className="text-xs font-medium"> Open Chat</div>
              <div className="text-muted-foreground text-xs">
                Chat with AI Assistant
              </div>
            </div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ToggleAI;
