import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { SharedModule } from '../../../app/shared/shared.module';
import { AlerteModule } from '../alerte/alerte.module';
import { NotesInfosRoutingModule } from './notes-infos.routes';

import { NotesInfosService } from '../../../app/core/notes-infos/services/notes-infos.service';
import { NotesInfosWebSocketService } from '../../../app/core/notes-infos/services/notes-infos-web-socket.service';

import { ListeNotesInfosComponent } from './components/liste-notes-infos/liste-notes-infos.component';
import { NoteInfoComponent } from './components/note-info/note-info.component';
import { NotesInfosPageComponent } from './components/notes-infos-page/notes-infos-page.component';
import {NotesInfosBaseComponent} from '../../../app/core/notes-infos/components/note-info-base/note-info-base.component';
import { CesamNotePopupComponent } from './components/cesam-note-popup/cesam-note-popup.component';
import { AstreintesModule } from '../astreintes/astreintes.module';
import { EvenementModule } from '../evenement/evenement.module';


@NgModule({
    declarations: [
        ListeNotesInfosComponent,
        NoteInfoComponent,
        NotesInfosPageComponent,
        NotesInfosBaseComponent,
        CesamNotePopupComponent
    ],
    imports: [
        FormsModule,
        SharedModule,
        AlerteModule,
        NotesInfosRoutingModule,
        AstreintesModule,
        EvenementModule
    ],
    exports: [
        ListeNotesInfosComponent,
        NoteInfoComponent,
        NotesInfosBaseComponent,
        CesamNotePopupComponent
    ],
    providers: [
        NotesInfosService,
        NotesInfosWebSocketService
    ]
})
export class NotesInfosModule {
}
