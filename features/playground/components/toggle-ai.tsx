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
  suggestionLading,
  loadingProgess = 0,
  activeFeature,
}: ToggleAIProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={"sm"}
          variant={isEnabled ? "default" : "outline"}
        ></Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};

export default ToggleAI;
