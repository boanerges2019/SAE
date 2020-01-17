import { Injectable } from '@angular/core';
import { Headers, RequestOptions, RequestMethod, Http, ResponseOptions, URLSearchParams } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import * as moment from 'moment';

// TODO à supprimer
import { JOURNAUX } from './mocks/mock-journaux';
import { MessageJournalActivite } from '../../../shared/models/generic/models';
import { environment } from '../../../../environments/environment';


export class FiltreJournalActivite {
  static CHAMPS_SIMPLE = ['nature', 'description', 'etat', 'equipement', 'localisation', 'operateur', 'poste'];
  static COLONNES = ['NATURE', 'DESCRIPTION', 'ETAT', 'EQUIPEMENT', 'LOCALISATION', 'OPERATEUR', 'POSTE'];
  static COLONNE_HORODATE_DEBUT = 'debut';
  static COLONNE_HORODATE_FIN = 'fin';
  static FORMAT_FILTRE_HD = 'DD/MM/YYYY HH:mm:ss';

  nature?: string;
  description?: string;
  etat?: string;
  equipement?: string;
  localisation?: string;
  operateur?: string;
  poste?: string;
  horodateDebut?: Date;
  horodateFin?: Date;

}



@Injectable()
export class JournauxService {

  static RESTSQL_BASE_URL = `${environment.apiUrl}/agorav2/sql`;


  constructor(private http: Http) {

  }


  /**
  * @return l'ensemble des données d'affichage.
  */
  getJournaux(start?: number, end?: number): Observable<any[]> {
    let data: any[] = [];
    start = start || 0;
    end = end || 20;
    start = start > JOURNAUX.length ? start = JOURNAUX.length : start;
    end = end > JOURNAUX.length ? end = JOURNAUX.length : end;
    for (let i = start; i < end; i++) {
      data.push(JOURNAUX[i])
    }
    return Observable.of(data);
  }




  getJournalActivite(filtre?: FiltreJournalActivite, offset?: number, limit?: number): Observable<any> {
    const nomMethode = 'getJournalActivite';

    // Construction de l'url

    const urlSimple = `${JournauxService.RESTSQL_BASE_URL}/res/journal_activite`;
    const urlFiltrageHorodate = `${JournauxService.RESTSQL_BASE_URL}/res/journal_activite_filtre`;
    let url = urlSimple;

    let queryParameters = new URLSearchParams();
    // On demande un format json
    queryParameters.append('_output', 'application/json');

    // Fenêtrage de récupération des données
    if (offset !== undefined && limit !== undefined) {
      queryParameters.append('_limit', '' + limit);
      queryParameters.append('_offset', '' + offset);
    }

    // Filtrage si besoin
    if (filtre) {
      // Gestion des filtres simples
      let idx: number = 0;
      for (idx = 0; idx < FiltreJournalActivite.CHAMPS_SIMPLE.length; idx++) {
        const champs = FiltreJournalActivite.CHAMPS_SIMPLE[idx];
        const colonne = FiltreJournalActivite.COLONNES[idx];
        if (filtre[champs]) {
          queryParameters.append(colonne, filtre[champs]);
        }
      }

      // Gestion du filtre sur les horodates
      if (filtre.horodateDebut) {
        let m1 = moment(filtre.horodateDebut);
        let m2;
        if (filtre.horodateFin) {
          m2 = moment(filtre.horodateFin);
        } else {
          m2 = moment(filtre.horodateDebut).add(1, 'minutes');
        }
        queryParameters.append(FiltreJournalActivite.COLONNE_HORODATE_DEBUT, m1.format(FiltreJournalActivite.FORMAT_FILTRE_HD));
        queryParameters.append(FiltreJournalActivite.COLONNE_HORODATE_FIN, m2.format(FiltreJournalActivite.FORMAT_FILTRE_HD));
        url = urlFiltrageHorodate;
      }
    }

    const options = new RequestOptions();
    options.params = queryParameters;

    return this.http.get(url, options)
      .map(response => response.json());

  }




