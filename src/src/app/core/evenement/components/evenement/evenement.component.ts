import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Evenement } from '../../../../../app/shared/models/generic/Evenement';
import { AlertMessage } from '../../../../../app/shared/models/generic/alert-message';
import { AlertMessageComponent } from '../../../../../app/shared/components/alert-message/alert-message.component';
import { EvenementCte } from '../../../../../app/core/evenement/constantes/evenement.constantes';
import { EventManager } from '../../../../../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../../../app/shared/services/constantes/event-manager.constantes';
import { CacheService } from '../../../../../app/shared/services/cache/cache.service';
import { CacheConstantes } from '../../../../../app/shared/services/cache/cache.constantes';
import { FieldEvenementCte } from '../../constantes/field-evenement.constantes';


@Component({
    selector: 'evenement',
    templateUrl: './evenement.component.html',
    styleUrls: ['./evenement.component.scss']
})
export class EvenementComponent implements OnInit, OnDestroy {

    @Input() evenement:Evenement;
    @Input() currentCtx:string; // mode d'accès à la ressource (lecture, edition)
    @Input() warningEvtEdit:AlertMessage;
    alertMessages:AlertMessage[]=[]; // message d"'alert { erreur, warning, succes etc ... }'
    composantsEvenement:any;
    subscriptions:Subscription[] = [];

    //----------------------------------------------------------------------------
    //-- INITIALISATION
    //----------------------------------------------------------------------------
    constructor(
        private eventManager:EventManager,
        private cacheService:CacheService
    ) {
        this.resolveValidationErrorsSubscription();
    }

    ngOnInit() {
        this.composantsEvenement = EvenementCte.COMPOSANTS_EVENEMENT;
    }

    ngOnDestroy() {
        this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, null); // vide cache des données éventuellement non sauvegardées.
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    /**
     * Détermine si le comoposant evenement  matche avec le type de l'evenement.
     * @param nomComposant le nom du component
     * @param type type de l'evenement
     * @return true si si le comoposant evenement  matche avec le type de l'evenement, false sinon
     */
    public isComposantMatchesWithType(nomComposant:string, type:string):boolean {
        // return true;
        let composants = EvenementCte.COMPOSANTS_BY_TYPE_EVENEMENT[type] || [];
        return composants.indexOf(nomComposant) > -1;
    }

    /**
     * Traitement des messages d'alerte remontés par les composants fils.
     * @param alerteMessages les messages d'alerte.
     */
    public resolveAlerteMessagesCallBack(alertMessages:AlertMessage[]) {
        this.alertMessages = alertMessages;
    }

    /**
     * Gestion des erreurs de validations.
     */
    private resolveValidationErrorsSubscription() {
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.invalidInput, (response) => {
                this.alertMessages = response.content.alertMessages;
            }));

        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.validInput, (response) => {
                this.alertMessages = [];
            }))
    }
}
