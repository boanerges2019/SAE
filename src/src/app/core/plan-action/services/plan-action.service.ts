import { Injectable } from '@angular/core';
import { Headers, Http, ResponseOptions} from '@angular/http';
import { InterceptableHttp } from '../../../../app/shared//http/interceptable.http';
import { PlanActionWebSocketService } from './plan-action-web-socket.service';
import { Observable }  from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { PacEvenement } from '../../../../app/shared/models/generic/PacEvenement';
import { PLANS_ACTIONS } from './mock-plan-action';
import { environment } from '../../../../environments/environment';
import * as models from '../../../../app/shared/models/generic/models';


@Injectable()
export class PlanActionService {

    private baseUrl = `${environment.apiUrl}/agorav2`;  // URL to web api
    private headers;

    constructor(private planActionWebSocketService:PlanActionWebSocketService,
                private http:Http) {
        this.headers = new Headers({'Content-Type': 'application/json'});
    }


    getPlanActionFromEvenement(identifiant):Observable<PacEvenement> {
        return Observable.of(PLANS_ACTIONS);
    }


    public  getPacForEvenement(identifiantEvenement:number):Observable<any> {
        return this.http.get(`${this.baseUrl}/pac/evenement/${identifiantEvenement}`)
            .map(response => response.json());
    }

    public executerAction(identifiantEvenement:number, identifiantTheme:number, identifiantAction:number, isActionUnitaire:boolean):Observable<any> {
        if(!isActionUnitaire){
            return this.http.post(`${this.baseUrl}/pac/evenement/${identifiantEvenement}/themes/${identifiantTheme}/actions/${identifiantAction}/executer`, {}, this.headers);
        }else{
            return this.http.post(`${this.baseUrl}/cal/evenement/${identifiantEvenement}/actions/${identifiantAction}/executer`, {}, this.headers);
        }
        // .map(response => response.json());
    }

    public execAction(identifiantEvenement, identifiantTheme, identifiantAction):Observable<any> {
        return this.http.post(`${this.baseUrl}/pac/evenement/${identifiantEvenement}/themes/${identifiantTheme}/actions/${identifiantAction}/executer`, {}, this.headers);
        // .map(response => response.json());
    }

    public execActionsOfTheme(identifiantEvenement, identifiantTheme):Observable<any> {
        return this.http.post(`${this.baseUrl}/pac/evenement/${identifiantEvenement}/themes/${identifiantTheme}/executer`, {}, this.headers)
    }

    /**
     * ajouter une action unitaire à un pac
     * @param identifiantEvenement
     * @param action
     * @returns {Observable<TResult>}
     */

    public addAction(identifiantEvenement: number, action: any):Observable<any> {
        let url = `${this.baseUrl}/cal/evenement/${identifiantEvenement}/actions`;
        return this.http.put(url, action, { headers: this.headers })
            .map(response => response);
    }

    /**
     * Recupère la liste des actions unitaires de l'évènement
     * @returns {Observable<TResult>}
     */
    public getActionUnitairesByIdEvenement(identifiantEvenement:number):Observable<any>{
        let url = `${this.baseUrl}/cal/evenement/${identifiantEvenement}`;
        return this.http.get(url)
            .map(response => response.json());
    }



    /**
     * Récupère un document d'exploitation par son code infp
     */
    public getDocumentExploitation(codeDocument:string):Observable<any>{
        let url = `${this.baseUrl}/rsc/documents_exploitations/${codeDocument}/apercu`;
        return this.http.get(url);
    }

}
