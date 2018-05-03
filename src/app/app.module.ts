import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { IonicStorageModule } from '@ionic/storage';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { SharedModule } from './shared.module';

import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

import { OrdersPage } from '../pages/orders/orders';
import { ProfilePage } from '../pages/profile/profile';
import { HomePage } from '../pages/home/home';
import { CategoryPage } from '../pages/category/category';
import { OffersPage } from '../pages/offers/offers';
import { TabsPage } from '../pages/tabs/tabs';

import { ProductsPage } from '../pages/products/products';
import { CartPage } from '../pages/cart/cart';

//import { CheckoutPage } from '../pages/checkout/checkout';
import { SchedulePage } from '../pages/checkout/schedule/schedule';
import { AddressPage } from '../pages/checkout/address/address';
import { DeliveryPage } from '../pages/checkout/delivery/delivery';

import { Schedule2Page } from '../pages/checkout2/schedule/schedule';
import { Address2Page } from '../pages/checkout2/address/address';
import { Delivery2Page } from '../pages/checkout2/delivery/delivery';
import { ConfirmPage } from '../pages/checkout2/confirm/confirm';
import { BillingPage } from '../pages/profile/addresses/billing';
import { NewAddressPage } from '../pages/profile/addresses/new-address/new-address';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AuthService } from './services/auth.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FIREBASE_CONFIG } from './firebase.credentials';
import { CategoryListService } from './services/category-list/category-list.service';
import { CartService } from './services/cart.service';
import { ProductListService } from './services/products.service';
import { SharedService } from './services/shared.service';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    OrdersPage,
    ProfilePage,
    HomePage,
    CategoryPage,
    OffersPage,
    TabsPage,
    BillingPage,
    NewAddressPage,

    ProductsPage,
    CartPage,

    //CheckoutPage,
    SchedulePage,
    AddressPage,
    DeliveryPage,

    Schedule2Page,
    Address2Page,
    Delivery2Page,
    ConfirmPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    NgxErrorsModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    SharedModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    OrdersPage,
    ProfilePage,
    HomePage,
    CategoryPage,
    OffersPage,
    TabsPage,
    BillingPage,
    NewAddressPage,

    ProductsPage,
    CartPage,

    //CheckoutPage,
    SchedulePage,
    AddressPage,
    DeliveryPage,

    Schedule2Page,
    Address2Page,
    Delivery2Page,
    ConfirmPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    CategoryListService,
    AngularFireAuth,
    SharedService,
    CartService,
    ProductListService
  ]
})
export class AppModule {}
