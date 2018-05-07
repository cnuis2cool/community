import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Product } from "../models/products/product.model";

@Injectable()
export class ProductListService {

  private dbPath = '/products';

  //productListRef: AngularFireList<Product> = null;
  productList: AngularFireList<Product>;

  constructor(private db: AngularFireDatabase) {
    //this.productListRef = db.list(this.dbPath);
  }

  loadProducts(category : number)  {
    return this.productList = this.db.list<Product>(this.dbPath + '/' + category);
  };

  addProduct(category: number, product: Product) {
    this.loadProducts(category);
    return this.productList.push(product);
  }

  updateProduct(key: string, value: any): void {
    this.productList.update(key, value).catch(error => this.handleError(error));
  }

  deleteProduct(key: string): void {
    // this.productListRef.remove(key).catch(error => this.handleError(error));
    this.productList.remove(key).then(_ => console.log('product removed!'));
  }

  // Danger zone
  deleteAll(): void {
    this.productList.remove().catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
  }

}
