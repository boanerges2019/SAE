import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';


export class MockModeleEvenementService {

  // public static VALEURS_POSSIBLES;
  // public static VALEURS_PAR_DEFAUT;

  constructor() { }

  // getValeursPossibles(): Observable<any> {
  //   if (MockModeleEvenementService.VALEURS_POSSIBLES){
  //       return Observable.of(MockModeleEvenementService.VALEURS_POSSIBLES);
  //   }
  //
  //   return Observable.of(EvenementCte.VALEURS_POSSIBLES).map(response => {
  //     MockModeleEvenementService.VALEURS_POSSIBLES = response;
  //     return Observable.of(MockModeleEvenementService.VALEURS_POSSIBLES);
  //   });
  // }
  //
  // getValeursParDefaut(): Observable<any> {
  //   if (MockModeleEvenementService.VALEURS_PAR_DEFAUT){
  //       return Observable.of(MockModeleEvenementService.VALEURS_PAR_DEFAUT);
  //   }
  //
  //   return Observable.of(EvenementCte.VALEURS_PAR_DEFAUT).map(response => {
  //     MockModeleEvenementService.VALEURS_PAR_DEFAUT = response;
  //     return Observable.of(MockModeleEvenementService.VALEURS_PAR_DEFAUT);
  //   });
  // }

}
