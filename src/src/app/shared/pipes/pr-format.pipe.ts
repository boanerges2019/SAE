import { Pipe, PipeTransform } from '@angular/core';
import { EvenementCte } from 'app/core/evenement/constantes/evenement.constantes';

@Pipe({
  name: 'prFormat'
})
export class PrFormatPipe implements PipeTransform {

  transform(value: any, axe?: any, sens?: any,  prDebut?: any,  prFin?: any): any {
    if (!value) return value;
    if (typeof value === "object"){
       return `${axe}/${EvenementCte.INPUT.SENS_CROISSANT === sens ? 1:2}/${prDebut.numero}+${prDebut.abscisse}/${prFin.numero}+${prFin.abscisse}`;
    }

    return value;
  }

}
