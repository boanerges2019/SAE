import { Component, OnInit } from '@angular/core';
import { EventManager } from '../../../../../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../../../app/shared/services/constantes/event-manager.constantes';
import { AbstractTabContainer } from '../../../../shared/components/abstract-tab/abstract-tab-container';
import { TabDefinition } from '../../../../shared/components/abstract-tab/tab-definition';
import { AstreintesCte } from '../../constantes/astreintes-constantes';

@Component({
  selector: 'astreintes-page',
  templateUrl: './astreintes-page.component.html',
  styleUrls: ['./astreintes-page.component.scss']
})
export class AstreintesPageComponent  extends AbstractTabContainer  implements OnInit {


  rightTabs: { [key: string]: TabDefinition };

  constructor(private eventManager:EventManager) { 
      super();
      this.rightTabs = AstreintesCte.RIGHT_TABS;
  }

    ngOnInit() {

        
        this.activeTab = this.rightTabs.TAB_INFO.codeInfo;

        this.sendToMenuPrincipaleToGoAstreintes();
    }


    /**
     * J'envois un event pour dire au composant menu principale
     * de se mettre sur astreintes
     *
     */
    private sendToMenuPrincipaleToGoAstreintes() {
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.selectAstreintesInMenuPrincipaleEvent,
            content: null
        });
    }
}
