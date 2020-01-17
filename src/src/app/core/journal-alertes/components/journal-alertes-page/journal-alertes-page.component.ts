import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventManager } from 'app/shared/services/event/event-manager.service';
import { EventManagerCte } from 'app/shared/services/constantes/event-manager.constantes';

@Component({
    selector: 'journal-alertes-page',
    templateUrl: './journal-alertes-page.component.html',
    styleUrls: ['./journal-alertes-page.component.scss']
})
export class JournalAlertesPageComponent implements OnInit, OnDestroy {


    idAlerteSelected:number;
    private sub:any;

    constructor(private route:ActivatedRoute, private eventManager:EventManager) {
        this.sub = this.route.params.subscribe(params => {
            this.idAlerteSelected = +params['idAlerte']; // (+) converts string 'id' to a number
        });
    }

    ngOnInit() {
        this.sendToMenuPrincipaleToGoToJournalAlerte();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    /**
     * J'envois un event pour dire au composant menu principale
     * de se mettre sur journal des alertes
     *
     */
    private sendToMenuPrincipaleToGoToJournalAlerte() {
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.selectJournalAlerteInMenuPrincipaleEvent,
            content: null
        });
    }

}
