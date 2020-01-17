import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DateUtils } from 'app/shared/utils/date-utils';


@Component({
  selector: 'cesam-upload',
  templateUrl: './cesam-upload.component.html',
})
export class CesamUploadComponent  {

  @Output('outputFile') outputFileEvent: EventEmitter<any> = new EventEmitter();
  fileName: string;

  constructor() {}

  uploadFile(event){
    if (!event.target.value || !event.currentTarget.files) return;

    this.fileName = event.currentTarget.files[0].name;

    this.outputFileEvent.emit({
        files: event.currentTarget.files,
        fileName: event.target.value
    });
  }
}
