import { Component, Input, HostListener } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { Schedule2Page } from '../checkout2/pages';

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: './orders.html'
})

// export class NavigationDetailsPage {
//   item;

//   constructor(params: NavParams) {
//     this.item = params.data.item;
//   }
// }

export class OrdersPage {

  constructor(public navCtrl: NavController) {

  }

  //@Input() schedulePage: Schedule2Page;

  // @HostListener('click')
  // click() {
  //   this.schedulePage.toggle();
  // }

  openNavDetailsPage() {
  this.navCtrl.push('Checkout2Page');
    //this.schedulePage.toggle();
  }

}
