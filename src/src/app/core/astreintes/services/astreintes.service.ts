import { Component, OnInit, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Planification } from '../../../shared/models/generic/models';
/*/import * as _ from 'underscore';*/

/**
* Service de gestion des plannings d'astreinte
*/
@Injectable()
export class AstreinteService {

    static CODE_PLANIFICATION_DIFFUSION_MESSAGE_TEST = 'PLANIF-TEST-ASTREINTES';
    static BASE_URL = `${environment.apiUrl}/agorav2/rsc`;
    static PRIMITIVE_BASE_URL = `${environment.apiUrl}/agorav2/prm`;
    static PLANIFICATION_BASE_URL = `${environment.apiUrl}/agorav2/pln`;
    static CODE_GROUPE_DIFFUSION_MESSAGE_ASTREINTE = 'GRP-DIFF-0004';
    static CODE_MESSAGE_VOCAL_TEST_ASTREINTE = 'MSG-VOC-B1';
    static RESTSQL_BASE_URL = `${environment.apiUrl}/agorav2/sql`;


    private headers;
    constructor(
        private http: Http) {
        this.headers = new Headers({ 'Content-Type': 'application/json' });
    }



    /**
     * Service de récupération des planning d'astreintes
     * @param hd date du jour pour lequel on veut récupérer les astreint
     */
    public getPlanningAstreintes(multiple: boolean, hd: Date): Observable<any> {

        hd.setHours(10); //On se met à 10 heure pour éviter les problème de changement d'heure

        //Construction de l'url
        const url = `${AstreinteService.BASE_URL}/plannings_astreintes?multiple=${multiple}&horodate_debut=${hd.toISOString()}`;

        return this.http.get(url)
            .map(response => response.json());

    }


    /**
     * Service de récupération du planning d'une astreinte
     * @param hd date du jour pour lequel on veut récupérer les astreint
     */
    public getPlanningAstreinte(codeAstreinte: string, hd: Date): Observable<any> {

        hd.setHours(10); //On se met à 10 heure pour éviter les problème de changement d'heure

        //Construction de l'url
        const url = `${AstreinteService.BASE_URL}/plannings_astreintes?code_astreinte=${codeAstreinte}&horodate_debut=${hd.toISOString()}`;

        return this.http.get(url)
            .map(response => response.json());

    }



    /**
     * Service de récupération des groupes d'astreintes
     */
    public getGroupeAstreintes(): Observable<any> {

        //Construction de l'url
        const url = `${AstreinteService.BASE_URL}/groupes_astreintes`;

        return this.http.get(url)
            .map(response => response.json());

    }


    /**
     * Service de récupération des intervenants appartenant à une astreinte
     */
    public getIntervenantAstreintes(codeGroupeAstreinte: string): Observable<any> {

        //Construction de l'url
        const url = `${AstreinteService.BASE_URL}/groupes_astreintes/${codeGroupeAstreinte}/ressources?attributs_ressources=GENERIQUE.NUM_TEL_POR_1,GENERIQUE.NUM_TEL_POR_2,GENERIQUE.NUM_TEL_POR_3`;

        return this.http.get(url)
            .map(response => response.json());

    }

    /**
     * Service de récupération des intervenants appartenant à une astreinte liés à la viabilités
     */
    public getIntervenantAstreintesForVH(codeGroupeAstreinte: string): Observable<any> {
        const url = `${AstreinteService.BASE_URL}/groupes_astreintes/${codeGroupeAstreinte}/ressources`;
        return this.http.get(url).map(response => response.json());
    }


    public getPlanificationDiffusionMessageVocalTestAstreinte(): Observable<any> {

        //Construction de l'url
        const url = `${AstreinteService.PLANIFICATION_BASE_URL}/planifications/${AstreinteService.CODE_PLANIFICATION_DIFFUSION_MESSAGE_TEST}`;
        return this.http.get(url)
            .map(response => {response.json()}, error => {undefined} );
    }




    /**
     * Appeler une astreinte
     */
    public appelerAstreinte(codeGroupeAstreinte: string){
        //Construction de l'url
        const codePrimitiveAppelerAstreinte = 'ACT_APPELER_ASTREINTE';
        const url = `${AstreinteService.PRIMITIVE_BASE_URL}/modeles_primitives/${codePrimitiveAppelerAstreinte}/execute?${codePrimitiveAppelerAstreinte}.0=${codeGroupeAstreinte}`;
        return this.http.post(url,{});
    }


    /**
     * Forcer un intervenant pour une plage d'astreinte
     */
    public forcerIntervenantAstreinte(codeGroupeAstreinte: string, codeIntervenant: string, duree: number): Observable<any> {
        //Construction de l'url
        const url = `${AstreinteService.BASE_URL}/plannings_astreintes/forcer_plage_horaire?code_astreinte=${codeGroupeAstreinte}&code_ressource=${codeIntervenant}&duree=${duree}`;
        return this.http.put(url,{});
    }


    /**
     * modifier planification diffusion
     */
    public updatePlanificationDiffusion(calendrier: Planification): Observable<any> {
        //Construction de l'url
        const url = `${AstreinteService.PLANIFICATION_BASE_URL}/planifications/${AstreinteService.CODE_PLANIFICATION_DIFFUSION_MESSAGE_TEST}/mettre_a_jour`;
        return this.http.post(url,calendrier);
    }






    public getDerniereDiffusionMessageVocalTest(){

        //http://10.101.158.3:8080/api/agorav2/sql/res/dernier_diff_msg_voc_tst?_output=application/json&_limit=10&_offset=0
        const url = `${AstreinteService.RESTSQL_BASE_URL}/dernier_diff_msg_voc_tst'+
                    '?_output=application/json'+
                    '&code_groupe=${AstreinteService.CODE_GROUPE_DIFFUSION_MESSAGE_ASTREINTE}'+
                    '&code_message=${AstreinteService.CODE_MESSAGE_VOCAL_TEST_ASTREINTE}`;
        return this.http.get(url)
            .map(response =>
                    {
                        const diffs: Array<any> = response.json().diffusions;
                        if(diffs.length > 0){
                            return diffs[0];
                        }else{
                            return undefined;
                        }
                    },
                error => {return undefined;} );

    }

    public getCompteRenduDiffusionMessageVocalTest(idCommunication: number){

        //http://http://10.101.158.3:8080/api/agorav2/sql/res/cr_diff_msg_voc?_output=application/json&id_communication=10
        const url = `${AstreinteService.RESTSQL_BASE_URL}/cr_diff_msg_voc`+
                    '?_output=application/json'+
                    `&id_communication=${idCommunication}`;

        return this.http.get(url)
            .map( response => response.json().compte_rendus,
                  error => {return undefined;} );

    }


    /**
     * forcer la diffusion du message vocal de test au groupe de diffusion des astreintes
     */
    public forcerDiffusionMessageVocalTest(){
        //Construction de l'url
        const codePrimitiveDiffusionMessageVocal = 'ACT_DIFFUSER_MESSAGE';
        const url = `${AstreinteService.PRIMITIVE_BASE_URL}/modeles_primitives/${codePrimitiveDiffusionMessageVocal}/execute?`+
                    `${codePrimitiveDiffusionMessageVocal}.0=${AstreinteService.CODE_MESSAGE_VOCAL_TEST_ASTREINTE}`+
                    `${codePrimitiveDiffusionMessageVocal}.1=${AstreinteService.CODE_GROUPE_DIFFUSION_MESSAGE_ASTREINTE}`;
        return this.http.post(url,{});
    }




}
