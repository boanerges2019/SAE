import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { ListeAlerteBaseComponent } from '../liste-alerte-base/liste-alerte-base.component';
import { EventManager } from '../../../../../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../../../app/shared/services/constantes/event-manager.constantes';
import { Alerte } from '../../../../../app/shared/models/generic/Alerte';
import { AlerteService } from '../../../../../app/core/alerte/services/alerte.service';
import { EnumerationsService } from '../../../../../app/shared/services/reference/enumerations.service';
import { FieldAlerteCte } from '../../../../../app/core/alerte/constantes/field-alerte.constantes';
import { BaseService } from '../../../../../app/core/evenement/services/base.service';
import { DateUtils } from '../../../../../app/shared/utils/date-utils';
import { SessionSae } from '../../../../shared/models/generic/SessionSae';
import { CacheService } from '../../../../shared/services/cache/cache.service';
import { CacheConstantes } from '../../../../shared/services/cache/cache.constantes';


@Component({
    selector: 'liste-alerte',
    templateUrl: './liste-alerte.component.html',
    styleUrls: ['./liste-alerte.component.scss']
})
export class ListeAlerteComponent extends ListeAlerteBaseComponent implements OnInit, OnDestroy {
    // test: any;
    alertes:Alerte[] = [];
    subscriptions:Subscription[] = [];
    field:{[ key: string] : any};
    evenementsEnCours:number[]; // liste des evenements en cours
    informerWebTrafic:boolean = false;

    //----------------------------------------------------------------------------
    //-- INITIALISATION
    //----------------------------------------------------------------------------
    constructor(public eventManager:EventManager,
                public alerteService:AlerteService,
                public enumerationsService:EnumerationsService,
                public baseService:BaseService,
                public router:Router,
                private cacheService:CacheService) {
        super(eventManager, alerteService, enumerationsService, baseService, router);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    /**
     * Localiser une alerte
     * @param $event
     * @param alerte
     */
    public localiserAlert(event, alerte:Alerte) {
        const nomMethode = 'localiserAlert';
        console.debug(nomMethode + ' : ' + JSON.stringify(alerte));


        event.preventDefault();
        event.stopPropagation();

        //On récupère la session
        let poste;
        const session: SessionSae = this.cacheService.getObject(CacheConstantes.SESSION);
        if(session){
            poste = session.poste;
        }

        if (poste) {
            let codeEqt = '';
            if(alerte.codeInfoObjetSource){
                codeEqt = alerte.codeInfoObjetSource;
            }
            this.subscriptions.push(this.alerteService.localiserAlerte(poste, codeEqt)
                .subscribe(response => {
                    console.log(response);
                }
                ));
        }else{
            console.error("poste opérateur introuvable")
        }
    }

    /**
     * visualiser une alerte
     * @param event
     * @param alerte
     */
    public visualiserAlert(event, alerte:Alerte) {
        event.preventDefault();
        event.stopPropagation();
        this.subscriptions.push(this.alerteService.visualiserAlert(alerte.identifiant)
            .subscribe(response => {
                console.log(response);
            }
        ));
    }

}
