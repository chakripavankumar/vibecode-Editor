import { WebContainer } from "@webcontainer/api";

export interface TemplateFile {
  filename: string;
  fileExtension: string;
  content: string;
}
export interface TemplateFolder {
  folderName: string;
  items: (TemplateFile | TemplateFolder)[];
}
export interface UseWebContainerProps {
  templateData: TemplateFolder;
}
export interface UseWebContainerReturn {
  serverUrl: string | null;
  isLoading: boolean;
  error: string | null;
  instance: WebContainer | null;
  writeFileSync: (path: string, content: string) => Promise<void>;
  destroy: () => void;
}
export interface TemplateItem {
  filename: string;
  fileExtension: string;
  content: string;
  folderName?: string;
  items?: TemplateItem[];
}
export interface WebContainerFile {
  file: {
    contents: string;
  };
}

export interface WebContainerDirectory {
  directory: {
    [key: string]: WebContainerFile | WebContainerDirectory;
  };
}
