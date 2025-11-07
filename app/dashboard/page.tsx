/* eslint-disable @typescript-eslint/ban-ts-comment */
import EmptyState from "@/components/ui/empty-state";
import {
  deleteProjectById,
  duplicateProjectById,
  editProjectById,
  getAllPlaygroundForUser,
} from "@/features/dashboard/actions";
import AddNewButton from "@/features/dashboard/components/AddNewButton";
import AddRepoButton from "@/features/dashboard/components/AddRepoButton";
import ProjectTable from "@/features/dashboard/components/ProjectTable";
import React from "react";

const Page = async () => {
  const playgrounds = await getAllPlaygroundForUser();

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-start px-4 py-10">
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        <AddNewButton />
        <AddRepoButton />
      </div>
      <div className="mt-10 flex w-full flex-col items-center justify-center">
        {playgrounds && playgrounds.length === 0 ? (
          <EmptyState
            title="No Projects Found"
            description="create a new  Project to get started"
            imageSrc="/empty-state.svg"
          />
        ) : (
          <ProjectTable
            // @ts-expect-error
            projects={playgrounds || []}
            onDeleteProject={deleteProjectById}
            onUpdateProject={editProjectById}
            onDuplicateProject={duplicateProjectById}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
