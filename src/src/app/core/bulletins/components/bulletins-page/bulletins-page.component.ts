import { Component, OnInit, OnDestroy } from '@angular/core';
import { Injectable } from '@angular/core';
import { EventManager } from 'app/shared/services/event/event-manager.service';
import { EventManagerCte } from 'app/shared/services/constantes/event-manager.constantes';
import { TabDefinition } from '../../../../shared/components/abstract-tab/tab-definition';
import { FieldBulletinsCte } from 'app/core/bulletins/constantes/field-bulletins.constante';
import { AbstractTabContainer } from '../../../../shared/components/abstract-tab/abstract-tab-container';
import { ActivatedRoute } from '@angular/router';

@Injectable()
@Component({
  selector: 'bulletins-page',
  templateUrl: './bulletins-page.component.html',
  styleUrls: ['./bulletins-page.component.scss']
})
export class BulletinsPageComponent  extends AbstractTabContainer implements OnInit, OnDestroy {

    tabs: { [key: string]: TabDefinition; };
    idBulletin:number;
    private sub:any;

  constructor(protected eventManager:EventManager, private route:ActivatedRoute) {
      super();
      this.sub = this.route.params.subscribe(params => {
          this.idBulletin = +params['idBulletin']; // (+) converts string 'id' to a number
      });

      this.tabs = FieldBulletinsCte.TABS;
      this.activeTab = this.idBulletin ?  FieldBulletinsCte.TABS.TAB_PREPARATIONS_ENVOIS.codeInfo : FieldBulletinsCte.TABS.TAB_BULLETINS_PLANIFIES.codeInfo;
  }

  ngOnInit() {
      this.sendToMenuPrincipaleToGoToBulletins();
  }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    /**
     * J'envois un event pour dire au composant menu principale
     * de se mettre sur Bulletins
     *
     */
    private sendToMenuPrincipaleToGoToBulletins() {
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.selectBulletinsInMenuPrincipaleEvent,
            content: null
        });
    }

}
