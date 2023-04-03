export interface IProduct {
  id: number;
  name: string;
  photo: string;
  taste: string;
  price: number;
  type: string;
  color: string;
  manufactured: {
    country: string;
    region: string;
  };
  vintage: number;
  pairing: string;
  grape: string;
  temperature: string;
  inStock: boolean;
}