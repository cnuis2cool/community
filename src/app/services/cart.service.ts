import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/take';

import { SharedService } from "./shared.service";
import { Cart } from "../models/cart/cart.model";
import { Observable } from "@firebase/util";

@Injectable()
export class CartService {
  // cartItemsRef: AngularFireList<Cart>;
  cartItems: AngularFireList<Cart>;
  orderItems: Observable<any>;

  cartAmount: number = 0;
  constructor(
    public db: AngularFireDatabase,
    private sharedService: SharedService
  ) {}

  // getCategoryList(){
  //   return this.categoryListRef;
  // }

  // addCategory(category: Category){
  //   return this.categoryListRef.push(category);
  // }

  getCartList(userid: string) {
    return this.db.list("cart/" + userid);
  }

  loadCartList(userid: string) {
    this.cartItems = this.db.list("cart/" + userid);

    // this.cartItems = this.cartItemsRef.snapshotChanges().map(changes => {
    //   return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    // });

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

  addCartItem(userid: string, product: any) {
    this.loadCartList(userid);
    // this.cartItems.push(product);

    let item$ = this.db.object('cart/${userid}/${product.$key}');

    /*
    let item$ = this.db.object('cart/${userid}/${product.$key}').snapshotChanges();
    item$.take(1).subscribe(action => {
      if (action.payload.exists()){
        //item$. .update({ quantity : item.quantity + 1})
        this.incrementCartItem(userid, product);
      } else {
        const cartItem = {
          image: product.image,
          name: product.name,
          price: product.price,
          quantity:  1
        }
        this.cartItems.push(cartItem);
      }
    });
    */

    /*
    this.db
      .object("cart/${userid}/${product.$key}")
      .snapshotChanges()
      .subscribe(data => {
        if (data.payload.val() !== null) {
          //this.incrementCartItem(userid, product);
        } else {
          // this.db
          //   .object("products/" + product.$key)
          //   .snapshotChanges()
          //   .subscribe(productData => {
              var cartItem: Cart = {
                image: product.image,
                name: product.name,
                price: product.price,
                quantity: 1
              };
              this.cartItems
                .update(product.$key, cartItem)
                .catch(error => this.handleError(error));
              this.sharedService.showToast("Item Added!");
            //});
        }
      });
      */
  }

  removeCartItem(userid: string, productId: string) {
    this.loadCartList(userid);
    this.cartItems
      .remove(productId)
      .then(_ => this.sharedService.showToast("Item removed"));

      // decrementCartItem
  }

  incrementCartItem(userid: string, product: any) {

    // TODO: Test - may work
    // https://github.com/angular/angularfire2/issues/1342
    let item$ = this.db.object('cart/${userid}/${product.$key}').snapshotChanges();
    item$.take(1).subscribe(action => {
      if (action.payload.exists()){
        //item$. .update({ quantity : item.quantity + 1})
        const cartItem = {
          image: product.image,
          name: product.name,
          price: product.price,
          quantity: product.quantity + 1
        }
        this.cartItems.update(product.$key, cartItem);
      } else {
        // Not found
      }
    });

    /*
    this.db
      .object('cart/${userid}/${product.$key}')
      .update({
        image: product.image,
        name: product.name,
        price: product.price,
        quantity: product.quantity - 1
      })
      .then(() => {
        // update successful (document exists)
      })
      .catch(error => {
        // console.log('Error updating user', error); // (document does not exists)
        this.db.object('users/${result.uid}').set({
          image: product.image,
          name: product.name,
          price: product.price,
          quantity: product.quantity + 1
        });
      });

    const item = this.db.list("cart/${userid}/${product.$key}").valueChanges();

    if (!increment) {
      if (cartItem.quantity > 1) this.cartItems.update(cartItem.$key, cartItem);
      else {
        this.removeCartItem(userid, cartItem.$key);
      }
    } else {
      this.removeCartItem(userid, product.$key);
    }
    */
  }

  decrementCartItem(userid: string, product: any) {

    // TODO: Test - may work
    // https://github.com/angular/angularfire2/issues/1342
    let item$ = this.db.object('cart/${userid}/${product.$key}').snapshotChanges();
    item$.take(1).subscribe(action => {
      if (action.payload.exists()){
        //item$. .update({ quantity : item.quantity + 1})
        const cartItem = {
          image: product.image,
          name: product.name,
          price: product.price,
          quantity: product.quantity - 1
        }
        this.cartItems.update(product.$key, cartItem);
      } else {
        // Not found
      }
    });
  }

  /*
  decrementCartItem(userid: string, product: any) {
    this.loadCartList(userid);
    this.cartItems.update(product.$key, { quantity: 1 });

    this.db
      .object("cart/${userid}/${product.$key}")
      .snapshotChanges()
      .subscribe(data => {
        if (data.payload.val() !== null) {
          if (data.payload.val().quantity - 1 > 0) {
            this.cartItems.update(product.$key, { quantity: 1 });
          } else {
            this.removeCartItem(userid, product.$key);
          }
        } else {
          this.sharedService.showToast("No such element!");
        }
      });
  }

  incrementCartItem(userid: string, product: any) {
    this.loadCartList(userid);

    this.db
      .object("cart/${userid}/${product.$key}")
      .snapshotChanges()
      .subscribe(cartItem => {
        if (cartItem.payload.val() !== null) {
          this.db
            .object("products/" + product.$key)
            .snapshotChanges()
            .subscribe(productData => {
              console.log("Incremented Quantity Successfully");
              this.cartItems.update(product.$key, {
                quantity: cartItem.payload.val().quantity + 1
              });
            });
        } else {
          this.sharedService.showToast(
            "No such element to increment quantity!"
          );
        }
      });
  }

  // Order services
  checkout(userid: string, deliveryDetails: string) {
    // Loads the subscribed cart list
    this.loadCartList(userid);

    // loads the unsubscribed cart list
    var cartItemUnsubscribed = this.db.list("cart/" + userid).take(1);

    // Add items to orders
    var orderItem: AngularFireList<any> = this.db.list("orders/" + userid);

    // Because subscribed cart list would prevent adding items to cart after an order is created.
    cartItemUnsubscribed.forEach(rows => {
      rows.forEach(cartItem => {
        cartItem.status = 1;
        cartItem.delivery = deliveryDetails;

        // check if product is available
        this.db
          .object("products/" + cartItem.$key, { preserveSnapshot: true })
          .first()
          .subscribe(productData => {
            //%%%%%%%%%%%%%%%%
            if (
              cartItem.quantity <= productData.val().stock &&
              productData.val().available == true
            ) {
              orderItem.push(cartItem); // add the item to orders

              this.cartItems.remove(cartItem.$key); // remove the item from the cart

              // decrement the item qty
              this.db
                .object("products/" + cartItem.$key + "/stock")
                .set(productData.val().stock - cartItem.quantity);
            }

            //%%%%%%%%%%%%%%%%
          });
      });
    });
  }

  loadOrders(userid: string) {
    this.orderItems = this.db.list("orders/" + userid);
  }
  */

  private handleError(error) {
    console.log(error);
  }
}
