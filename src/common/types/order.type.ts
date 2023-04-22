interface IProductItem {
  [key: number]: number;
}

export interface IOrder {
  userRequest: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string | null;
    shippingDetailsRequest: {
      region: string;
      city: string;
      deliveryService: string;
      warehouse: string;
    };
  };
  createAccount: boolean;
  payment: string;
  isGift: boolean;
  products: IProductItem;
}
