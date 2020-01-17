import { Injectable } from '@angular/core';
import { Headers, RequestOptions, RequestMethod,  Http, ResponseOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import * as _ from 'underscore';
import { environment } from 'environments/environment';
import { StrategiesWebsocketService } from './strategies-websocket.service';
import { Strategie } from 'app/shared/models/generic/Strategie';
import { ModeleStrategie } from 'app/shared/models/generic/ModeleStrategie';
import { EquipementService } from './equipement.service';
import { ResumeStrategie } from 'app/shared/models/generic/ResumeStrategie';
import { MessagesEquipementStrategie } from 'app/shared/models/generic/MessagesEquipementStrategie';

@Injectable()
export class StrategiesService {

  private static BASE_URL = `${environment.apiUrl}/agorav2/str`;
  private headers;

  constructor(
    private http: Http,
    private strategiesWebsocketService: StrategiesWebsocketService) {
      this.headers = new Headers({ 'Content-Type': 'application/json'});
  }

  /**
  * @return l'ensemble des stratgies d'affichage.
  */
  getMessagesEquipements(): Observable<MessagesEquipementStrategie[]>{
    return this.http.get(`${StrategiesService.BASE_URL}/messages_equipements`)
      .map(response => {
        return _.values(response.json().messagesEquipements);
      });
  }


 /**
  * Instancie une strategie.
  * @param  {number}                identifiant du modeleStrategie
  * @param  {[type]}                idEvenement [description]
  * @return {Observable<Strategie>}             [description]
  */
  instantiateStrategie(identifiant: number, idEvenement): Observable<Strategie>{
    let url = `${StrategiesService.BASE_URL}/modeles_strategies/${identifiant}/instancier?activer=false`;
    if (idEvenement) url = `${url}&id_evenement=${idEvenement}&dupliquer=false`;
    else url = `${url}&dupliquer=true`;
    return this.http.put(url, {}, { headers: this.headers })
      .flatMap(response => {
        return this.http.get(response.headers.get("location"))
          .map(response2 => {
            return response2.json();
          });
      });
  }

  /**
  * @return l'ensemble des strategies d'affichage.
  */
  getResumesStrategies(): Observable<ResumeStrategie[]>{
    return this.http.get(`${StrategiesService.BASE_URL}/resumes_strategies`)
      .map(response => {
        return response.json();
      });
  }



  /**
  * Récupère la strategié dont l'identifiant est passé" en paramètre."
  * @param identifiant de la strategie.
  * @return l'ensemble des strategies d'affichage.
  */
  getStrategie(identifiant): Observable<any>{
    return this.http.get(`${StrategiesService.BASE_URL}/strategies/${identifiant}`)
      .map(response => {
        return response;
      });
  }

  /**
  * Change l'état d'une strategie.
  * @param identifiant
  * @param param
  */
  toogleState(identifiant: number, param: string): Observable<Strategie>{
    const url = `${StrategiesService.BASE_URL}/strategies/${identifiant}/${param}`;
    return this.http.post(url, {}, { headers: this.headers });
  }

  /**
  * Met à jour une strategie.
  * @param strategie
  */
  updateStrategie(strategie): Observable<Strategie>{
    const url = `${StrategiesService.BASE_URL}/strategies`;
    return this.http.post(url, {}, { headers: this.headers });
  }

  /**
  * Supprime une strategie.
  * @param strategie
  */
  removeStrategie(identifiant: number): Observable<any>{
    const url = `${StrategiesService.BASE_URL}/strategies/${identifiant}/supprimer`;
    return this.http.post(url, {}, { headers: this.headers });
  }

  /**
  * Ajoute ou met à jour un message dans une strategie.
  * @param identifiant
  * @param code equipement
  * @param message équipement
  */
  addOrUpdateMessage(identifiant: number, code: any, message: any): Observable<any>{
    const url = `${StrategiesService.BASE_URL}/strategies/${identifiant}/${code}/ajouter`;
    return this.http.post(url, message, { headers: this.headers });
                    //.map(response => { return response});
  }

  /**
  *Supprime un message dans une strategie.
  * @param identifiant
  * @param code equipement
  */
  removeMessage(identifiant: number, code: any): Observable<any>{
    const url = `${StrategiesService.BASE_URL}/strategies/${identifiant}/${code}/supprimer`;
    return this.http.post(url, {}, { headers: this.headers });
  }


   /**
    * Change la priorité de la stratégie.
    * @param  {number}          identifiant de la stratégie e
    * @param  {number}          value       1 ou -1
    * @return {Observable<any>}
    */
    movePriority(identifiant: number, value: number): Observable<any>{
      const url = `${StrategiesService.BASE_URL}/strategies/${identifiant}/maj_priorite?increment=${value} `;
      return this.http.post(url, {}, { headers: this.headers });
    }

    /**
     * Planifier une strategie.
     * @param  {number} identifiant de la strategie.
     * @param  {any}    data        données de planification.
     * @return {Observable<any>}
     */
    plan(identifiant: number, data: any): Observable<any>{
         const url = `${StrategiesService.BASE_URL}/strategies/${identifiant}/planifier`;
         return this.http.post(url, data, { headers: this.headers });
    }
}
