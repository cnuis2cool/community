import { SharedModule } from '../../app/shared.module';
import { OffersPage } from './offers';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    OffersPage,
  ],
  imports: [
    IonicPageModule.forChild(OffersPage),
    SharedModule,
  ],
  exports: [
    OffersPage
  ],
  entryComponents: [
    OffersPage,
  ],
})

export class OffersPageModule { }
