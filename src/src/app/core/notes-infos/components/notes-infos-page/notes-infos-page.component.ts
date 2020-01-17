import { Component, OnInit } from '@angular/core';
import { EventManager } from '../../../../../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../../../app/shared/services/constantes/event-manager.constantes';
import { AbstractTabContainer } from '../../../../shared/components/abstract-tab/abstract-tab-container';
import { NotesInfoCte } from '../../constantes/note-info.constantes';
import { TabDefinition } from '../../../../shared/components/abstract-tab/tab-definition';

@Component({
  selector: 'notes-infos-page',
  templateUrl: './notes-infos-page.component.html',
  styleUrls: ['./notes-infos-page.component.scss']
})
export class NotesInfosPageComponent  extends AbstractTabContainer implements OnInit {
  
  tabs: { [key: string]: TabDefinition; };

  constructor(private eventManager:EventManager) { 
      super();
      this.tabs = NotesInfoCte.TABS;
      this.activeTab = NotesInfoCte.TABS.TAB_NOTE.codeInfo;
  }

  ngOnInit() {
      this.sendToMenuPrincipaleToGoNotesInfos();
      
  }

    /**
     * J'envois un event pour dire au composant menu principale
     * de se mettre sur notes infos
     *
     */
    private sendToMenuPrincipaleToGoNotesInfos() {
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.selectNotesInfosInMenuPrincipaleEvent,
            content: null
        });
    }
}
