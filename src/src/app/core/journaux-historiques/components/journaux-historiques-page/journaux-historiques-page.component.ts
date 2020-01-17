import { Component,  OnInit } from '@angular/core';

import { JournauxService } from '../../../../../app/core/journaux-historiques/services/journaux.service';
import * as _ from 'underscore';
import { EventManager } from '../../../../../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../../../app/shared/services/constantes/event-manager.constantes';

import { AbstractTabContainer } from '../../../../shared/components/abstract-tab/abstract-tab-container';
import { JournauxHistoCte } from '../../constantes/journaux-histo-constantes';
@Component({
    selector: 'journaux-historiques-page',
    templateUrl: './journaux-historiques-page.component.html',
    styleUrls: ['./journaux-historiques-page.component.scss']
})
export class JournauxHistoriquesPageComponent   extends AbstractTabContainer   implements OnInit {

    tabs = {};

    constructor(private journauxService:JournauxService,
                private eventManager:EventManager) {
        super();
        this.tabs = JournauxHistoCte.TABS;
        this.activeTab = JournauxHistoCte.TABS.TAB_JOURNAL_ACTIVITE.codeInfo;
    }

    ngOnInit() {
        this.sendToMenuPrincipaleToGoJournauxHistoriques();
    }


    //TODO : voir si il faut le reprendre sur les histo
    public getStateClass(codeEtat) {
        switch (codeEtat) {
            case 'VALIDE':
                return 'valide';
            case 'EN_COURS':
                return 'en-cours';
            case 'SIGNALE':
                return 'signale';
        }
    }

    /**
     * J'envois un event pour dire au composant menu principale
     * de se mettre sur Journaux historiques
     *
     */
    private sendToMenuPrincipaleToGoJournauxHistoriques() {
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.selectJournauxHistoriquesInMenuPrincipaleEvent,
            content: null
        });
    }

}
