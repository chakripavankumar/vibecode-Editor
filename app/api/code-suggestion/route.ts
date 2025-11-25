import { analyzeCodeContext } from "@/features/ai/functions/analyzeCodeContext";
import { generateSuggestion } from "@/features/ai/functions/generateSuggestion";
import { CodeSuggestionRequest } from "@/features/ai/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body: CodeSuggestionRequest = await request.json();

    const { fileContent, cursorColumn, cursorLine, suggestionType, fileName } =
      body;

    if (!fileContent || cursorLine < 0 || cursorColumn < 0 || suggestionType) {
      return NextResponse.json(
        { error: "Invalid input parmaters" },
        { status: 400 },
      );
    }
    const context = analyzeCodeContext(
      fileContent,
      cursorLine,
      cursorColumn,
      fileName,
    );

    const prompt = buildPrompt(context, suggestionType);

    const suggestion = await generateSuggestion(prompt);

    return NextResponse.json({
      suggestion,
      context,
      metadata: {
        language: context.framework,
        position: context.cursorPosition,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("context analysis error:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error },
      { status: 500 },
    );
  }
}
