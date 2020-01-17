import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { AlerteModule } from '../alerte/alerte.module';
import { StrategiesRoutingModule } from './strategies.routes';

import { StrategiesService } from './services/strategies.service';
import { StrategieModelService } from './services/strategie-modele.service';
import { StrategiesWebsocketService } from 'app/core/strategies/services/strategies-websocket.service';
import { EquipementService } from './services/equipement.service';
import { EquipementWebsocketService } from './services/equipement-websocket.service';

import { DisplayMessagePmvDirective } from './directives/display-message-pmv.directive';

import { StrategieBaseComponent } from './components/strategie-base/strategie-base.component';
import { PmvBaseComponent } from './components/equipement-base/pmv-base.component';
import { ListeStrategiesComponent } from './components/liste-strategies/liste-strategies.component';
import { ListeMsgPmvComponent } from './components/liste-msg-pmv/liste-msg-pmv.component';
import { StrategiesPageComponent } from './components/strategies-page/strategies-page.component';
import { ConfigMessageComponent } from './components/config-message/config-message.component';
import { MsgStrategieComponent } from './components/msg-strategie/msg-strategie.component';
import { StrategieNewComponent } from './components/strategie-new/strategie-new.component';
import { StrategieEditComponent } from './components/strategie-edit/strategie-edit.component';

/**
* Service de gestion des strategies d'affichage
* @author SPIE
*/
@NgModule({
  declarations: [
    StrategieBaseComponent,
    ListeStrategiesComponent,
    StrategiesPageComponent,
    ListeMsgPmvComponent,
    ConfigMessageComponent,
    MsgStrategieComponent,
	PmvBaseComponent,
    DisplayMessagePmvDirective,
    StrategieNewComponent,
    StrategieEditComponent,
  ],
  imports: [
    FormsModule, ReactiveFormsModule,
    SharedModule,
    AlerteModule,
    StrategiesRoutingModule
  ],
  exports: [
      StrategieBaseComponent,
      ListeStrategiesComponent,
      StrategiesPageComponent,
      ListeMsgPmvComponent,
      ConfigMessageComponent,
      MsgStrategieComponent,
  	  PmvBaseComponent,
      DisplayMessagePmvDirective,
      StrategieNewComponent,
      StrategieEditComponent
  ],
  providers: [
    StrategiesService,
    StrategiesWebsocketService,
    StrategieModelService,
    EquipementService,
      EquipementWebsocketService
  ]
})
export class StrategiesModule { }
