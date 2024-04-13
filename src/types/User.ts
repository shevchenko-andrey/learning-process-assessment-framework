export type UserCredentials = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  token: string;
} & UserCredentials;
