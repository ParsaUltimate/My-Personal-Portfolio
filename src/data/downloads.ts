export interface DownloadItem {
  id: string;
  fileId: string;
  objectKey: string;
  name: string;
  description: string;
  fileType: string;
  size: string;
}

export const downloads: DownloadItem[] = [
  {
    id: "1",
    fileId: "portfolio-source",
    objectKey: "source-code.zip",
    name: "Portfolio Source Code",
    description: "The complete source code of this portfolio built with React and Tailwind CSS.",
    fileType: "ZIP Archive",
    size: "1.2MB"
  },
  {
    id: "2",
    fileId: "game-prototype-v1",
    objectKey: "game-prototype-v1.zip",
    name: "Game Prototype V1",
    description: "An early playable prototype of my upcoming game.",
    fileType: "ZIP Archive",
    size: "450MB"
  }
];
