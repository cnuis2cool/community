import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartService } from "../../app/services/cart.service";
import { Product } from "../../app/models/products/product.model";
import { Observable } from "rxjs";
import { of } from "rxjs/observable/of";
import { Checkout2Page } from "../checkout2/checkout2";

@Component({
  selector: "page-cart",
  templateUrl: "./cart.html",
  providers: [CartService]
})

export class CartPage {
  public cartItems$: Observable<Product[]> = of([]);
  public cartItems: Product[] = [];

  constructor(private navCtrl: NavController, private cartService: CartService) {
    // this.cartItems$ = this.cartService.getItems();

    this.cartItems$.subscribe(_ => (this.cartItems = _));
  }

  /*
  public getTotal(): Observable<number> {
    // return this.cartService.getTotalAmount();
  }
  */

  public removeItem(item: Product) {
    // this.cartService.removeFromCart(item);
  }

  public openNavDetailsPage() {
    this.navCtrl.push(Checkout2Page);
  }
}
