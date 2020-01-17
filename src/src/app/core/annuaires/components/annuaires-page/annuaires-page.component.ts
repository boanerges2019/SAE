import { Component, OnInit } from '@angular/core';
import { EventManager } from 'app/shared/services/event/event-manager.service';
import { EventManagerCte } from 'app/shared/services/constantes/event-manager.constantes';

@Component({
  selector: 'annuaire-page',
  templateUrl: './annuaires-page.component.html',
  styleUrls: ['./annuaires-page.component.scss']
})
export class AnnuairePageComponent implements OnInit {

  constructor(private eventManager:EventManager) { }

  ngOnInit() {
      this.sendToMenuPrincipaleToGoAnnuaires();
  }

    /**
     * J'envois un event pour dire au composant menu principale
     * de se mettre sur annuaires
     *
     */
    private sendToMenuPrincipaleToGoAnnuaires() {
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.selectAnnuairesInMenuPrincipaleEvent,
            content: null
        });
    }
}
