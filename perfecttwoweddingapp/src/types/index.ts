export type Users = User[];

export interface User {
  displayName: string;
  email: string;
  createdAt: Date;
  verifiedCode: VerifiedCode[];
}

export interface VerifiedCode {
  alreadyUsed: boolean;
  inviteCode: string;
  kids: Kids;
  name: string;
  plusOne: boolean;
}

export interface Kids {
  allowKids: boolean;
  kidsNames: string[];
}
