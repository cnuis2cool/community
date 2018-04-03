import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { OrdersPage } from '../pages/orders/orders';
import { ProfilePage } from '../pages/profile/profile';
import { HomePage } from '../pages/home/home';
import { CategoryPage } from '../pages/category/category';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';

//import { CheckoutPage } from '../pages/checkout/checkout';
import { SchedulePage } from '../pages/checkout/schedule/schedule';
import { AddressPage } from '../pages/checkout/address/address';
import { DeliveryPage } from '../pages/checkout/delivery/delivery';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    OrdersPage,
    ProfilePage,
    HomePage,
    CategoryPage,
    SettingsPage,
    TabsPage,

    //CheckoutPage,
    SchedulePage,
    AddressPage,
    DeliveryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OrdersPage,
    ProfilePage,
    HomePage,
    CategoryPage,
    SettingsPage,
    TabsPage,

    //CheckoutPage,
    SchedulePage,
    AddressPage,
    DeliveryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
