import { Component, OnInit } from '@angular/core';
import { DateUtils } from '../../../../app/shared/utils/date-utils';


@Component({
  selector: 'current-time',
  template: `<span [innerHTML]="dateString"></span>`
})
export class CurrentTimeComponent  {
  private date;
  public dateString;

  constructor() {
    this.date =  new Date();

    setInterval(() => {
        this.date =  new Date();
        this.dateString = `${this.date.getHours()}:${DateUtils.intToString(this.date.getMinutes())}:${DateUtils.intToString(this.date.getSeconds())}`;
     }, 1000);
  }
}
