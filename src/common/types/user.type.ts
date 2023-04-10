export interface IUser {
  'first name': string;
  'last name': string;
  email: string;
}

export interface IRegisterUser {
  'first name': string;
  'last name': string;
  email: string;
  password: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}
