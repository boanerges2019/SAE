import { Injectable } from '@angular/core';
import { Headers, RequestOptions, RequestMethod,  Http, ResponseOptions } from '@angular/http';
import { InterceptableHttp } from '../../../../app/shared//http/interceptable.http';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import * as _ from 'underscore';
import * as moment from 'moment';
import { environment } from '../../../../environments/environment';
import { Evenement } from '../../../../app/shared/models/generic/Evenement';
import { ResumeEvenement } from '../../../../app/shared/models/generic/ResumeEvenement';
import { Localisant } from '../../../../app/shared/models/generic/Localisant';
import { ConfigGenerale } from '../../../../app/shared/services/config/config.generale';

/**
* Service de gestion des événements.
*/
@Injectable()
export class GroupeService {

  static BASE_URL = `${environment.apiUrl}/cesam2/evt`;  // URL to web api
  private headers;
  constructor(
    private http: Http) {
    this.headers = new Headers({ 'Content-Type': 'application/json'});
  }


  /**
  * Service de création d'un groupe
  * @param data les donées nécéssaires à la création du groupe.
  */
  public createGroupe(data: any): Observable<any>{
    const url = `${GroupeService.BASE_URL}/groupe_evenement`;
    return this.http.put(url, data, { headers: this.headers })
      .map(response => response);
  }

  /**
  * Service de récupération d'un groupe
  * @param identifiant id du groupe.
  */
  public getGroupe(identifiant: number): Observable<any> {
    const url = `${GroupeService.BASE_URL}/groupes_evenements/${identifiant}`;
    return this.http.get(url)
        .map(response => response.json());
  }

  /**
  * Service de maj d'un groupe
  * @param dataGroupe les donées nécéssaires à la maj du groupe.
  */
  public updateGroupe(dataGroupe): Observable<any>{
    const url = `${GroupeService.BASE_URL}/groupe_evenement/${dataGroupe.identifiant}`;
    return this.http.put(url, dataGroupe, { headers: this.headers })
      .map(response => response);
  }

  /**
  * Service de renomage d'un groupe
  * @param dataGroupe les donées nécéssaires au renomage du groupe.
  */
  public renameGroupe(dataGroupe): Observable<any>{
    const url = `${GroupeService.BASE_URL}/groupe_evenement/${dataGroupe.identifiant}/${dataGroupe.params}`;
    return this.http.put(url, {}, { headers: this.headers })
      .map(response => response);
  }
}
