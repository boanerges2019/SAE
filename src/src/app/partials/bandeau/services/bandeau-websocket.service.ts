import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Rx';
import { EventManager } from '../../../../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../../app/shared/services/constantes/event-manager.constantes';
import { environment } from '../../../../environments/environment';
import { Commande } from '../../../shared/models/generic/Commande';
import { CacheService } from '../../../shared/services/cache/cache.service';
import { SessionSae } from '../../../shared/models/generic/SessionSae';
import { CacheConstantes } from '../../../shared/services/cache/cache.constantes';

@Injectable()
export class BandeauWebsocketService implements OnDestroy{
    subscriptions: Subscription[] = [];
    static BASE_URL = `${environment.webSocketBaseUrl}/agorav2`;  // URL to web api
    static BASE_URL_CESAM2 = `${environment.webSocketBaseUrl}/cesam2`;

    static OPEREATION_TYPE = {
        created: 'CREATED',
        updated: 'UPDATED',
        deleted: 'DELETED'
    };

    static TYPE_COMMANDE_IHM = {
        editionEvenement:  'TYPE_COMMANDE.IHM_EDITION_EVT',
        creationEvenement: 'TYPE_COMMANDE.IHM_CREATION_EVT',
        ouvrirDocument:    'TYPE_COMMANDE.IHM_OUVRIR_DOCUMENT_EXPLOITATION',
        ouvrirDossier:     'TYPE_COMMANDE.IHM_OUVRIR_DOSSIER'
    };

    static CODE_VARIABLE_COMMANDE_IHM = {
        idEvenement: 'ID_EVT',
        localisation: 'LOCALISATION',
        balisage: 'BALISAGE'
    }

    constructor(private eventManager: EventManager, private cacheService:CacheService) {
        this.subscribeNotifications();
        this.subscribeCommandesIhm();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
        this.subscriptions.length = 0;
    }

    /**
     *  Renvoie des changements sur les notifications
     */
    public subscribeNotifications (){
        this.subscriptions.push(Observable.webSocket(`${BandeauWebsocketService.BASE_URL}/ppo/notifications_saes/subscribe`)
            .subscribe(
            (msg) => this.resolveSubscribeNotificationsMessage(msg)
        ));        
    }

    /**
     * @param message Notification
     */
    private resolveSubscribeNotificationsMessage(message: any){
        if (!message) return;
        this.eventManager.broadcast({name: EventManagerCte.EVENT_NAME.notificationSaeUpdatedFromWebSocket, content: message});
    }



    /**
     * 
     */
    public subscribeCommandesIhm (){   
        
        const nomMethode = 'subscribeCommandesIhmSSCC';

        let localIp = '';
        const session: SessionSae = this.cacheService.getObject(CacheConstantes.SESSION);
        if(session){
            localIp = session.adresseIp;
        }

        console.debug(nomMethode + ' localIp = ' + localIp);

//        this.subscriptions.push(Observable.webSocket(`${BandeauWebsocketService.BASE_URL_CESAM2}/sscc/commandes/ihm/subscribe?adresse_ip=${localIp}`)
//            .subscribe(   
//            (msg) => this.resolveSubscribeCommandesIhmMessage(msg)
//        ));
                                                                                                     
        this.subscriptions.push(Observable.webSocket(`${BandeauWebsocketService.BASE_URL}/ppo/commandes/ihm/subscribe?adresse_ip=${localIp}`)
            .subscribe(   
            (msg) => this.resolveSubscribeCommandesIhmMessage(msg)
        ));

    }

    /**
     * resolveSubscribeCommandesIhmSSCCMessage
     * @param message Notification
     */
    private resolveSubscribeCommandesIhmMessage(message: any){
        const nomMethode = 'resolveSubscribeCommandesIhmSSCCMessage';

        if (!message) return;

        console.info(nomMethode+' : '+JSON.stringify(message)); 


        const cmd: Commande  = message;


        switch(cmd.typeCommande){
            case BandeauWebsocketService.TYPE_COMMANDE_IHM.editionEvenement :
                //Demande d'édition d'une fiche événement
                this.eventManager.broadcast({name: EventManagerCte.EVENT_NAME.demandeEditionEvenementEvent, content: message});
            break;

            case BandeauWebsocketService.TYPE_COMMANDE_IHM.creationEvenement :
                //Demande de création d'une nouvelle fiche événement
                this.eventManager.broadcast({name: EventManagerCte.EVENT_NAME.demandeCreationEvenementEvent, content: message});
            break;

            case BandeauWebsocketService.TYPE_COMMANDE_IHM.ouvrirDocument :
                //Demande d'ouverture d'un document d'exploitation
                this.eventManager.broadcast({name: EventManagerCte.EVENT_NAME.demandeOuvertureDocumentEvent, content: message});
            break;
            
            case BandeauWebsocketService.TYPE_COMMANDE_IHM.ouvrirDossier :
                //Demande d'ouverture d'un dossier
                this.eventManager.broadcast({name: EventManagerCte.EVENT_NAME.demandeOuvertureDossierEvent, content: message});
            break;            

        }
        
    }
}
