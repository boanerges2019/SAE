import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Rx';
import { EventManager } from '../../../../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../../app/shared/services/constantes/event-manager.constantes';
import { environment } from '../../../../environments/environment';

@Injectable()
export class MacroCommandeWebsocketService implements OnDestroy{
    
    
    subscriptionsMap: Map<String,Subscription> = new Map<String,Subscription>();



    static BASE_URL = `${environment.webSocketBaseUrl}/agorav2`;  // URL to web api
    idMacro:number;
    static OPEREATION_TYPE = {
        created: "CREATED",
        updated: "UPDATED",
        deleted: "DELETED"
    };

    constructor(private eventManager: EventManager) {
        this.subscribeMacroCommandes();
    }

    ngOnDestroy() {
        this.subscriptionsMap.forEach(s => s.unsubscribe());
        this.subscriptionsMap.clear();
    }

    /**
     *  Renvoie des notifications de modification des actions des macros
     */
    public subscribeMacroCommandes (){
        const nomMethode = 'subscribeMacroCommandes';
        console.log(nomMethode);

        const key : string =   "MacroCommande:toutes";
        let subscription: Subscription = this.subscriptionsMap.get(key);
        if(subscription && !subscription.closed){
            console.log(nomMethode + ' subscriptions <'+key+'> déjà existante');
        }else{
            subscription = Observable.webSocket(`${MacroCommandeWebsocketService.BASE_URL}/mcr/macro_commandes/subscribe`)
                                     .subscribe((msg) => this.resolveSubscribeMacroCommandesMessage(msg));
            this.subscriptionsMap.set(key,subscription);                         
            
        }
        console.log(nomMethode + ' subscriptions ' + this.getSubscriptionsMapString());
    }

    /**
     * Renvoie des notifications de modification des actions des macros rattachées à un type d'objet particulier
     */
    public subscribeMacroCommandesTypeObjet (typeObjet: string, identifiantObjet: number){
        const nomMethode = 'subscribeMacroCommandesTypeObjet';
        console.log(nomMethode + '<'+typeObjet+'> <'+identifiantObjet+'>');

        const key : string = typeObjet + ":" + identifiantObjet;
        let subscription: Subscription = this.subscriptionsMap.get(key);
        if(subscription && !subscription.closed){
            console.log(nomMethode + ' subscriptions <'+key+'> déjà existante');
        }else{
            subscription = Observable.webSocket(`${MacroCommandeWebsocketService.BASE_URL}/mcr/macro_commandes/${typeObjet}/${identifiantObjet}/subscribe`)
                                     .subscribe(
                                            (msg) => this.resolveSubscribeMacroCommandesTypeObjetMessage(msg)
                                    );
            this.subscriptionsMap.set(key,subscription);                       
        }
        console.log(nomMethode + ' subscriptions ' + this.getSubscriptionsMapString());
    }

    public unsubscribeMacroCommandesTypeObjet (typeObjet: string, identifiantObjet: number){
        const nomMethode = 'unsubscribeMacroCommandesTypeObjet';
        console.log(nomMethode + '<'+typeObjet+'> <'+identifiantObjet+'>');

        const key : string = typeObjet + ":" + identifiantObjet;
        if(this.subscriptionsMap.has(key)){
            let subscription: Subscription = this.subscriptionsMap.get(key);
            if(subscription){
                //Si la souscription est ouverte, on la ferme
                if(!subscription.closed){
                    subscription.unsubscribe();
                }
                this.subscriptionsMap.delete(key);
            }
        }
        console.log(nomMethode + ' subscriptions ' + this.getSubscriptionsMapString());
    }

    /**
     * Renvoie des notifications de modification des actions d'une macro commande
     */
    public subscribeUneMacroCommande(identifiant: number) {
        const nomMethode = 'subscribeUneMacroCommande';
        console.log(nomMethode + " identifiant<" + identifiant + ">");


        const key: string = "MacroCommande:" + identifiant;
        let subscription: Subscription = this.subscriptionsMap.get(key);

        this.idMacro = identifiant;

        if (subscription && !subscription.closed) {
            console.log(nomMethode + ' subscriptions <' + key + '> déjà existante');
        } else {
            subscription = Observable.webSocket(`${MacroCommandeWebsocketService.BASE_URL}/mcr/macro_commandes/${identifiant}/subscribe`)
                .subscribe((msg) => this.resolveSubscribeUneMacroCommandeMessage(msg));
            this.subscriptionsMap.set(key,subscription);      
        }

        console.log(nomMethode + ' subscriptions ' + this.getSubscriptionsMapString());
    }


