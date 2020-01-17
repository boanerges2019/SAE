import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { AlertMessage } from 'app/shared/models/generic/alert-message';

@Component({
    selector: 'alert-message',
    templateUrl: './alert-message.component.html',
    styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent {

    @Input() alertMessages:AlertMessage[];
    @Input() warningEvtEdit:AlertMessage;

    // alertData: AlertMessage[] = [];
    // mapAlertData: any = {};

    constructor() {
    }


    //  ngOnInit() {
    //    this.alertData = [];
    //    this.mapAlertData = {};
    //    this.alertData.forEach(alertMessage => {
    //      this.mapAlertData[alertMessage.message] = alertMessage;
    //    });
    //  }
    //
    //  ngOnChanges(data){
    //    // if (data && data.alertMessages){
    //    //   this.add(data.alertMessages.currentValue);
    //    // }
    //  }
    //
    //  add(alertMessages: AlertMessage[]){
    //    alertMessages.forEach(alertMessage => {
    //      if (!this.mapAlertData[alertMessage.message]){
    //        this.alertData.push(alertMessage);
    //        this.mapAlertData[alertMessage.message] = alertMessage;
    //      }
    //    });
    //  }
    //
    //  removeAlert(index:number, alertMessage: AlertMessage) {
    //   this.alertData.splice(index, 1);
    //   delete this.mapAlertData[alertMessage.message];
    // }

}
