import { Component, OnInit } from '@angular/core';
import { EventManager } from '../../../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../app/shared/services/constantes/event-manager.constantes';
import { Subscription } from 'rxjs/Rx';
import {LoginService} from '../../../app/core/login/services/login.service'
import { NotesInfosService } from '../../../app/core/notes-infos/services/notes-infos.service';
import {BandeauService} from '../../../app/partials/bandeau/services/bandeau.service'
import { MacroCommandeService } from '../../../app/core/macro-commande/services/macro-commande.service';
import * as _ from 'underscore';

import { NotesInfosWebSocketService } from '../../../app/core/notes-infos/services/notes-infos-web-socket.service';
import {BandeauWebsocketService} from '../../../app/partials/bandeau/services/bandeau-websocket.service'
import { MacroCommandeWebsocketService } from '../../../app/core/macro-commande/services/macro-commande-websocket.service';
import { CacheService } from '../../../app/shared/services/cache/cache.service';
import { CacheConstantes } from '../../../app/shared/services/cache/cache.constantes';
import { NotesInfoCte } from '../../../app/core/notes-infos/constantes/note-info.constantes';

import { Router } from '@angular/router';
import { Commande } from '../../shared/models/generic/Commande';
import { PrOriente } from '../../shared/models/generic/models';

@Component({
    selector: 'bandeau',
    templateUrl: './bandeau.component.html',
    styleUrls: ['./bandeau.component.scss']
})
export class BandeauComponent implements OnInit {
    now:any;
    notifications:any[] = [];
    nbrNotifis:number = 0;
    nbrNotes:number = 0;
    nbrMacros:number = 0;
    subscriptions:Subscription[] = [];
    session:any;
    attributs:any = [NotesInfoCte.FIELD.DATE, NotesInfoCte.FIELD.AUTEUR, NotesInfoCte.FIELD.FICHIER, NotesInfoCte.FIELD.LECTEURS];
    typesNotesDemandes:any=[NotesInfoCte.TYPE_NOTE.POSTIT, NotesInfoCte.TYPE_NOTE.CONSIGNE];

    static ModeEnum = {
        TEXTUEL: 'TEXTUEL',
        SONORE: 'SONORE',
        VISUEL: 'VISUEL'
    };

    static TypeSourceEnum = {
        DIVERS: 'DIVERS',
        ALERTE: 'ALERTE',
        EVENEMENT: 'EVENEMENT',
        MACROCOMMANDE: 'MACROCOMMANDE',
        PREPARATIONENVOI:'PREPARATIONENVOI'
    }

    constructor(private bandeauService:BandeauService,
                private eventManager:EventManager,
                private notesInfosService:NotesInfosService, private macroCommandeService:MacroCommandeService,
                private notesInfosWebSocketService:NotesInfosWebSocketService, private bandeauWebsocketService:BandeauWebsocketService,
                private macroCommandeWebsocketService:MacroCommandeWebsocketService, private router:Router,
                private cacheService:CacheService, private loginService : LoginService) {

        // override the route reuse strategy
        this.router.routeReuseStrategy.shouldReuseRoute = function(){
            return false;
        }

        this.router.events.subscribe(() => {
            this.router.navigated = false;
            window.scrollTo(0, 0);
        });
    }



    ngOnInit() {
        this.initSession();
        let today = new Date();
        let options = {weekday: "long", year: "numeric", month: "numeric", day: "numeric"};
        this.now = today.toLocaleDateString("fr-FR", options);
        this.now = this.now.charAt(0).toUpperCase() + this.now.slice(1);
        this.initSubscriptionSession();
        this.initNotifsAndMacros();
        this.initSubscriptionNotifs();
        this.initSubscriptionMacros();
        this.initSubscriptionNotes();
        this.initSubscriptionEditionEvenement();
        this.initSubscriptionCreationEvenement();
        this.resolveSendToBandeauToRemoveNotification();

    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
        this.subscriptions.length = 0;
    }




