import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from "angularfire2/database";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/take';

import { SharedService } from "./shared.service";
import { Cart } from "../models/cart/cart.model";
import { Observable } from "@firebase/util";
import { Product } from "../models/products/product.model";

@Injectable()
export class CartService {

  private dbPath = '/user';

  cartItems: AngularFireList<Cart> = null;
  userCartItems: AngularFireList<Cart> = null;
  productCartItems: AngularFireObject<Cart> = null;

  //orderItems: Observable<any>;

  cartAmount: number = 0;
  constructor(
    public db: AngularFireDatabase,
    private sharedService: SharedService
  ) {}

  getUserCartList(userid: string) {
    return this.userCartItems = this.db.list<Cart>(this.dbPath + `/${userid}/cart`);
  }

  getProductCartList(userid: string, productId: string) {
    return this.productCartItems = this.db.object<Cart>(this.dbPath + `/${userid}/cart/${productId}`);
  }

  incrementCart(userid: string, product: Product): void {
    this.getUserCartList(userid);
    //this.getProductCartList(userid, product.key);

    this.db
    .object(this.dbPath + `/${userid}/cart/${product.key}`).snapshotChanges()
    .take(1).subscribe(data => {
      const cartItem = {
        key: product.key,
        image: product.image,
        name: product.name,
        price: product.price,
        quantity: 0
      }
      if (data.payload.val() !== null) {
        cartItem.quantity = data.payload.val().quantity + 1;
        this.userCartItems.update(product.key, cartItem);
        this.sharedService.showToast("Cart updated");
      } else {
        cartItem.quantity = 1;
        //this.userCartItems.push(cartItem);
        this.userCartItems.update(product.key, cartItem);
        this.sharedService.showToast("Product added to Cart");
      }
    });

    // this.db.object(this.dbPath + '/${userid}/${product.$key}').valueChanges()
    //     .subscribe(data => {
    //       console.log(data);
    //     })
  }

  decrementCart(userid: string, product: Product): void {
    this.getUserCartList(userid);
    //this.getProductCartList(userid, product.key);

    this.db
    .object(this.dbPath + `/${userid}/cart/${product.key}`).snapshotChanges()
    .take(1).subscribe(data => {
      const cartItem = {
        key: product.key,
        image: product.image,
        name: product.name,
        price: product.price,
        quantity: 0
      }
      if (data.payload.val() !== null && data.payload.val().quantity > 0) {
        cartItem.quantity = data.payload.val().quantity - 1;
        this.userCartItems.update(product.key, cartItem);
        this.sharedService.showToast("Cart updated");
      } else if (data.payload.val() !== null && data.payload.val().quantity == 0) {
        this.removeCartItem(userid, product.key);
      }
    });
  }

  loadCartList(userid: string) {
    this.cartItems = this.db.list(this.dbPath + '/' + userid);

    this.cartItems.valueChanges().subscribe(
      rows => {
        this.cartAmount = 0;
        rows.forEach(row => {
          this.cartAmount = this.cartAmount + row.quantity * row.price;
        });
      },
      err => {
        console.log("not authenticated");
      },
      () => {
        console.log("done.");
      }
    );
  }

  removeCartItem(userid: string, productId: string) {
    this.loadCartList(userid);
    this.cartItems
      .remove(productId)
      .then(_ => this.sharedService.showToast("Item removed"));
  }

  /*
  // Order services
  checkout(userid: string, deliveryDetails: string) {
    // Loads the subscribed cart list
    this.loadCartList(userid);

    // loads the unsubscribed cart list
    var cartItemUnsubscribed = this.db.list("cart/" + userid).snapshotChanges().take(1);

    // Add items to orders
    var orderItem: AngularFireList<any> = this.db.list("orders/" + userid);

    // Because subscribed cart list would prevent adding items to cart after an order is created.
    cartItemUnsubscribed.forEach(rows => {
      rows.forEach(cartItem => {
        cartItem.payload.status = 1;
        cartItem.payload.delivery = deliveryDetails;

        // check if product is available
        this.db
          .object("products/" + cartItem.$key).snapshotChanges()
          .first()
          .subscribe(productData => {
            if (
              cartItem.quantity <= productData.payload.val().stock &&
              productData.payload.val().available == true
            ) {
              orderItem.push(cartItem); // add the item to orders

              this.cartItems.remove(cartItem.$key); // remove the item from the cart

              // decrement the item qty
              this.db
                .object("products/" + cartItem.$key + "/stock")
                .set(productData.payload.val().stock - cartItem.quantity);
            }
          });
      });
    });
  }
  */

  loadOrders(userid: string) {
    //this.orderItems = this.db.list("orders/" + userid);
  }

  private handleError(error) {
    console.log(error);
  }
}
