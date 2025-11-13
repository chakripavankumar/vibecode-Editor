"use client";
import React, { useEffect, useState, useRef } from "react";
import { transformToWebContainerFormat } from "../hooks/transformer";
import { Progress } from "@/components/ui/progress";
import { WebContainerPreviewProps } from "../types";
import { CheckCircle, Loader2, XCircle } from "lucide-react";

const WebContainerPreview = ({
  templateDate,
  error,
  instance,
  isLoading,
  serverUrl,
  writeFileSync,
  forceResetup = false,
}: WebContainerPreviewProps) => {
  const [previewurl, setPreviewurl] = useState<string>("");
  const [loadingState, setLoadingState] = useState({
    transforming: false,
    mounting: false,
    installing: false,
    starting: false,
    ready: false,
  });
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 4;
  const [setupError, setSetupError] = useState<string | null>(null);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [isSetupInProgress, setIsSetupInProgress] = useState(false);

  useEffect(() => {
    if (forceResetup) {
      setIsSetupComplete(false);
      setIsSetupInProgress(false);
      setPreviewurl("");
      setCurrentStep(0);
      setLoadingState({
        transforming: false,
        mounting: false,
        installing: false,
        starting: false,
        ready: false,
      });
    }
  }, [forceResetup]);

  useEffect(() => {
    async function setupConatianer() {
      if (!instance || isSetupComplete || isSetupInProgress) return;

      try {
        setIsSetupInProgress(true);
        setSetupError(null);
        try {
          const packageJsonExists = await instance.fs.readFile(
            "package.json",
            "utf-8",
          );

          if (packageJsonExists) {
            // impletement here tertminal rlats stuff
          }
          instance.on("server-ready", (port: number, url: string) => {
            console.log(`Reconnected to server on port ${port} at ${url}`);
            // terminal
            setPreviewurl(url);
            setLoadingState((prev) => ({
              ...prev,
              starting: false,
              ready: true,
            }));
            setIsSetupComplete(true);
            setIsSetupInProgress(false);
          });
          setCurrentStep(4);
          setLoadingState((prev) => ({ ...prev, starting: true }));
          return;
        } catch (error) {}
        // 1: transform data

        setLoadingState((prev) => ({ ...prev, transforming: true }));
        setCurrentStep(1);
        //terminal

        //@ts-ignore
        const files = transformToWebContainerFormat(templateDate);

        setLoadingState((prev) => ({
          ...prev,
          transforming: false,
          mounting: true,
          installing: true,
        }));

        setCurrentStep(3);
        const installProcess = await instance.spawn("npm", ["install"]);

        installProcess.output.pipeTo(
          new WritableStream({
            write(data) {
              // write directly to terminal
            },
          }),
        );
        const installExitCode = await installProcess.exit;
        if (installExitCode !== 0) {
          throw new Error(
            `Failed to install dependencies. Exit code ${installExitCode}`,
          );
        }
        setLoadingState((prev) => ({
          ...prev,
          installing: false,
          starting: true,
        }));

        setCurrentStep(4);

        const startProcess = await instance.spawn("npm", ["run", "start"]);

        //listen for server ready event
        instance.on("server-ready", (port: number, url: string) => {
          console.log(`Server ready on port ${port} at ${url}`);

          setPreviewurl(url);
          setLoadingState((prev) => ({
            ...prev,
            starting: false,
            ready: true,
          }));
          setIsSetupComplete(true);
          setIsSetupInProgress(false);
        });
        // Handle start process output - stream to tetminal
        startProcess.output.pipeTo(
          new WritableStream({
            write(data) {},
          }),
        );
      } catch (error) {
        console.error("Error setting up container:", error);
        const errMessage =
          error instanceof Error ? error.message : String(error);

        setSetupError(errMessage);
        setIsSetupInProgress(false);
        setLoadingState({
          transforming: false,
          mounting: false,
          installing: false,
          starting: false,
          ready: false,
        });
      }
    }
    setupConatianer();
  }, [instance, templateDate, isSetupComplete, isSetupInProgress]);

  useEffect(() => {
    return () => {};
  });
  if (isLoading) {
    <div className="flex h-full items-center justify-center">
      <div className="max-w-md space-y-4 rounded-lg bg-gray-50 p-6 text-center dark:bg-gray-900">
        <Loader2 className="text-primary mx-auto h-10 w-10 animate-spin" />
        <h3 className="text-lg font-medium"> Initializing WebContainer</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Setting up Environment for your project
        </p>
      </div>
    </div>;
  }

  if (error || setupError) {
    return (
      <div className="flex h-full items-baseline-last justify-center">
        <div className="max-w-md rounded-lg bg-red-50 p-6 text-red-600 dark:bg-red-900/2 dark:text-red-400">
          <div className="mb-3 flex items-center gap-2">
            <XCircle className="h-5 w-5" />
          </div>
          <p className="text-sm">{error || setupError}</p>
        </div>
      </div>
    );
  }
  const getStepIcon = (setpIndex: number) => {
    if (setpIndex < currentStep) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    } else if (setpIndex === currentStep) {
      return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />;
    } else {
      return (
        <div className="h-5 w-5 rounded-full border-2 border-gray-300"></div>
      );
    }
  };
  const getStepText = (setpIndex: number, label: string) => {
    const isActive = setpIndex === currentStep;
    const isComplete = setpIndex < currentStep;

    return (
      <span
        className={`text-sm font-medium ${isComplete ? "text-green-600" : isActive ? `text-blue-600` : `text-gray-500`}`}
      >
        {" "}
        {label}
      </span>
    );
  };
  return (
    <div className="flex h-full w-full flex-col">
      {!previewurl ? (
        <div className="flex h-full flex-col">
          <div className="m-5 mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-sm dark:bg-zinc-800">
            <h3 className="mb-4 text-lg font-medium">
              Setting up your Environment
            </h3>
            <Progress
              value={(currentStep / totalSteps) * 100}
              className="mb-6 h-2"
            />
            <div className="spce-y-4 mb-6">
              <div className="flex items-center gap-3">
                {getStepIcon(1)}
                {getStepText(1, "Transformign template data")}
              </div>
              <div className="flex items-center gap-3">
                {getStepIcon(2)}
                {getStepText(2, "Mounting files")}
              </div>
              <div className="flex items-center gap-3">
                {getStepIcon(3)}
                {getStepText(3, "Installing dependencies")}
              </div>
              <div className="flex items-center gap-3">
                {getStepIcon(4)}
                {getStepText(4, "Starting development server")}
              </div>
            </div>
          </div>
          <div className="flex-1 p-4">
            <h1> Terminal</h1>
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col">
          <div className="flex-1">
            <iframe
              src={previewurl}
              className="h-full w-full border-none"
              title="WebContainer Preview"
            />
          </div>
          <div className="h-64 border-t">
            <h1> Terminal components</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebContainerPreview;
