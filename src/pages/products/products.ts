import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { sampleData } from '../../app/data';
import { OrdersPage } from '../orders/orders';

import { Observable } from 'rxjs/Observable';

import { SharedService } from '../../app/services/shared.service';
import { CartService } from '../../app/services/cart.service';
import { AuthService } from '../../app/services/auth.service';
import { Cart } from '../../app/models/cart/cart.model';
import { Product } from '../../app/models/products/product.model';
import { ProductListService } from '../../app/services/products.service';
import { AngularFireList, AngularFireObject } from 'angularfire2/database';
import { async } from '@firebase/util';
import { CartPage } from '../cart/cart';

@Component({
  selector: 'page-products',
  templateUrl: './products.html',
  providers: [SharedService, CartService, AuthService, ProductListService]
})

export class ProductsPage implements OnInit {

  cartList$: Observable<Cart[]>;
  cartList: any = [];
  productInCart$: Observable<Cart>;
  products: Observable<Product[]> = null;
  catProduct: any;
  product: Product;
  cartCount: number = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public authService: AuthService,
    public productService: ProductListService){

    this.catProduct = this.navParams.get('product');

    //cartService.loadCartList(this.authService.getLoggedUID());

    this.getProductList();

    //this.getCartItems();
  }

  ngOnInit(): void {
    this.cartService
    .getUserCartList(this.authService.getLoggedUID())
  }

  getProductList(){
    this.products = this.productService
    .loadProducts(this.catProduct.id)  // DB List
    .snapshotChanges()  // Key & Value
    .map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val(),
        }));
      });
  }

  // One time use to load products
  addProducts(){

    for (let item of sampleData.products) {
      //console.log(item);

      //this.productService.addProduct(item.category, item);

      this.productService.addProduct(item.category, item).then(ref => {
        console.log(ref.key);
      });
    }
  }

  // TODO - Should be called in a loop
  updateProductQuantity(product: Product){
    //this.productInCart$ = this.cartService.getProductCartList(this.authService.getLoggedUID(), product.key).valueChanges();
    //product.itemsInCart = this.productInCart$.map(function(x) {return x['quantity']});

    product.itemsInCart = this.cartService
    .getProductCartList(this.authService.getLoggedUID(), product.key)
    .valueChanges()
    .map(
      changes => {
        return changes != null ? changes.quantity : 0
      });

  }

  /*
  public addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.gotoCart();
  }
  */


  getCartItems(){

    this.cartCount = this.cartService.getCartCount();

    /*
    this.cartService
    .getUserCartList(this.authService.getLoggedUID())  // DB List
    .snapshotChanges(['child_added']).forEach( user => {
      user.forEach( userData => {

        let obj = this.cartList.find(x => x.key === userData.payload.key);
        let index = this.cartList.indexOf(obj);

        if (index != -1) {

        // if (this.cartList.find(function (obj) {
        //   return obj.key === userData.payload.key;
        //  }) !== undefined){
          this.cartList[index].quantity = userData.payload.val().quantity + 1;
          this.cartCount += 1;  //userData.payload.val().quantity;

        } else{
          this.cartList.push({
            key: userData.payload.key, ...userData.payload.val()
          })
          this.cartCount += userData.payload.val().quantity;
        }})
        //let data = userData.payload.val().data();
      });
      */

    // this.cartList$ = this.cartService
    // .getUserCartList(this.authService.getLoggedUID())  // DB List
    // .snapshotChanges()  // Key & Value
    // .map(
    //   changes => {
    //     return changes.map(c => ({
    //       key: c.payload.key, ...c.payload.val()
    //     }));
    //   });
  }

  /*
  updateCartItems(){
    for(let item of this.products){
      this.cartCount += item.values.quantity;
    }
  }
  */

  gotoCart(){
    this.navCtrl.push(CartPage);
    // this.navCtrl.push(OrdersPage);
  }

  // addToCart(product)  : void  {
  //   this.cartService.addCartItem(this.authService.getLoggedUID(), product);
  //   this.getCartItems();
  //   this.updateProductQuantity(product.key);
  // }


  incremenetCart(product: any){
    this.cartService.incrementCart(this.authService.getLoggedUID(), product);
    this.getCartItems();
    this.updateProductQuantity(product);
  }

  decremenetCart(product: any){
    this.cartService.decrementCart(this.authService.getLoggedUID(), product);
    this.getCartItems();
    this.updateProductQuantity(product);
  }


}