    private initSession(){
        let session = this.cacheService.getObject(CacheConstantes.SESSION);
        if(session && session.login){
            this.session = session;
        }else{
            this.loginService.getSession()
                .subscribe(response => {
                    let session = response;
                    if (session && session.login) {
                        this.session = session;
                        this.cacheService.setObject(CacheConstantes.SESSION, session);
                    }else{
                        this.cacheService.setObject(CacheConstantes.SESSION, null);
                        this.router.navigate(['/login']);
                    }
                },error => {
                    this.cacheService.setObject(CacheConstantes.SESSION, null);
                    this.router.navigate(['/login']);
                },
                () => { }
            );
            this.router.navigate(['/login']);
        }
    }

    public initSubscriptionSession() {
        /* récupération de la session dans le cache car existe déjà */
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.sessionUserAlreadyExist, (response) => {
            this.session = response.content.session;

        }));

        /* recuperation de la session après une connexion */
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.sendSessionUserConnexion, (response) => {
            this.session = response.content.session;
            this.initNotifsAndMacros();
        }));
    }


    public initSubscriptionEditionEvenement(){
        /* gestion des demandes d'édition d'un évt*/
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.demandeEditionEvenementEvent, (response) => {
                const cmd: Commande = response.content;
                const balisage = (cmd.variables[BandeauWebsocketService.CODE_VARIABLE_COMMANDE_IHM.balisage]==='true');

                //On vérifie si on est en cours d'édition et on affiche la popu de confirmation dans ce cas
                let nonSaveDataCtx = this.cacheService.getObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX); // pour détecter des données éventuellement non sauvegardées.
                if (nonSaveDataCtx) {
                    this.eventManager.broadcast({
                        name: EventManagerCte.EVENT_NAME.showPopup,
                        content: {}
                    });
                    this.eventManager.subscribe(EventManagerCte.EVENT_NAME.confirmActionResponseYes,
                        (response) => this.editerEvenement(cmd.variables[BandeauWebsocketService.CODE_VARIABLE_COMMANDE_IHM.idEvenement],balisage)
                    );
                }else{
                    this.editerEvenement(cmd.variables[BandeauWebsocketService.CODE_VARIABLE_COMMANDE_IHM.idEvenement],balisage);
                }
        }));
    }

    public initSubscriptionCreationEvenement(){
        /* gestion des demandes de création d'un évt*/
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.demandeCreationEvenementEvent, (response) => {
                const cmd: Commande = response.content;
                const balisage = (cmd.variables[BandeauWebsocketService.CODE_VARIABLE_COMMANDE_IHM.balisage]==='true');
                const position: PrOriente = cmd.variables[BandeauWebsocketService.CODE_VARIABLE_COMMANDE_IHM.localisation];

                //On vérifie si on est en cours d'édition et on affiche la popup de confirmation dans ce cas
                let nonSaveDataCtx = this.cacheService.getObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX); // pour détecter des données éventuellement non sauvegardées.
                if (nonSaveDataCtx) {
                    this.eventManager.broadcast({
                        name: EventManagerCte.EVENT_NAME.showPopup,
                        content: {}
                    });
                    this.eventManager.subscribe(EventManagerCte.EVENT_NAME.confirmActionResponseYes,
                        (response) => this.creerEvenement(position,balisage)
                    );
                }else{
                    this.creerEvenement(position,balisage);
                }
        }));
    }


    public initNotifsAndMacros() {
        this.getNbrMacros();
        this.getNbrNotes();
        this.getNbrNotifications();
    }

    private getNbrMacros() {
        this.macroCommandeService.getAllMacroCommandes()
            .subscribe(response => {
                if (response.macros) {
                    this.nbrMacros = response.macros.length;
                }
            });
    }

    private getNbrNotes() {
        this.notesInfosService.getNotes(this.typesNotesDemandes, this.attributs)
            .subscribe(response => {
                if (response) {
                    this.nbrNotes = 0;
                    if(response.length > 0){
                        response.forEach(note => {
                            if (note[NotesInfoCte.FIELD.ATTRIBUTS] && note[NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.AUTEUR]
                                && note[NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.AUTEUR][NotesInfoCte.FIELD.AUTEUR_NOM]) {
                                if(!this.session){
                                    this.session = this.cacheService.getObject(CacheConstantes.SESSION);
                                }

                                if (this.session && note[NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.AUTEUR][NotesInfoCte.FIELD.CODE_INFO].valeur !== this.session.codeOperateur) {
                                    /* ce n'est pas l'auteur de la note */
                                    if (note[NotesInfoCte.FIELD.ATTRIBUTS] && note[NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.LECTEURS] &&
                                        note[NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.LECTEURS][NotesInfoCte.FIELD.NOTE_LECTEURS]) {
                                        let lecteurs = note[NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.LECTEURS][NotesInfoCte.FIELD.NOTE_LECTEURS];
                                        if (lecteurs && lecteurs.length > 0) {
                                            let alreadySignIt : boolean = false;
                                            for (let i = 0; i < lecteurs.length; i++) {
                                                /* ça veut dire qu'il a déjà signé la note */
                                                if (lecteurs[i][NotesInfoCte.FIELD.LECTEUR_CODE_INFO].valeur === this.session.codeOperateur) {
                                                    alreadySignIt=true;
                                                    break;
                                                }
                                            }
                                            if(!alreadySignIt){ /*si il ne l'a jamais signé */
                                                this.nbrNotes++;
                                            }
                                        } else {
                                            this.nbrNotes++;
                                        }
                                    } else {
                                        this.nbrNotes++;
                                    }
                                } else {
                                   /* Je ne fais rien cette note a été crée par celui qui est connecté */
                                }
                            }
                        });
                    }
                }
            });
    }

    private getNbrNotifications() {
        this.bandeauService.getNotifications()
            .subscribe(response => {
                if (response) {
                    this.notifications = response;
                    this.nbrNotifis = response.length;
                }
            });
    }

    public initSubscriptionNotifs() {
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.notificationSaeUpdatedFromWebSocket, (response) => {
            this.getNbrNotifications();
        }));
    }

    public initSubscriptionMacros() {
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.macroCommandesCreateFromWebSocket, (response) => {
            this.getNbrMacros();
        }));

        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.macroCommandesUpdateFromWebSocket, (response) => {
            this.getNbrMacros();
        }));

        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.macroCommandesDeleteFromWebSocket, (response) => {
            this.getNbrMacros();
        }));
    }

    public initSubscriptionNotes() {
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.notesSaeUpdatedFromWebSocket, (response) => {
            this.getNbrNotes();
        }));
    }

    public voirNotification($event, notif:any) {
        if(notif && notif.typeSource){
            switch(notif.typeSource){
                case BandeauComponent.TypeSourceEnum.ALERTE:
                    this.router.navigate(['/journal-alertes', notif.identifiantSource]);
                    this.acquitterNotificationsSae(notif.identifiant);
                    break;
                case BandeauComponent.TypeSourceEnum.EVENEMENT:{
                        let balisage = false;
                        if(notif.message.indexOf('Balisage') >= 0){
                            balisage = true;
                        }
                        this.voirEvenement(notif.identifiantSource, balisage);
                        this.acquitterNotificationsSae(notif.identifiant);
                    }
                    break;
                case BandeauComponent.TypeSourceEnum.MACROCOMMANDE:
                    this.router.navigate(['/macro-commande', notif.identifiantSource]);
                    this.acquitterNotificationsSae(notif.identifiant);
                    break;
                case BandeauComponent.TypeSourceEnum.PREPARATIONENVOI:
                    this.router.navigate(['/bulletins', notif.identifiantSource]);
                    this.acquitterToutesLesNotificationsSurLaPreparationEnvoi(notif.identifiantSource);
                    break;
                default :
                    break;
            }
        }
    }

    private acquitterToutesLesNotificationsSurLaPreparationEnvoi(idBulletin:any){
        this.notifications.forEach(notif =>{
            if(notif.typeSource===BandeauComponent.TypeSourceEnum.PREPARATIONENVOI && notif.identifiantSource===idBulletin){
                this.acquitterNotificationsSae(notif.identifiant);
            }
        })
    }

    voirEvenement(idEvenement: string, balisage: boolean){
        const nomMethode = 'voirEvenement';
        if(idEvenement){
            if(balisage){
                //On route vers l'onglet des balisages en consultation
                this.router.navigate(['/balisages', {'type': 'BAL', 'idEvenement': idEvenement}]);
            }else{
                //On route vers l'onglet des evts en consultation
                this.router.navigate(['situation-courante/evenement', idEvenement]);
            }
        }
    }

    editerEvenement(idEvenement: string, balisage: boolean){
        const nomMethode = 'editerEvenement';
        if(idEvenement){
            if(balisage){
                //On route vers l'onglet des balisages en edition
                this.router.navigate(['/balisages', {'type': 'BAL', 'idEvenement': idEvenement, 'edition' : true}]);
            }else{
                //On route vers l'onglet des evts en edition
                this.router.navigate(['situation-courante/evenement', idEvenement,true]);
            }
        }
    }

    creerEvenement(position: PrOriente, balisage: boolean) {
        const nomMethode = 'creerEvenement';

        if (balisage) {
            //On route vers l'onglet des balisages en creation
            this.router.navigate(['/balisages', { 'type': 'BAL', 'creation': true, 'position': JSON.stringify(position) }]);
        } else {
            //On route vers l'onglet des evts en creation
            this.router.navigate(['situation-courante/evenement', { 'creation': true, 'position': JSON.stringify(position) }]);
        }
    }

    testCreationEvt(bal: boolean){
        const nomMethode = 'testCreationEvt';

        const balisage = bal;
        const position: PrOriente ={
            codeAxe: 'AXE-A43',
            sens: 'SENS.PR_DECROISSANT',
            numero: 134,
            abscisse: 732
        };

        //On vérifie si on est en cours d'édition et on affiche la popup de confirmation dans ce cas
        let nonSaveDataCtx = this.cacheService.getObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX); // pour détecter des données éventuellement non sauvegardées.
        if (nonSaveDataCtx) {
            this.eventManager.broadcast({
                name: EventManagerCte.EVENT_NAME.showPopup,
                content: {}
            });
            this.eventManager.subscribe(EventManagerCte.EVENT_NAME.confirmActionResponseYes,
                (response) => this.creerEvenement(position,balisage)
            );
        }else{
            this.creerEvenement(position,balisage);
        }

    }

    /**
     * acquitte une notification
     * @param identifiantNotif
     */
    private acquitterNotificationsSae(identifiantNotif: number){
        this.bandeauService.acquitterNotificationsSae(identifiantNotif)
            .subscribe(response => {
                console.log("La notif id = : " + identifiantNotif + " a été acquitté avec succès");
            });
    }

    public goToInfosAndConsignes(){
        this.router.navigate(['/notes-infos']);
        this.sendToMenuPrincipaleToGoToNotesInfos();
    }

    public goToMacros(){
        this.router.navigate(['/macro-commande']);
    }

    private resolveSendToBandeauToRemoveNotification() {
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.removeNotificationMacroToBandeau, (response) => {
                let identifiantSource = response.content;
                let notification = _.filter(this.notifications, function (notif) {
                    return notif.identifiantSource === identifiantSource;
                })[0];

                if(notification){
                    this.acquitterNotificationsSae(notification.identifiant);
                }

            }));

    }

    private sendToMenuPrincipaleToGoToNotesInfos() {
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.selectNotesInfosInMenuPrincipaleEvent,
            content: null
        });
    }


    public deconnexion(){
        const nomMethode = 'BandeauComponent.deconnexion';
        console.info(nomMethode);
        this.bandeauService.deconnexion().subscribe(response => {
            this.cacheService.clearAll();
        });


    }


}
