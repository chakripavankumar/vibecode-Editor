"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import TemplateFileTree from "@/features/playground/components/template-file-tree";
import { useFileExplorer } from "@/features/playground/hooks/useFileExplorer";
import { usePlayground } from "@/features/playground/hooks/usePlayground";
import {
  TemplateFile,
  TemplateFolder,
} from "@/features/playground/types/types";
import { useParams } from "next/navigation";
import React, { useCallback } from "react";

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const { playgroundData, templateData, isLoading, error, saveTemplateData } =
    usePlayground(id);
  const {
    activeFileId,
    closeAllFiles,
    openFile,
    closeFile,
    editorContent,
    updateFileContent,
    handleAddFile,
    handleAddFolder,
    handleDeleteFile,
    handleDeleteFolder,
    handleRenameFile,
    handleRenameFolder,
    openFiles,
    setTemplateData,
    setActiveFileId,
    setPlaygroundId,
    setOpenFiles,
  } = useFileExplorer();

  const wrappedHandleRenameFile = useCallback(
    (
      file: TemplateFile,
      newFileName: string,
      newExtension: string,
      parentPath: string
    ) => {
      return handleRenameFile(
        file,
        newFileName,
        newExtension,
        parentPath,
        saveTemplateData
      );
    },
    [handleRenameFile, saveTemplateData]
  );
  const wrappedHandleRenameFolder = useCallback(
    (folder: TemplateFolder, newFolderName: string, parentPath: string) => {
      return handleRenameFolder(
        folder,
        newFolderName,
        parentPath,
        saveTemplateData
      );
    },
    [handleRenameFolder, saveTemplateData]
  );

  return (
    <div>
      <TooltipProvider>
        <>
          <TemplateFileTree data={templateData!} />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1">
                <Separator orientation="vertical" className="mr-2 h-4">
                  <div className="flex flex-1 items-center gap-2">
                    <div className="flex flex-col flex-1">
                      {playgroundData?.title}
                    </div>
                  </div>
                </Separator>
              </SidebarTrigger>
            </header>
          </SidebarInset>
        </>
      </TooltipProvider>
    </div>
  );
};

export default Page;
