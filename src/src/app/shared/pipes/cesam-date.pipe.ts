import { Pipe, PipeTransform } from '@angular/core';
import { ConfigGenerale } from 'app/shared/services/config/config.generale';
import * as moment from 'moment';

@Pipe({
  name: 'cesamDate'
})
export class CesamDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) return value;
    return moment(value).format(ConfigGenerale.FR_SHORT_FORMAT_DATE);
  }
}
