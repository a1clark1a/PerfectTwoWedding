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
  accepted: boolean;
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
  kidsNames: Kid[];
}

export type Kid = {
  name: string;
  accepted: boolean;
};
