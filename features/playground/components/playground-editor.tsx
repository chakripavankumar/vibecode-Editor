"use client";

import React, { useRef, useEffect, useCallback } from "react";
import Editor, { type Monaco } from "@monaco-editor/react";
import { PlaygroundEditorProps } from "../types";
import {
  configureMonaco,
  defaultEditorOptions,
  getEditorLanguage,
} from "../lib/editor-config";

const PlaygroundEditor = ({
  activeFile,
  content,
  onContentChange,
}: PlaygroundEditorProps) => {
  const editorRef = useRef<any>(null);

  const monacoRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    configureMonaco(monaco);
    updateEditorLanguage();
  };

  const updateEditorLanguage = () => {
    if (!activeFile || !monacoRef.current || !editorRef.current) return;
    const model = editorRef.current.getModel();
    if (!model) return;

    const language = getEditorLanguage(activeFile.fileExtension || "");

    try {
      monacoRef.current.editor.setModalLanguage(model, language);
    } catch (error) {
      console.warn("Failed to set Editor luanguage:", error);
    }
  };

  useEffect(() => {
    updateEditorLanguage();
  }, [activeFile]);
  return (
    <div className="h-full relative">
          {/* Todo Ai thiniking */}
          <Editor height={"100%"}
          value={content}
          onChange={(value) => onContentChange(value || "")}
          onMount={handleEditorDidMount}
          language={activeFile ? getEditorLanguage(activeFile.fileExtension || "") : "plaintext"}
          // @ts-ignore
          options={defaultEditorOptions}
          />
        </div>
  )
};

export default PlaygroundEditor;
