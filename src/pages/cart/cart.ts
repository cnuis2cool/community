import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartService } from "../../app/services/cart.service";
import { Product } from "../../app/models/products/product.model";
import { Observable } from "rxjs";
import { of } from "rxjs/observable/of";
import { Checkout2Page } from "../checkout2/checkout2";
import { AuthService } from "../../app/services/auth.service";
import { AngularFireList } from "angularfire2/database";
import { Cart } from "../../app/models/cart/cart.model";

@Component({
  selector: "page-cart",
  templateUrl: "./cart.html",
  providers: [CartService]
})

export class CartPage {
  public cartItems$: Observable<Product[]> = of([]);
  public cartItems: Observable<Cart[]>;
  public cartList: AngularFireList<Cart>;

  public cartTotal: number = 0;
  public cartItemCount: number = 0;
  public cartAmount: number = 0;

  constructor(private navCtrl: NavController,
    private authService: AuthService,
    private cartService: CartService) {
    //this.cartItems$ = this.cartService.loadCartList();

    //this.cartItems$.subscribe(_ => (this.cartItems = _));

    //this.getTotal();

    this.getCartList();
  }

  public getCartList(){

    this.cartList = this.cartService.getUserCartList(this.authService.getLoggedUID());

    this.cartList.valueChanges().subscribe(
      rows => {
        this.cartItemCount = 0;
        this.cartAmount = 0;
        rows.forEach(row => {
          this.cartItemCount = this.cartItemCount + row.quantity;
          this.cartAmount = this.cartAmount + row.quantity * row.price;
        });
      },
      err => {
        console.log("Not authenticated");
      }
    );

    this.cartItems = this.cartList.snapshotChanges().map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }));
      });

  }

  public getTotal() {
    this.cartTotal = this.cartService.getCartCount();
  }

  public removeItem(item: Cart) {
    this.cartService.removeCartItem(this.authService.getLoggedUID(), item.key);
  }

  public openNavDetailsPage() {
    this.navCtrl.push(Checkout2Page);
  }
}
