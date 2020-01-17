import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { SharedModule } from '../../../app/shared/shared.module';
import { AlerteModule } from '../alerte/alerte.module';
import { JournauxHistoriquesRoutingModule } from './journaux-historiques.routes';
import { JournauxService } from '../../../app/core/journaux-historiques/services/journaux.service';
import { JournauxHistoriquesPageComponent } from './components/journaux-historiques-page/journaux-historiques-page.component';
import { FilterPipe  } from './components/journaux-historiques-page/filter.pipe';
import { JournalActiviteComponent } from './components/journal-activite/journal-activite.component';
import { JournalHistoCourtTermeComponent } from './components/journal-histo-court-terme/journal-histo-court-terme.component';
import { JournalHistoExtractionComponent } from './components/journal-histo-extraction/journal-histo-extraction.component';
import { JournauxHistoCte } from './constantes/journaux-histo-constantes';

@NgModule({
  declarations: [
    JournauxHistoriquesPageComponent,
    FilterPipe,
    JournalActiviteComponent,
    JournalHistoCourtTermeComponent,
    JournalHistoExtractionComponent
  ],
  imports: [
    FormsModule, ReactiveFormsModule,
    SharedModule,
    AlerteModule,
    JournauxHistoriquesRoutingModule,

  ],
  exports: [
    FilterPipe
  ],
  providers: [
    JournauxService
  ]
})
export class JournauxHistoriquesModule { }
