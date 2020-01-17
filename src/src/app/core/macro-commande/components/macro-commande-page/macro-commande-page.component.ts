import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventManager } from '../../../../../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../../../app/shared/services/constantes/event-manager.constantes';

@Component({
    selector: 'macro-commande-page',
    templateUrl: './macro-commande-page.component.html',
    styleUrls: ['./macro-commande-page.component.scss']
})
export class MacroCommandePageComponent implements OnInit, OnDestroy {

    idMacro:number;
    private sub:any;

    constructor(private route:ActivatedRoute, private eventManager:EventManager) {
        this.sub = this.route.params.subscribe(params => {
            this.idMacro = +params['idMacro']; // (+) converts string 'id' to a number
        });
    }

    ngOnInit() {
        this.sendToMenuPrincipaleToGoToMacroCommande();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    /**
     * J'envois un event pour dire au composant menu principale
     * de se mettre sur macro commande
     *
     */
    private sendToMenuPrincipaleToGoToMacroCommande() {
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.selectMacroCommandeInMenuPrincipaleEvent,
            content: null
        });
    }



}
