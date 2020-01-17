import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { AlerteModule } from '../alerte/alerte.module';
import { JournalAlertesRoutingModule } from './journal-alertes.routes';

import { JournalAlertesService } from './services/journal-alertes.service';
import { JournalAlertesPageComponent } from './components/journal-alertes-page/journal-alertes-page.component';



@NgModule({
  declarations: [
    JournalAlertesPageComponent
  ],
  imports: [
    FormsModule, ReactiveFormsModule,
    SharedModule,
    AlerteModule,
    JournalAlertesRoutingModule
  ],
  exports: [
	JournalAlertesPageComponent
  ],
  providers: [
    JournalAlertesService
  ]
})
export class JournalAlertesModule { }
