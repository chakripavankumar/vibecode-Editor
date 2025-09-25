/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect, useCallback, use } from "react";
import { toast } from "sonner";
import { TemplateFolder } from "../lib/path-to-json";
import { getPlaygroundById } from "../actions";

interface PlaygroundData {
  id: string;
  name?: string;
  [key: string]: unknown;
}

interface UsePlaygroundReturn {
  playgroundData: PlaygroundData | null;
  templateData: TemplateFolder | null;
  isLoading: boolean;
  error: string | null;
  loadPlayground: () => Promise<void>;
  saveTemplateData: (data: TemplateFolder) => Promise<void>;
}

export const usePlayground = (id: string): UsePlaygroundReturn => {
  const [playgroundData, SetPlaygroundData] = useState<PlaygroundData | null>();
  const [templateData, SetTemplateData] = useState<TemplateFolder | null>();
  const [isLoading, SetIsLoading] = useState(true);
  const [error, SetError] = useState<string | null>();

  const loadPlayground = useCallback(async () => {
    if (!id) return;
    try {
      SetIsLoading(true);
      SetError(null);
      const data = await getPlaygroundById(id);
      // @ts-ignore
      SetPlaygroundData(data);
      const rawContent = data?.templateFiles?.[0]?.content;

      if (typeof rawContent === "string") {
        const parseContent = JSON.parse(rawContent);
        SetTemplateData(parseContent);
        toast.success("Playground loaded successfully");
        return;
      }

      const res = await fetch(`/api/template/${id}`);
      if(!res.ok) throw new Error(`Failed to load template: ${res.status}`);
    } catch (error) {
    } finally {
    }
  }, [id]);
};
