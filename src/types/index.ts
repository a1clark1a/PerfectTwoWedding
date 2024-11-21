export type Users = User[];

export interface User {
  displayName: string;
  email: string;
  createdAt: Date;
  verifiedCode: VerifiedCode[];
  id: string;
  submit?: {
    submittedOn: Date;
    submitted: boolean;
  };
  message?: string;
}

export type VerifiedCode = {
  inviteCode: string;
  kids: Kids;
  invitedNames: InvitedNames[];
  plusOne: PlusOne;
  submit?: {
    submittedOn: Date;
    submitted: boolean;
  };
  message?: string;
};

export type InvitedNames = {
  name: string;
  accepted: boolean;
};

export type PlusOne = {
  allow: boolean;
  name: string;
  accepted: boolean;
};

export interface Kids {
  allowKids: boolean;
  kidsNames?: Kid[];
}

export type Kid = {
  name: string;
  accepted: boolean;
};

export interface ImagesFolder {
  [folderName: string]: Images[];
}

export interface VideosObject {
  [folderName: string]: any;
}

export type Images = {
  src: string;
  width: number;
  height: number;
};

export type Error = {
  title: string;
  message: string;
};

export enum VideoFilePath {
  weddingHighlight = "videos/SaraandClarkHighlightVideo_comp.mp4",
  loveStory = "videos/SaraandClarkLoveStory_comp.mp4",
  weddingTeaser = "videos/SaraandClarkTeaser_comp.mp4",
  ourJourney = "videos/SandC.mp4",
}
