import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labelCase'
})
export class LabelCasePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) return value;

    let input = value.replace(/([A-Z])/g, ' $1');
    return input[0].toUpperCase() + input.slice(1);
  }

}
