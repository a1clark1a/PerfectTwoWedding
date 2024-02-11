export type Users = User[];

export interface User {
  displayName: string;
  email: string;
  createdAt: Date;
  verifiedCode: VerifiedCode[];
}

export type VerifiedCode = {
  alreadyUsed: boolean;
  inviteCode: string;
  kids: Kids;
  name: string;
  plusOne: plusOne;
  accepted: boolean;
};

export type plusOne = {
  allow: boolean;
  name: string;
};

export interface Kids {
  allowKids: boolean;
  kidsNames: string[];
}
