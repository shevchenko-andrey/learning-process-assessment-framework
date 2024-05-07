import { ApplicationRole } from "./Auth";

export type ApplicationUser = {
  id: string;
  email: string;
  role: ApplicationRole;
};

export type UserCredentials = {
  email: string;
  password: string;
};
