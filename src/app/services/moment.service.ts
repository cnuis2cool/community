import { Injectable } from "@angular/core";
import { Observable, Subject, Subscriber} from 'rxjs';
import { SharedService } from "./shared.service";

import * as moment from 'moment';

@Injectable()
export class MomentService {

  dateToday: string;
  timeNowHHmm: string;
  timeNowHH: string;
  dayType: string;  //weekday/weekend

  constructor (private sharedService: SharedService) {
  }

  // weekday / weekend
  getDayType(): string {

    const dayToday = moment().isoWeekday();

    return dayToday >=1 && dayToday <=5 ? 'weekday' : 'weekend';
  }

  getHHFromTime(timeHHmm: string): number {
    return parseInt(moment(timeHHmm, 'HH:mm').format('HH'));
  }

  addHoursToTime(timeHH: string, hr: number): string {
    return moment(timeHH, 'HH').add(hr, 'h').format('HH:mm').toString();
  }


}
