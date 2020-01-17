import { Injectable } from '@angular/core';
import { Headers, RequestOptions, RequestMethod,  Http, ResponseOptions, ResponseContentType } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import * as _ from 'underscore';
import { environment } from 'environments/environment';
import { BaseService } from 'app/core/evenement/services/base.service';
import { FieldBulletinsCte } from 'app/core/bulletins/constantes/field-bulletins.constante';
import { CacheService } from 'app/shared/services/cache/cache.service';
import { CacheConstantes } from 'app/shared/services/cache/cache.constantes';

// TODO à supprimer
import { BULLETINS } from './mock/bulletins-mock';

@Injectable()
export class BulletinsService {

    public static baseUrl = `${environment.apiUrl}/agorav2`;

    private headers;

    evenements:any[]=[];
    bulletins:any[]=[];

    constructor(private http:Http, public evenementService:BaseService, public cacheService : CacheService) {
        this.headers = new Headers({'Content-Type': 'application/json'});
        this.getEvenements();
       // this.getBulletinsModeles();
    }

    private getEvenements() {
        this.evenementService.getResumes(FieldBulletinsCte.EVT_EVT).subscribe(response => {
                    if (response) {
                        let states = [];
                        states.push(FieldBulletinsCte.ETATS_EVENEMENT.enCours);
                        this.evenements = this.getEvenementsByEtat(states, response);
                        this.evenements.map((evt) =>{
                            evt.id = evt.identifiant;
                            evt.text = evt.identifiant +" - "+ evt.nom;
                        });
                    }
                }, error => { },
                () => {

                });
    }

    public getResumeEvenements():Observable<any>{
        return Observable.of(this.evenements);
    }

    public getEvenementsByEtat(etats:string[], allEvenements:any):any[] {
        return allEvenements.filter(evenement => etats.indexOf(evenement.codeEtat) > -1);
    }


    /**
     * renvoit tous les bulletins
     * @returns {Observable<TResult>}
     */
    public getTousLesModelesDocuments():Observable<any> {
        return this.http.get(`${BulletinsService.baseUrl}/blt/modeles_documents`)
            .map(response => _.values(response.json()));
    }

    /*private getBulletinsModeles(){
        this.getTousLesModelesDocuments().subscribe(response => {
            this.bulletins = response;
            this.cacheService.setObject(CacheConstantes.BULLETINS, response);
        });
    }*/
    /**
     * renvoit tous les bulletins
     * @returns {Observable<TResult>}
     */
    public recupereTousLesModelesDocuments():Observable<any> {
        this.bulletins = this.cacheService.getObject(CacheConstantes.BULLETINS)
        if(!this.bulletins){
            this.getTousLesModelesDocuments().subscribe(response => {
                this.bulletins = response;
                this.cacheService.setObject(CacheConstantes.BULLETINS, response);
                return Observable.of(this.bulletins);
            });
        }
        return Observable.of(this.bulletins);
    }

    /**
     * renvoit un modèle document
     * @param identifiant
     * @returns {Observable<TResult>}
     */
    public recupereUnModeleDocumentParSonIdentifiant(identifiant:number):Observable<any> {
        return this.http.get(`${BulletinsService.baseUrl}/blt/modeles_documents/${identifiant}`)
            .map(response => response.json());
    }

    /**
     * renvoit la liste des préparations envoi
     * @returns {Observable<TResult>}
     */
    public recupereLaListeDesPreparationsEnvois(type_objet?:string, identifiant_objet?:number):Observable<any> {
        let url = `${BulletinsService.baseUrl}/blt/preparations_envois`;
        if(type_objet && identifiant_objet){
            url = `${BulletinsService.baseUrl}/blt/preparations_envois?type_objet=${type_objet}&identifiant_objet=${identifiant_objet}`;
        }
        return this.http.get(url)
            .map(response => response.json());
    }

    /**
     * renvoit la liste des bulletins emis
     * @returns {Observable<TResult>}
     */
    public recupereLaListeDesBulletinsEmis(idEvenement?:number):Observable<any> {
        let url = `${BulletinsService.baseUrl}/sql/res/document_envoye?_output=application/json`;
        if(idEvenement){
            url = `${BulletinsService.baseUrl}/sql/res/document_envoye?_output=application/json&ID_DYN_EVENEMENT=${idEvenement}`;
        }
        return this.http.get(url)
            .map(response => {
                    let bulletinsEmis : any[] = [];
                    let documents : any[] = response.json().documents;
                    if(documents && documents.length > 0){
                        documents.forEach(doc => {
                            let bulletin = {
                                identifiant:doc.ID_COMMUNICATION,
                                nom:doc.NOM_MODELE_DOCUMENT,
                                dateEnvoi:doc.HORODATE,
                                codeMedia:doc.CODE_MEDIA,
                                codeFormat:doc.CODE_FORMAT,
                                nomRessourceDestinataire:doc.NOM_RESSOURCE_DESTINATAIRE,
                                nomGroupeDestinataire:doc.NOM_GROUPE_DESTINATAIRE,
								statutEnvoi:doc.ETAT_REUSSITE_ENVOI
                            };
                            bulletinsEmis.push(bulletin);
                        });
                    }
                    return bulletinsEmis;
                });
    }

