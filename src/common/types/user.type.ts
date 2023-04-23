export interface IShipping {
  region: string;
  city: string;
  deliveryService: string;
  warehouse: string;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  shippingDetails: IShipping;
}

export interface IRegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IToken {
  token: string;
}

export interface IUpdateUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  region?: string;
  city?: string;
  birthDate?: string;
  deliveryService?: string;
  warehouse?: string;
  newPassword?: string | null;
  oldPassword?: string | null;
}
