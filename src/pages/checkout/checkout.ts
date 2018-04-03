import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular"

import { SchedulePage } from "../checkout/schedule/schedule";
import { AddressPage } from "../checkout/address/address";
import { DeliveryPage } from "../checkout/delivery/delivery";

@IonicPage()
@Component({
  templateUrl: "checkout.html"
})
export class CheckoutPage {
  tab1Check = SchedulePage;
  tab2Check = AddressPage;
  tab3Check = DeliveryPage;

  constructor() {}
}
