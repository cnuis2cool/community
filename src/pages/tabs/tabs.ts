import { Component } from '@angular/core';

import { OrdersPage } from '../orders/orders';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';
import { CategoryPage } from '../category/category';
import { OffersPage } from '../offers/offers';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = OrdersPage;
  tab3Root = ProfilePage;
  tab4Root = CategoryPage;
  tab5Root = OffersPage;

  constructor() {

  }
}
