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
  alreadyUsed: boolean;
  inviteCode: string;
  kids: type;
  name: string;
  plusOne: plusOne;
  accepted: boolean;
};

export type plusOne = {
  allow: boolean;
  name: string;
  accepted: boolean;
};

export interface type {
  allowKids: boolean;
  kidsNames: Kid[];
}

export type Kid = {
  name: string;
  accepted: boolean;
};
