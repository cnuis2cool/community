import {Injectable} from '@angular/core';
import { Product } from "../models/products/product.model";
import { Observable, Subject, Subscriber} from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { of } from 'rxjs/observable/of';

@Injectable()
export class CartService2 {
  private itemsInCartSubject: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  private itemsInCart: Product[] = [];

  constructor() {
    this.itemsInCartSubject.subscribe(_ => this.itemsInCart = _);
    //return this.userCartItems = this.db.list<Cart>(this.dbPath + `/${userid}/cart`);

  }

  public addToCart(item: Product) {
    this.itemsInCartSubject.next([...this.itemsInCart, item]);

    // this.http.post(`${this.baseUrl}/todos`, JSON.stringify(todo)).subscribe(data => {
    //   this.dataStore.todos.push(data);
    //   this._todos.next(Object.assign({}, this.dataStore).todos);
    // }, error => console.log('Could not create todo.'));
  }

  public removeFromCart(item: Product) {
    const currentItems = [...this.itemsInCart];
    const itemsWithoutRemoved = currentItems.filter(_ => _.key !== item.key);
    this.itemsInCartSubject.next(itemsWithoutRemoved);
  }

  public getItems(): Observable<Product[]> {
    return this.itemsInCartSubject.asObservable();
  }

  public getTotalAmount(): Observable<number> {
    return this.itemsInCartSubject.map((items: Product[]) => {
      return items.reduce((prev, curr: Product) => {
        return prev + curr.price;
      }, 0);
    });
  }

}
