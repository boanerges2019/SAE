import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Headers, Http, ResponseOptions, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { InterceptableHttp } from '../../../../app/shared//http/interceptable.http';
import { EventManager } from '../../../../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../../app/shared/services/constantes/event-manager.constantes';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as _ from 'underscore';
import { AlerteWebsocketService } from '../../../../app/core/alerte/services/alerte-websocket.service';
import { AlerteCte } from '../../../../app/core/alerte/constantes/alerte.constantes';
import { environment } from '../../../../environments/environment';
import { Alerte } from '../../../../app/shared/models/generic/Alerte';
import { ALERTES, JOURNAL_ALERTES } from './mock-alertes';
import { FieldAlerteCte } from '../../../../app/core/alerte/constantes/field-alerte.constantes';
import { ConfigGenerale } from '../../../../app/shared/services/config/config.generale';
import { SessionSae } from '../../../shared/models/generic/SessionSae';




@Injectable()

export class AlerteService {

    private baseUrl = `${environment.apiUrl}/agorav2/alrt`;  // URL to web api
    private baseUrlPPO = `${environment.apiUrl}/agorav2/ppo`;  // URL to web api
    private baseUrlPRM = `${environment.apiUrl}/agorav2/prm`;  // URL to web api
    private headers;

    constructor(private alerteWebsocketService: AlerteWebsocketService,
        private http: Http) {
        this.headers = new Headers({ 'Content-Type': 'application/json' });
    }

    /**
     * Récupère la liste des alertes "A TRAITER"
     */
    public getAlertes(): Observable<any> {
        const nomMethode = 'AlerteService.getAlertes';
        console.debug(nomMethode + ' : début');

        const url = `${this.baseUrl}/resumes_alertes`;
        return this.http.get(url)
            .map((response) => {
                let data = response.json().resumesAlertes;
                let res = [];
                for (const key in data) {
                    res.push(data[key]);
                }
                console.debug(nomMethode + ' <' + res.length + '> résumés d\'alerte');
                res = res.filter(item => item.codeEtat === AlerteCte.ETATS.aTraiter);
                console.debug(nomMethode + ' <' + res.length + '> résumés d\'alerte "à traiter"');
                return res;
            });
    }


    /**
     * Récupère la liste des alertes
     */
    public getJournalAlertes(): Observable<any> {
        const url = `${this.baseUrl}/resumes_alertes`;
        return this.http.get(url)
            .map((response) => {
                let data = response.json().resumesAlertes;
                let res = [];
                for (const key in data) {
                    res.push(data[key]);
                }
                return res;
            });
    }

    /**
     * Récupère une alerte.
     * @param identifiant de l'alerte.
     */
    public getAlerte(identifiant): Observable<any> {
        const url = `${this.baseUrl}/resumes_alertes/${identifiant}`;
        return this.http.get(url).map(response => response.json());

    }


    /**
     * Change l'état d'une alerte.
     * @param alerte
     * @param etatAlerte état cible
     */
    public changeAlertState(alerte: Alerte, etatAlerte: string, linkWithEvenement?: number, typeEvenement?: string): Observable<Response> {
        let url = `${this.baseUrl}/alertes/${alerte.identifiant}/changer_etat?etatAlerte=${etatAlerte}`;
        if (linkWithEvenement) {
            url += `&identifiantEvenement=${linkWithEvenement}`
        }
        if (typeEvenement) {
            url += `&codeTypeEvenement=${typeEvenement}`
        }
        return this.http.put(url, alerte, { headers: this.headers })
            .map(response => response);
    }

    /**
     * Renvoie la liste des alertes liées à un événement.
     * @param  {number} identifiant de l'événement.
     * @return {[type]}             la liste des alertes liées à un événement.
     */
    public getAlertesLiees(identifiant: number) {
        const url = `${this.baseUrl}/resumes_alertes_evenement/${identifiant}`;
        return this.http.get(url)
            .map((response) => {
                return _.values(response.json().resumesAlertes);
            });
    }

    /**
     * Localisation d'une alerte
     * @param identifiant
     */
    public localiserAlerte(poste: string, codeEqt: string) {

        const nomMethode = 'localiserAlerte';
        console.debug(nomMethode + ' : poste='+poste+' codeEqt='+codeEqt);


        const url = `${this.baseUrlPRM}/modeles_primitives/ACT_AFFICHER_EQUIPEMENT/execute`;

        let queryParameters = new URLSearchParams();

        //'ACT_AFFICHER_EQUIPEMENT.0'    code poste operateur
        //'ACT_AFFICHER_EQUIPEMENT.1'	 Type de commande
        //'ACT_AFFICHER_EQUIPEMENT.2'	 Code info équipement
        queryParameters.append('ACT_AFFICHER_EQUIPEMENT.0', poste);
        queryParameters.append('ACT_AFFICHER_EQUIPEMENT.1', 'ACT_TER_SSCC_PCC0_AFFICHAGE_EQP');
        queryParameters.append('ACT_AFFICHER_EQUIPEMENT.2', codeEqt);
        const options = new RequestOptions();
        options.params = queryParameters;

        return this.http.post(url, {}, options).map(response => response);
    }

    /**
     * visualisation d'une alerte
     * @param identifiant
     */
    public visualiserAlert(identifiant: number) {
        const url = `${this.baseUrlPPO}/visualiser/alerte/${identifiant}`;
        return this.http.post(url, {}, { headers: this.headers }).map(response => response);
    }
}
