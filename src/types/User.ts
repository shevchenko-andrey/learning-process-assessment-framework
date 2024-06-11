import { ApplicationRole } from "./Auth";

export type ApplicationUser = {
  id: string;
  email: string;
  role: ApplicationRole;
  groups: string[];
};

export type UserCredentials = {
  email: string;
  password: string;
};
