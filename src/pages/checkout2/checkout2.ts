import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { Schedule2Page } from './schedule/schedule'

@IonicPage()
@Component({
  selector: 'page-checkout2',
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class Checkout2Page {
  // First page to push onto the stack
  rootPage = Schedule2Page;
}







