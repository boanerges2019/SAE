import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { EventManager } from '../../../../../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../../../app/shared/services/constantes/event-manager.constantes';
import { CacheService} from '../../../../../app/shared/services/cache/cache.service';
import { CacheConstantes} from '../../../../../app/shared/services/cache/cache.constantes';
import { NotesInfoCte } from '../../../../../app/core/notes-infos/constantes/note-info.constantes';
import { NotesInfosService } from '../../../../../app/core/notes-infos/services/notes-infos.service';
import { NoteInfoComponent } from '../note-info/note-info.component';

/**
 * Gestion de popup d'avertissement
 * @author SPIE.
 */
@Component({
  selector: 'cesam-note-popup',
  templateUrl: './cesam-note-popup.component.html',
  styleUrls: ['./cesam-note-popup.component.scss']
})
export class CesamNotePopupComponent extends NoteInfoComponent implements OnInit, OnDestroy {

    @Input() note:any;
    @Input() type:string;
    subscriptions: Subscription[] = [];
    header =  "header";
    file: File;
    typesNote: any;

    constructor(protected eventManager: EventManager,protected cacheService: CacheService,
                protected notesInfosService : NotesInfosService) {
        super(eventManager, notesInfosService, cacheService);
        this.typesNote = NotesInfoCte.TYPE_NOTE;
    }

    ngOnInit() {
      this.initCouleurNote();
    }

    ngOnDestroy() {
      this.subscriptions.forEach(s => s.unsubscribe());
    }


    public saveModifierNotePopup() {
        this.saveModifierNote(this.file);
        this.sendToHiddenPopupModifierNote();
    }

    private sendToHiddenPopupModifierNote(){
        this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, false);
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.hiddenPopupModifierNoteEvent,
            content: this.note
        });
    }

    public closeModifierNotePopup(){
        this.sendToHiddenPopupModifierNote();
    }

    public fileChange(outputFile) {
        this.file = outputFile.files[0];
    }
}
