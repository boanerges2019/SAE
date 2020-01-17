import { Injectable } from '@angular/core';
import { Headers, RequestOptions, RequestMethod,  Http, ResponseOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import * as _ from 'underscore';
import { environment } from 'environments/environment';

@Injectable()
export class ViabilitesHivernalesService {

  private static BASE_URL = `${environment.apiUrl}/agorav2`;
  private headers;

  constructor(private http: Http) {
      this.headers = new Headers({ 'Content-Type': 'application/json'});
  }

  /**
  * @return récupère l'ensemble des circuits.
  */
  public recupereCircuits(): Observable<any>{
    return this.http.get(`${ViabilitesHivernalesService.BASE_URL}/vh/circuits`)
      .map(response => response.json());
  }

  /**
  * Met à jour états circuits.
  * @param circuits
  */
  public mettreAjourEtatsCircuits(circuits:any): Observable<any>{
    const url = `${ViabilitesHivernalesService.BASE_URL}/vh/circuits/mettre_a_jour`;
    return this.http.post(url, circuits, { headers: this.headers });
  }

    /**
     * Envoi réseau.
     */
    public envoiReseau(): Observable<any>{
        const url = `${ViabilitesHivernalesService.BASE_URL}/vh/serpe/emettre_reseau_vh`;
        return this.http.post(url, {});
    }

    /**
     * Envoi données.
     */
    public envoiDonnees(): Observable<any>{
        const url = `${ViabilitesHivernalesService.BASE_URL}/vh/serpe/emettre_donnees_vh`;
        return this.http.post(url, {});
    }


}
