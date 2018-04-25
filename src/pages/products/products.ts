import { Component } from '@angular/core';
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

@Component({
  selector: 'page-products',
  templateUrl: './products.html',
  providers: [SharedService, CartService, AuthService, ProductListService]
})

export class ProductsPage {

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

    this.getCartItems();
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

      this.productService.addProduct(item.category, item);

      this.productService.addProduct(item.category, item).then(ref => {
        console.log(ref.key);
      });
    }
  }

  // TODO - Should be called in a loop
  updateProductQuantity(productId: string){
    return this.productInCart$ = this.cartService.getProductCartList(this.authService.getLoggedUID(), productId).valueChanges();
  }

  getCartItems(){

    this.cartService
    .getUserCartList(this.authService.getLoggedUID())  // DB List
    .snapshotChanges().forEach( user => {
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

  updateCartItems(){
    for(let item of this.cartList){
      this.cartCount += item.values.quantity;
    }
  }

  gotoCart(){
    this.navCtrl.push(OrdersPage);
  }

  // addToCart(product)  : void  {
  //   this.cartService.addCartItem(this.authService.getLoggedUID(), product);
  //   this.getCartItems();
  //   this.updateProductQuantity(product.key);
  // }

  incremenetCart(product: any){
    this.cartService.incrementCart(this.authService.getLoggedUID(), product);
    this.getCartItems();
    this.updateProductQuantity(product.key);
  }

  decremenetCart(product: any){
    //this.cartService.decrementCartItem(this.authService.getLoggedUID(), product);
    this.getCartItems();
    this.updateProductQuantity(product.key);
  }

}