    /**
     * renvoit la liste de toutes les communications pour
     * un evenement donné.
     * @returns {Observable<TResult>}
     */
    public recupereLaListeDeToutesLesCommunicationsPourUnEvenement(idEvenement:number):Observable<any> {
        let url = `${BulletinsService.baseUrl}/sql/res/communication_evenement?_output=application/json&id_evenement=${idEvenement}`;
        return this.http.get(url)
            .map(response => {
                let documentations : any[] = [];
                let documents : any[] = response.json().documents;
                if(documents && documents.length > 0){
                    documents.forEach(doc => {
                        let documentation = {
                            identifiant:doc.ID_COMMUNICATION,
                            nom:doc.DESCRIPTION,
                            date:doc.HORODATE,
                            codeMedia:doc.CODE_MEDIA,
                            codeFormat:doc.CODE_FORMAT,
                            nomRessourceDestinataire:doc.NOM_RESSOURCE_DESTINATAIRE,
                            nomGroupeDestinataire:doc.NOM_GROUPE_DESTINATAIRE,
                            type:doc.TYPE_COMMUNICATION,
                            isSelect:false
                        };
                        documentations.push(documentation);
                    });
                }
                return documentations;
            });
    }

    /**
     * renvoit la liste des comptes rendues
     * d'un message vocal
     * @returns {Observable<TResult>}
     */
    public recupereLeCompteRenduPourUnMessageVocal(idComm:number):Observable<any> {
        let url = `${BulletinsService.baseUrl}/sql/res/cr_diff_msg_voc?_output=application/json&id_communication=${idComm}`;
        return this.http.get(url)
            .map(response => {
                let crs : any[] = [];
                let documents : any[] = response.json().compte_rendus;
                if(documents && documents.length > 0){
                    documents.forEach(doc => {
                        let cr = {
                            identifiant:doc.ID_COMMUNICATION,
                            intitule:doc.NOM_ASTREINTE_DESTINATAIRE,
                            nomRessourceDestinataire:doc.NOM_RESSOURCE_DESTINATAIRE,
                            nomGroupeDestinataire:doc.NOM_GROUPE_DESTINATAIRE,
                            date_1:doc.HORODATE_PREMIER,
                            nbrAppel:doc.NOMBRE_TENTATIVE,
                            statut:doc.STATUT,
                            date_2:doc.HORODATE_DERNIER
                        };
                        crs.push(cr);
                    });
                }
                return crs;
            });
    }

    /**
     * renvoit une préparation envoi
     * @returns {Observable<TResult>}
     */
    public recupereUnePreparationEnvoiParSonIdentifiant(identifiant:number):Observable<any> {
        return this.http.get(`${BulletinsService.baseUrl}/blt/preparations_envois/${identifiant}`)
            .map(response => response.json());
    }

    /**
     * Creer ou met à jour une preparation d'envoi
     * @param preparationEnvoi
     * @returns {Observable<Response>}
     */
    public creationOuMiseAjourPreparationEnvoi(preparationEnvoi:any): Observable<any>{
        const url = `${BulletinsService.baseUrl}/blt/preparation_envoi`;
        return this.http.put(url, preparationEnvoi, { headers: this.headers });
    }

    /**
     * Avoir l'apercu d'une preparation d'envoi
     * @param identifiant
     * @returns {Observable<TResult>}
     */
    public recupereApercuPreparationEnvoiParSonIdentifiant(identifiant:number):Observable<any> {
        const options = {responseType: ResponseContentType.ArrayBuffer};
        let url = `${BulletinsService.baseUrl}/blt/preparations_envois/${identifiant}/apercu`;
        return this.http.get(url, options);
    }

    /**
     * Avoir l'apercu d'un bulletin émi
     * @param identifiant
     * @returns {Observable<TResult>}
     */
    public recupereApercuBulletinsEmisParSonIdentifiant(identifiant:number):Observable<any> {
        const options = {responseType: ResponseContentType.ArrayBuffer};
        let url = `${BulletinsService.baseUrl}/blt/documents_envoyes/${identifiant}/apercu`;
        return this.http.get(url, options);
    }


    /**
     * Emettre d'une preparation d'envoi
     * @param identifiant
     * @returns {Observable<TResult>}
     */
    public emettrePreparationEnvoiParSonIdentifiant(identifiant:number):Observable<any> {
        return this.http.post(`${BulletinsService.baseUrl}/blt/preparations_envois/${identifiant}/emettre`, {});

    }

    /**
     * Supprimer une preparation d'envoi
     * @param identifiant
     * @returns {Observable<TResult>}
     */
    public supprimerPreparationEnvoiParSonIdentifiant(identifiant:number):Observable<any> {
        return this.http.post(`${BulletinsService.baseUrl}/blt/preparations_envois/${identifiant}/supprimer`, {});
    }

    /**
     * Planifier une preparation d'envoi
     * @param identifiant
     * @returns {Observable<TResult>}
     */
    public planifierPreparationEnvoiParSonIdentifiant(preparationEnvoi:any):Observable<any> {
        return this.http.post(`${BulletinsService.baseUrl}/blt/preparations_envois/${preparationEnvoi.identifiant}/planifier`, preparationEnvoi.planification);
    }

    /**
     * Supprimer une planification d'une preparation d'envoi
     * @param identifiant
     * @returns {Observable<TResult>}
     */
    public supprimerPlanificationPreparationEnvoiParSonIdentifiant(identifiant:number):Observable<any> {
        return this.http.post(`${BulletinsService.baseUrl}/blt/preparations_envois/${identifiant}/supprimer_planification`, {});
    }
}
