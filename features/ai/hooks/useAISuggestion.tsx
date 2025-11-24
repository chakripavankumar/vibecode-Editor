import { useState, useCallback } from "react";
import { AISuggestionState, UseAISuggestionReturn } from "../types";

export const useAISuggestions = (): UseAISuggestionReturn => {
  const [state, setState] = useState<AISuggestionState>({
    suggestion: null,
    isEnabled: true,
    isLoading: false,
    position: null,
    decoration: [],
  });

  const toggleEnabled = useCallback(() => {
    console.log("Toggling AI suggestions");
    setState((prev) => ({ ...prev, isEnabled: !prev.isEnabled }));
  }, []);

  const fetchSuggestion = useCallback(async (type: string, editor: any) => {
    console.log("Fetching AI suggestion...");
    console.log("AI Suggestions Enabled:", state.isEnabled);
    console.log("Editor Instance Available:", !!editor);
    setState((currentState) => {
      if (!currentState.isEnabled) {
        console.warn("AI suggestions are disabled.");
        return currentState;
      }

      if (!editor) {
        console.warn("Editor instance is not available.");
        return currentState;
      }

      const model = editor.getModel();
      const cursorPosition = editor.getPosition();

      if (!model || !cursorPosition) {
        console.warn("Editor model or cursor position is not available.");
        return currentState;
      }
      const newState = { ...currentState, isLoading: true };
      (async () => {
        try {
          const payload = {
            fileContent: model.getValue(),
            cursorLine: cursorPosition.lineNumber - 1,
            cursorColumn: cursorPosition.column - 1,
            suggestionType: type,
          };
          console.log("Request payload:", payload);

          const response = await fetch("/api/code-suggestion", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
          }

          const data = await response.json();
          console.log("API response:", data);

          if (data.suggestion) {
            const suggestionText = data.suggestion.trim();
            setState((prev) => ({
              ...prev,
              suggestion: suggestionText,
              position: {
                line: cursorPosition.lineNumber,
                column: cursorPosition.column,
              },
              isLoading: false,
            }));
          } else {
            console.warn("No suggestion received from API.");
            setState((prev) => ({ ...prev, isLoading: false }));
          }
        } catch (error) {
          console.error("Error fetching code suggestion:", error);
          setState((prev) => ({ ...prev, isLoading: false }));
        }
      })();

      return newState;
    });
  }, []);
};
