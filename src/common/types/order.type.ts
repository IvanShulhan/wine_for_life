interface IProductItem {
  [key: number]: number;
}

export interface IOrder {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  region: string;
  city: string;
  deliveryService: string;
  wareHouse: string;
  payment: string;
  isGift: boolean;
  products: IProductItem;
}