  getDataHistorique(
    urlSansFiltreHorodate: string,
    urlFiltreHorodate: string,
    filtre?: FiltreJournalActivite,
    offset?: number,
    limit?: number): Observable<any> {
    const nomMethode = 'getJournalActivite';

    // Construction de l'url

    const urlSimple = `${JournauxService.RESTSQL_BASE_URL}/${urlSansFiltreHorodate}`;
    const urlFiltrageHorodate = `${JournauxService.RESTSQL_BASE_URL}/${urlFiltreHorodate}`;
    let url = urlSimple;

    let queryParameters = new URLSearchParams();
    // On demande un format json
    queryParameters.append('_output', 'application/json');

    // Fenêtrage de récupération des données
    if (offset !== undefined && limit !== undefined) {
      queryParameters.append('_limit', '' + limit);
      queryParameters.append('_offset', '' + offset);
    }

    // Filtrage si besoin
    if (filtre) {
      // Gestion des filtres
      let keyFiltre: string;
      for (keyFiltre of Object.keys(filtre)) {
        if (filtre[keyFiltre] && !keyFiltre.endsWith('_FIN_PERIODE')) {
          if (keyFiltre.endsWith('_DEBUT_PERIODE')) {
            //Filtre sur horodate
            let keyFiltreFinPeriode = keyFiltre.replace('_DEBUT_PERIODE', '_FIN_PERIODE');
            let m1 = moment(filtre[keyFiltre]);
            let m2;
            if (filtre[keyFiltreFinPeriode]) {
              m2 = moment(filtre[keyFiltreFinPeriode]);
            } else {
              m2 = moment(filtre[keyFiltre]).add(1, 'minutes');
            }
            queryParameters.append(keyFiltre, m1.format(FiltreJournalActivite.FORMAT_FILTRE_HD));
            queryParameters.append(keyFiltreFinPeriode, m2.format(FiltreJournalActivite.FORMAT_FILTRE_HD));
            url = urlFiltrageHorodate;
          } else {
            //Filtre sur colonne simple
            queryParameters.append(keyFiltre, filtre[keyFiltre]);
          }
        }
      }

      const options = new RequestOptions();
      options.params = queryParameters;

      return this.http.get(url, options)
        .map(response => response.json());

    }
  }

    /**
     * renvoit la liste des requêtes pouvant être extraites
     * @returns {Observable<TResult>}
     */
    public recupererLaListeDesRequetesAextraire():Observable<any> {
        let url = `${JournauxService.RESTSQL_BASE_URL}/conf/res/descriptions`;
        return this.http.get(url)
            .map(response => {
                let requetes=[];
                let requests = response.json();
                requests.forEach(req =>{
                    if(req.nomExtraction){
                        requetes.push(req);
                    }
                });
                return requetes;
            });
    }

    /**
     * extraire les données suite à l'exécution des requêtes
     * @returns {Observable<TResult>}
     */
    public extraireDonneesSuiteExecutionRequete(nomRequete:any, limit:any, offset:any, params?:any[]):Observable<any> {
        let url = `${JournauxService.RESTSQL_BASE_URL}/res/${nomRequete}?_output=application/json&_limit=${limit}&_offset=${offset}`;
        if(params){
            let stringParams="";
            for(let i=0; i < params.length; i++){
                stringParams+="&"+params[i].codeInfo+"="+params[i].value;
            }
            url+=stringParams
        }
            return this.http.get(url).map(response => response.json());
    }

    /**
     * extraire les données suite à l'exécution des requêtes
     * @returns {Observable<TResult>}
     */
    public exporterDonneesRequete(nomRequete:any, params?:any[]):Observable<any> {
        let url = `${JournauxService.RESTSQL_BASE_URL}/res/${nomRequete}?_output=application/json`;
        if(params){
            let stringParams="";
            for(let i=0; i < params.length; i++){
                stringParams+="&"+params[i].codeInfo+"="+params[i].value;
            }
            url+=stringParams
        }
        return this.http.get(url).map(response => response.json());
    }



}
