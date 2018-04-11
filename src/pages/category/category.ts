import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProductsPage } from '../products/products';

@Component({
  selector: 'page-category',
  templateUrl: './category.html'
})
export class CategoryPage {
  categories: any [];

  constructor(public navCtrl: NavController) {
    this.categories = [
      {
        id: 'vegetables',
        name: 'Vegetables',
        image: './assets/img/category/vegetables.jpeg',
        content: 'Order for 100 get 5% off',
      },
      {
        id: 'fruits',
        name: 'Fruits',
        image: './assets/img/category/fruits.jpeg',
        content: 'Order for 100 get 10% off',
      },
      {
        id: 'milk',
        name: 'Milk',
        image: './assets/img/category/milk.jpeg',
        content: 'Order for 50 get 5% off',
      },
    ];

  }

  itemTapped(event, item) {
    this.navCtrl.push(ProductsPage, {
      'product': item
    });
  }


  // itemTapped() {
  //   this.navCtrl.push(ProductsPage);
  // }
}
