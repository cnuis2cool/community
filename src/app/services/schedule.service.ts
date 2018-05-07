import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from "angularfire2/database";
import { Observable, Subject, Subscriber} from 'rxjs';
import { SharedService } from "./shared.service";
import { Schedule, Slots } from "../models/schedule.model";

import * as moment from 'moment';

@Injectable()
export class ScdeduleService {

  private scheduleListRef = this.db.list<Schedule>('delivery-slots');
  myDate: Date;
  availableSlotsToday: Slots = null;

  constructor(
    public db: AngularFireDatabase,
    private sharedService: SharedService) {
  }

  addSchedule(schedule: Schedule) {
    return this.scheduleListRef.push(schedule);
  }

  getScheduleList(){
    return this.scheduleListRef;
  }

  getAvailableSlotsToday() {

    let dayToday = moment().isoWeekday();
    let today = '';

    if (dayToday >=1 && dayToday <=5)
      today = 'weekday';
    else
      today ='weekend';

    let timeNow = moment().format('HH');

    this.scheduleListRef.valueChanges().subscribe(res => {
      res.forEach(item => {
        if (item.type == today){

        }
      })
    });
  }

  nextAvailableSlotTomorrow(){

  }

  private handleError(error) {
    console.log(error);
  }
}
