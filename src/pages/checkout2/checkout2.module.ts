import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { Checkout2Page } from './checkout2';

@NgModule({
  declarations: [
    Checkout2Page,
  ],
  imports: [
    IonicPageModule.forChild(Checkout2Page),
  ],
  exports: [
    Checkout2Page
  ]
})
export class Checkout2PageModule { }
