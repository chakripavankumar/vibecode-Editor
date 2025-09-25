import {
  readTemplateStructureFromJson,
  saveTemplateStructureToJson,
} from "@/features/playground/lib/path-to-json";
import { templatePaths } from "@/lib/template";
import { db } from "@/lib/db";
import path from "path";
import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    if (!id) {
        return Response.json({ error: "Missing id parameter" }, { status: 400 });
    }
}
