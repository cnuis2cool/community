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
import { AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'page-products',
  templateUrl: './products.html',
  providers: [SharedService, CartService, AuthService, ProductListService]
})

export class ProductsPage {

  cartList$: Observable<Cart[]>;
  products: Observable<Product[]> = null;
  catProduct: any;
  product: Product;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public authService: AuthService,
    public productService: ProductListService){

    this.catProduct = this.navParams.get('product');

    cartService.loadCartList(this.authService.getLoggedUID());

    this.getProductList();

  }

  getProductList(){
    this.products = this.productService
    .loadProducts(this.catProduct.id)  // DB List
    .snapshotChanges()  // Key & Value
    .map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }));
      });
  }

  // One time use to load products
  addProducts(){

    for (let item of sampleData.products) {
      //console.log(item);

      this.productService.addProduct(item.category, item);
    }
  }

  getCartItems(){
    this.cartList$ = this.cartService
    .getCartList(this.authService.getLoggedUID())  // DB List
    .snapshotChanges()  // Key & Value
    .map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }));
      });
  }

  gotoCart(){
    this.navCtrl.push(OrdersPage);
  }

  addToCart(product)  : void  {
    this.cartService.addCartItem(this.authService.getLoggedUID(), product);
    this.getCartItems();
  }

}
