import { Injectable } from '@angular/core';
import { Headers, RequestOptions, RequestMethod,  Http, ResponseOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import * as _ from 'underscore';
import { environment } from 'environments/environment';
import { CacheService} from 'app/shared/services/cache/cache.service';
import { CacheConstantes} from 'app/shared/services/cache/cache.constantes';


import { MessagesEquipementStrategie } from 'app/shared/models/generic/MessagesEquipementStrategie';
import { StrategiesService } from './strategies.service';


@Injectable()
export class EquipementService {

  private static baseUrl = `${environment.apiUrl}/agorav2`;

  constructor(
    private http: Http,
    private cacheService: CacheService
  ) { }

    public getStations(): Observable<any> {
        let url = `${EquipementService.baseUrl}/eqt/equipements?types=SME0`;
        return this.http.get(url).map(response =>  response.json().equipements);
    }

    public getVariablesSaeConnexion(identifiantEqt:any):Observable<any> {
        let url = `${EquipementService.baseUrl}/eqt/equipements/${identifiantEqt}/valeurs_variables?types_variables=SAE0.DPR.ETAT_ACTIF`;
        return this.http.get(url).map(response =>  response.json());
    }

    public getVariablesSsccConnexion():Observable<any> {
        let url = `${EquipementService.baseUrl}/eqt/equipements?types=SSC0`;
        return this.http.get(url).map(response =>  _.values(response.json().equipements));
    }

    public getVariablesForVehicles():Observable<any> {
        let url = `${EquipementService.baseUrl}/eqt/equipements?types=GEO0`;
        return this.http.get(url).map(response => response.json().equipements);
    }


}