    protected unsubscribeUneMacroCommande(identifiant: number) {
        const nomMethode = 'subscribeUneMacroCommande';
        console.log(nomMethode + " identifiant<" + identifiant + ">"); 
        const key: string = "MacroCommande:" + identifiant;
        

        if(this.idMacro === identifiant){
            delete this.idMacro;
        }
        if(this.subscriptionsMap.has(key)){
            let subscription: Subscription = this.subscriptionsMap.get(key);
            if(subscription){
                //Si la souscription est ouverte, on la ferme
                if(!subscription.closed){
                    subscription.unsubscribe();
                }
                this.subscriptionsMap.delete(key);
            }
        }
        console.log(nomMethode + ' subscriptions ' + this.getSubscriptionsMapString());    
    }



    /**
     * @param message notidication SubscribeMacroCommandesMessage
     */
    private resolveSubscribeMacroCommandesMessage(message: any){
        if (!message) return;
        switch(message.typeNotification){
            case MacroCommandeWebsocketService.OPEREATION_TYPE.created:
                this.eventManager.broadcast({name: EventManagerCte.EVENT_NAME.macroCommandesCreateFromWebSocket, content: message.macro});
                break;
            case MacroCommandeWebsocketService.OPEREATION_TYPE.updated:
                this.eventManager.broadcast({name: EventManagerCte.EVENT_NAME.macroCommandesUpdateFromWebSocket, content: message.macro});
                break;
            case MacroCommandeWebsocketService.OPEREATION_TYPE.deleted:
                this.eventManager.broadcast({name: EventManagerCte.EVENT_NAME.macroCommandesDeleteFromWebSocket, content: message.macro});
                break;
            default: return;
        }
    }


    /**
     * @param message notidication SubscribeMacroCommandesTypeObjetMessage
     */
    private resolveSubscribeMacroCommandesTypeObjetMessage(message: any){
        if (!message) return;
        this.eventManager.broadcast({name: EventManagerCte.EVENT_NAME.macroCommandesTypeObjetUpdateFromWebSocket, content: message});
    }

    /**
     * @param message notidication SubscribeUneMacroCommandeMessage
     */
    private resolveSubscribeUneMacroCommandeMessage(message: any){
        if (!message) return;
        let contenu  = {
            value: message.macro ? message.macro :
                         (message.action_applicable ? message.action_applicable : message.precondition),
            isMacro: message.macro ? true : false,
            isPrecondition: message.precondition ? true : false,
            isAction: message.action_applicable ? true : false
        };
        console.log("resolveSubscribeUneMacroCommandeMessage : " + contenu);
        switch(message.typeNotification){
            case MacroCommandeWebsocketService.OPEREATION_TYPE.created:
                this.eventManager.broadcast({name: EventManagerCte.EVENT_NAME.uneMacroCommandeCreateFromWebSocket  + this.idMacro, content: contenu});
                break;
            case MacroCommandeWebsocketService.OPEREATION_TYPE.updated:
                this.eventManager.broadcast({name: EventManagerCte.EVENT_NAME.uneMacroCommandeUpdateFromWebSocket + this.idMacro, content: contenu});
                break;
            case MacroCommandeWebsocketService.OPEREATION_TYPE.deleted:
                this.eventManager.broadcast({name: EventManagerCte.EVENT_NAME.uneMacroCommandeDeleteFromWebSocket + this.idMacro, content: contenu});                
                //On libère la websocket car la macro n'existe plus
                this.unsubscribeUneMacroCommande(message.macro.identifiant);
                break;
            default: return;
        }
    }


    private getSubscriptionsMapString(): string {
        let retour: string = '';
        retour = '';
        this.subscriptionsMap.forEach(function(value, key, map){
            retour = retour + '(' + key + ',' + value + ')';
        });
        retour = '<'+this.subscriptionsMap.size+'>['+retour+']';
        return retour;
    }

}
