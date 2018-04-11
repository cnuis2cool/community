import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { sampleData } from '../../app/data';


@Component({
  selector: 'page-products',
  templateUrl: './products.html'
})

export class ProductsPage {

  products: any = [];
  catProducts: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams){

    this.catProducts = this.navParams.get('product');

    this.products = sampleData.products[0][this.catProducts.id];

    /*
    this.products = [
      {
        image: './assets/img/category/capsicum.jpeg',
        name: 'Capsicum',
        price: 10,
        quantity: [100, 250, 500],
        units: 'gm',
      },
      {
        image: './assets/img/category/mirchi.jpeg',
        name: 'Mirchi',
        price: 10,
        quantity: [100, 250, 500],
        units: 'gm',
      },
      {
        image: './assets/img/category/tomato.jpeg',
        name: 'Tomato',
        price: 10,
        quantity: [500, 1000],
        units: 'gm',
      },
      {
        image: './assets/img/category/capsicum.jpeg',
        name: 'Capsicum',
        price: 10,
        quantity: [100, 250, 500],
        units: 'gm',
      },
      {
        image: './assets/img/category/mirchi.jpeg',
        name: 'Mirchi',
        price: 10,
        quantity: [100, 250, 500],
        units: 'gm',
      },
      {
        image: './assets/img/category/tomato.jpeg',
        name: 'Tomato',
        price: 10,
        quantity: [500, 1000],
        units: 'gm',
      },
    ];
    */
  }

}
