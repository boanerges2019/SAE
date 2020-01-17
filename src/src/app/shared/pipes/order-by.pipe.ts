import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(array: Array<any>, orderBy: any, asc = true): Array<any> {
    if (!array) return array;

    array.sort((a: any, b: any) => {
      if (a[orderBy] < b[orderBy]) {
        return -1;
      } else if (a[orderBy] > b[orderBy]) {
        return 1;
      } else {
        return 0;
      }
    });
    return asc ? array : array.reverse();
  }

  orderByComparator(a:any, b:any):number{

     if((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))){
       //Isn't a number so lowercase the string to properly compare
       if(a.toLowerCase() < b.toLowerCase()) return -1;
       if(a.toLowerCase() > b.toLowerCase()) return 1;
     }
     else{
       //Parse strings as numbers to compare properly
       if(parseFloat(a) < parseFloat(b)) return -1;
       if(parseFloat(a) > parseFloat(b)) return 1;
      }

     return 0; //equal each other
 }

}
