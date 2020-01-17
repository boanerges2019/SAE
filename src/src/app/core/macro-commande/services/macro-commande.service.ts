import { Injectable } from '@angular/core';
import { Headers, RequestOptions, RequestMethod,  Http, ResponseOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import * as _ from 'underscore';
import { environment } from '../../../../environments/environment';
import { MacroCommandeWebsocketService } from './macro-commande-websocket.service';
import {MACRO_COMMANDES_PLANIFIES} from './mocks/macro-commande.mock';

@Injectable()
export class MacroCommandeService {

    static BASE_URL = `${environment.apiUrl}/agorav2`;  // URL to web api
    private headers;

    constructor(private http:Http, private macroCommandeWebsocketService:MacroCommandeWebsocketService) {
        this.headers = new Headers({'Content-Type': 'application/json'});
    }

    /**
     * @return l'ensemble des modeles de macros commandes
     */
    getAllModelesMacroCommandes():Observable<any> {
        return this.getModelesMacroCommandesFromBack();
    }

    /**
     * @return l'ensemble des instances de tous les modeles de macros commandes
     */
    getAllMacroCommandes():Observable<any> {
        return this.getMacroCommandesFromBack();
    }

    /**
     * Lancer un modele de macro commande, cette action crée côté back une instance de
     * macro commande de ce type de modèle
     */
    lancerMacroCommande(codeModeleMacro:string, idEvenement?:number):Observable<any> {
        let url = `${MacroCommandeService.BASE_URL}/mcr/macro_commandes/${codeModeleMacro}/lancer`;
        if(idEvenement){
            url = `${MacroCommandeService.BASE_URL}/mcr/macro_commandes/${codeModeleMacro}/lancer?id_evenement=${idEvenement}`
        }
        return this.http.post(url, {}, this.headers);
    }

    /**
     * Prend en paramètre l'id de la macro commande
     * et Recupère le détail de la macro commande
     * @param idMacroComd
     * @returns {any}
     */
    public getDetailMacroById(identifiant:number):Observable<any> {
        let url = `${MacroCommandeService.BASE_URL}/mcr/macro_commandes/${identifiant}`;
        return this.http.get(url)
            .map(response => {
                return response.json();
            });
    }

    /**
     * repondre Oui à une question dans la macro
     */
    public confirmerAction(identifiant:number, identifiantEtape:number, identifiantAction:number, commentaire:string) {
        let url = `${MacroCommandeService.BASE_URL}/mcr/macro_commandes/${identifiant}/etapes/${identifiantEtape}/actions/${identifiantAction}/confirmer`;
        return this.http.post(url, {}, this.headers);
    }

    /**
     * repondre Oui à une question dans la macro
     */
    public infirmerAction(identifiant:number, identifiantEtape:number, identifiantAction:number, commentaire:string) {
        let url = `${MacroCommandeService.BASE_URL}/mcr/macro_commandes/${identifiant}/etapes/${identifiantEtape}/actions/${identifiantAction}/infirmer`;
        return this.http.post(url, {}, this.headers);
    }

    /**
     * Suspendre l'éxecution d'une macro commande
     */
    public suspendreMacroCommande(identifiant:number) {
        let url = `${MacroCommandeService.BASE_URL}/mcr/macro_commandes/${identifiant}/suspendre`;
        return this.http.post(url, {}, this.headers);
    }

    /**
     * Reprendre l'éxecution d'une macro commande
     */
    public reprendreMacroCommande(identifiant:number) {
        let url = `${MacroCommandeService.BASE_URL}/mcr/macro_commandes/${identifiant}/reprendre`;
        return this.http.post(url, {}, this.headers);
    }

    /**
     * Interrompre une macro commande
     */
    public interrompreMacroCommande(identifiant:number) {
        let url = `${MacroCommandeService.BASE_URL}/mcr/macro_commandes/${identifiant}/interrompre`;
        return this.http.post(url, {}, this.headers);
    }

    /**
     * Recupère les macros commandes
     * de l'evenement
     * @param typeObjet
     * @param identifiantEvt
     * @returns {Observable<TResult>}
     */
    public getAllModelesMacroCommandesEvts(typeObjet:string, identifiantEvt:number):Observable<any> {
        let url = `${MacroCommandeService.BASE_URL}/mcr/resumes_macros/${typeObjet}/${identifiantEvt}`;
        return this.http.get(url)
            .map(response => {
                return response.json();
            });
    }

    public verifierPrecondition(idMacro:number, idPrerequis:number){
        let url = `${MacroCommandeService.BASE_URL}/mcr/macro_commandes/${idMacro}/preconditions/${idPrerequis}/verifier`;
        return this.http.post(url, {}, this.headers);
    }

    private getModelesMacroCommandesFromBack():Observable<any> {
        let url = `${MacroCommandeService.BASE_URL}/mcr/resumes_modeles_macros`;
        return this.http.get(url)
            .map(response => {
                return response.json();
            });
    }

    private getMacroCommandesFromBack():Observable<any> {
        let url = `${MacroCommandeService.BASE_URL}/mcr/resumes_macros`;
        return this.http.get(url)
            .map(response => {
                return response.json();
            });
    }

    /**
     * Planifier une macro.
     * @param  {string} code modele de la macro.
     * @param  {any}    data        données de planification.
     * @return {Observable<any>}
     */
    planifierMacro(codeModele: string, data: any): Observable<any>{
        const url = `${MacroCommandeService.BASE_URL}/mcr/macro_commandes/${codeModele}/planifier`;
        return this.http.post(url, data, { headers: this.headers });
    }

    /**
     * Suppression de la planification d'une macro.
     * @param  {string} code modele de la macro.
     * @return {Observable<any>}
     */
    suppressionPlanifierMacro(codeModele: string): Observable<any>{
        const url = `${MacroCommandeService.BASE_URL}/mcr/macro_commandes/${codeModele}/supprimer_planification`;
        return this.http.post(url, {}, { headers: this.headers });
    }


    private toString(num:number):string {
        if (num < 10) return `00${num}`;
        if (num < 100) return `0${num}`;
        return `${num}`;
    }


}
