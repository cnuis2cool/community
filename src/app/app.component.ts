import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { AuthService } from './services/auth.service';

import { Product } from "./models/products/product.model";
import { CartService } from './services/cart.service';

import {Observable} from 'rxjs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  private platform;

  public cartItems$: Observable<Product[]>;


  constructor(platform: Platform,
    private statusBar: StatusBar,
    splashScreen: SplashScreen,
    private auth: AuthService,
    private cartService: CartService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.initializeApp();

      // this.cartItems$ = this
      // .cartService
      // .getItems();

      // this.cartItems$.subscribe(_ => _);

    });
  }

  initializeApp() {
    // this.platform.ready().then(() => {
    //   this.statusBar.styleDefault();
    // });

    this.auth.afAuth.authState
      .subscribe(
        user => {
          if (user) {
            this.rootPage = TabsPage;
          } else {
            this.rootPage = LoginPage;
          }
        },
        () => {
          this.rootPage = LoginPage;
        }
      );
  }
}
