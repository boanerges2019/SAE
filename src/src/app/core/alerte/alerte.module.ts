
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';

import { AlertService } from 'app/shared/services/alert/alert.service';
import { AlerteWebsocketService } from 'app/core/alerte/services/alerte-websocket.service';

import { ListeAlerteComponent } from 'app/core/alerte/components/liste-alerte/liste-alerte.component';
import { SelectedAlerteDirective } from 'app/core/alerte/directives/selected-alerte.directive';
import { AlerteService } from 'app/core/alerte/services/alerte.service';
import { ListeAlerteBaseComponent } from './components/liste-alerte-base/liste-alerte-base.component';
import { ListeJournalAlertesComponent } from './components/liste-journal-alertes/liste-journal-alertes.component';

@NgModule({
  declarations: [
    ListeAlerteComponent,
    SelectedAlerteDirective,
    ListeAlerteBaseComponent,
    ListeJournalAlertesComponent
  ],
  imports: [
    FormsModule, ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    ListeAlerteBaseComponent,
    ListeAlerteComponent,
    ListeJournalAlertesComponent
  ],
  providers: [
    AlerteService,
    AlerteWebsocketService
  ]
})
export class AlerteModule { }
