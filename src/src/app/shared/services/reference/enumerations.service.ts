import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Headers, RequestOptions, RequestMethod,  Http, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import * as _ from 'underscore';
import { environment } from '../../../../environments/environment';
import { CacheService} from '../../../../app/shared/services/cache/cache.service';
import { CacheConstantes} from '../../../../app/shared/services/cache/cache.constantes';


@Injectable()
export class EnumerationsService {

  private subscriptions: Subscription[] = [];

  public static BASE_URL = `${environment.apiUrl}/agorav2`;  // URL to web api

  constructor(
    private http: Http,
    private cacheService: CacheService
  ) { }


    /**
    * @return l'ensembles des enumerations.
    */
    getEnumerations(codeEnumeration: string): Observable<any[]> {
      let data: any[] = this.cacheService.getObject(CacheConstantes.ENUMERATIONS);
      if (data && data.length > 0) {
        data = codeEnumeration ? data.filter(item => item.codeEnumeration === codeEnumeration) : data;
        return Observable.of(data);
      }

      let url = `${EnumerationsService.BASE_URL}/core/enumerations`;
      return this.http.get(url)
        .map(response => {
          data = _.values(response.json().valeursEnumerations);
          this.cacheService.setObject(CacheConstantes.ENUMERATIONS, data);
          data = codeEnumeration ? data.filter(item => item.codeEnumeration === codeEnumeration) : data;
          return data;
        });
    }

  /**
  * @return l'ensembles des enumerations.
  */
  getValeursEnumerations(codeEnumeration: string): Observable<any[]> {
    let data: any[] = this.cacheService.getObject(CacheConstantes.VALEURS_ENUMERATIONS);
    if (data && data.length > 0) {
      data = codeEnumeration ? data.filter(item => item.codeEnumeration === codeEnumeration) : data;
      return Observable.of(data);
    }

    let url = `${EnumerationsService.BASE_URL}/core/valeurs_enumerations`;
    return this.http.get(url)
      .map(response => {
        data = _.values(response.json().valeursEnumerations);
        this.cacheService.setObject(CacheConstantes.VALEURS_ENUMERATIONS, data);
        data = codeEnumeration ? data.filter(item => item.codeEnumeration === codeEnumeration) : data;
        return data;
      });
  }

    /**
     * @return l'ensembles des valeurs d'enumérations possibles
     * pour un codeinfo d'énumération.
     */
    public getValeursPossiblesByCodeInfoEnumerations(codeInfoEnumeration: string): Observable<any[]> {
        let data: any[] = this.cacheService.getObject(codeInfoEnumeration+"_ENUMERATIONS");
        if(!data){
            let url = `${EnumerationsService.BASE_URL}/core/enumerations/${codeInfoEnumeration}`;
            return this.http.get(url)
                .map(response => {
                    this.cacheService.setObject(codeInfoEnumeration+"_ENUMERATIONS", _.values(response.json().valeursEnumerations));
                    return _.values(response.json().valeursEnumerations);
                });
        }
        return Observable.of(data);
    }

    /**
     * @return l'ensembles des valeurs de requetes possibles
     * pour un codeinfo d'énumération.
     */
    public getValeursPossiblesByCodeInfoRequetes(codeInfoRequete: string): Observable<any[]> {
        let data: any[] = this.cacheService.getObject(codeInfoRequete+"_VALEURS_REQUETES");
        if(!data){
            let url = `${EnumerationsService.BASE_URL}/core/valeurs_possibles/${codeInfoRequete}/resultats_requete`;
            return this.http.get(url)
                .map(response => {
                    let array = [];
                    for(const key in response.json()){
                        array.push({
                            codeInfo:key,
                            valeur: response.json()[key],
                            nom: response.json()[key],
                            description: response.json()[key],
                            identifiant: key
                        });
                    }
                    this.cacheService.setObject(codeInfoRequete+"_VALEURS_REQUETES", array);
                    return array;
                });
        }
        return Observable.of(data);

    }

    /**
     * @return l'ensembles des valeurs possibles.
     */
    public getValeursPossibles(codeValeurPossible?: string): Observable<any[]> {
        let data: any[] = this.cacheService.getObject(codeValeurPossible+"_VALEURS_POSSIBLES");
        if(!data){
            let dataGlobal: any[] = this.cacheService.getObject(CacheConstantes.VALEURS_POSSIBLES);
            if(!dataGlobal){
                let url = `${EnumerationsService.BASE_URL}/core/valeurs_possibles`;
                return this.http.get(url)
                    .map(response => {
                        dataGlobal = _.values(response.json().valeursPossibles);
                        this.cacheService.setObject(CacheConstantes.VALEURS_POSSIBLES, dataGlobal);
                        let valeurs_possibles = _.values(response.json().valeursPossibles);
                        valeurs_possibles = codeValeurPossible ? valeurs_possibles.filter(item => item.codeInfo === codeValeurPossible) : valeurs_possibles;
                        this.cacheService.setObject(codeValeurPossible+"_VALEURS_POSSIBLES", valeurs_possibles);
                        return valeurs_possibles;
                    });
            }else{
                let valeurs_possibles = dataGlobal;
                valeurs_possibles = codeValeurPossible ? valeurs_possibles.filter(item => item.codeInfo === codeValeurPossible) : valeurs_possibles;
                this.cacheService.setObject(codeValeurPossible+"_VALEURS_POSSIBLES", valeurs_possibles);
                return Observable.of(valeurs_possibles);
            }

        }
        return Observable.of(data);
    }



    /**
     * Recupère la liste de tous les types de primitives
     * du systeme SAE.
     */
    public getModelesPrimitivesActionsUnitaires(): Observable<any> {
        let url = `${EnumerationsService.BASE_URL}/prm/modeles_primitives?domaines=CDE_UNITAIRE`;
        return this.http.get(url)
            .map(response => {
                return response.json();
            });
    }


}
