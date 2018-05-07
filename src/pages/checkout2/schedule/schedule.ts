import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Address2Page } from '../address/address';
import { sampleData } from '../../../app/data';
import { ScdeduleService } from '../../../app/services/schedule.service';
import { Schedule, Slots, SlotFormatted } from '../../../app/models/schedule.model';

import { Storage } from '@ionic/storage';

import * as moment from 'moment';

import { SharedService } from '../../../app/services/shared.service';
import { MomentService } from '../../../app/services/moment.service';

@Component({
  templateUrl: './schedule.html'
})

export class Schedule2Page {
  delTime: string = "ASAP";

  public event = {
    dateStart: '2018-04-01',
    timeStarts: '08:00',
    dateEnd: '2018-04-20'
  }

  schedule: Schedule;
  availableSlotsToday: Slots;
  slotFormatted: SlotFormatted;
  deliveryType: string;

  constructor(
    public nav: NavController,
    private storage: Storage,
    private sharedService: SharedService,
    private momentService: MomentService,
    private scheduleService: ScdeduleService) {

      //this.availableSlotsToday = this.scheduleService.nextAvailableSlotToday();
      this.slotFormatted = {from: '', to: ''};
      this.deliveryType = 'ASAP';
  }

  // One time
  addScheduledTimes(){
    for (let item of sampleData.delivery_slots) {

      this.scheduleService.addSchedule(item).then(ref => {
        console.log(ref.key);
        //this.navCtrl.setRoot(HomePage, { key: ref.key });
      });
    }
  }

  getNextAvailableSlot(type) {

    //let slot = this.availableSlotsToday;

    this.deliveryType = type.value;
    this.storage.set('delivery-type-selected', this.deliveryType);

    let today = this.momentService.getDayType();

    let timeNow = moment().format('HH');

    this.scheduleService.getScheduleList().valueChanges().subscribe(res => {
      res.forEach(item => {
        if (item.type == today){
          console.log(item.slots);

          // Check time is Valid, Time greater than start time and less than end time
          if (moment(item.slots.start, 'HH:mm').isValid() &&
            parseInt(timeNow) >= this.momentService.getHHFromTime(item.slots.start) &&
            parseInt(timeNow) < this.momentService.getHHFromTime(item.slots.end)) {
            this.availableSlotsToday = item.slots;

            //let t = 60 - parseInt(moment().format('mm'));
            //let d = item.slots.duration;

            if (item.slots != null){

              this.slotFormatted = {
                from: this.momentService.addHoursToTime(timeNow, 1),
                to: this.momentService.addHoursToTime(timeNow, item.slots.duration + 1)
              };
            }

          } else {
            this.sharedService.showToast('No Delivery Slots Available');
          }
        }
      });
    });

  }

  pushPage() {
    this.nav.push(Address2Page);
  }

}
