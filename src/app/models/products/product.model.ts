import { Observable } from "rxjs/Observable";

export interface Product {
  key?: string,
  image: string,
  name: string,
  price: number,
  quantity: Array<number>,
  units: string,
  category: number,
  itemsInCart?: Observable<number>
}
