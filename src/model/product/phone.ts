import { Product } from './product';

export class Phone extends Product {
  constructor(
    public name: string,
    public price: number,
    public manufacturer: string,
    public img: string,
    public description: string
  ) {
    super(name, price, manufacturer,img, description);
  }
};
