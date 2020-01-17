import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'underscore';
import { LABELS } from './labels'
import { NotesInfoCte } from '../../../../../app/core/notes-infos/constantes/note-info.constantes';
import { NotesInfosService } from '../../../../../app/core/notes-infos/services/notes-infos.service';
import { EventManager } from '../../../../../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../../../app/shared/services/constantes/event-manager.constantes';
import { NgGrid, NgGridItem, NgGridConfig, NgGridItemConfig, NgGridItemEvent } from 'angular4-grid';
import { NotesInfosBaseComponent } from '../note-info-base/note-info-base.component';
import { CacheService } from '../../../../../app/shared/services/cache/cache.service';
import { AbstractTab } from '../../../../shared/components/abstract-tab/abstract-tab';
import { CtxCte } from 'app/shared/services/constantes/ctx.constantes';
import { CacheConstantes } from 'app/shared/services/cache/cache.constantes';


@Component({
    selector: 'liste-notes-infos',
    templateUrl: './liste-notes-infos.component.html',
    styleUrls: ['./liste-notes-infos.component.scss']
})
export class ListeNotesInfosComponent extends NotesInfosBaseComponent implements OnInit, OnDestroy {

    @Input() notesEnCours: boolean = true;
    @Input() consignesEnCours: boolean = true;

    notes:any = [];
    prototypeNote:any;
    subscriptions:Subscription[] = [];
    nbrNotes:number = 0;
    gridConfig:NgGridConfig;
    noteConfigs:NgGridItemConfig[]=[];
    isCreated:boolean = false;
    types:any;
    attributs:any = [NotesInfoCte.FIELD.DATE, NotesInfoCte.FIELD.AUTEUR, NotesInfoCte.FIELD.FICHIER, NotesInfoCte.FIELD.LECTEURS];
    file: File;
    note:any;
    showPopupModifNote:boolean=false;

    constructor(protected eventManager:EventManager, protected notesInfosService:NotesInfosService,
                protected cacheService : CacheService ) {
        super(cacheService);
        this.types = NotesInfoCte.TYPE_NOTE;
    }


    ngOnInit() {
        this.model={};
        this.model.labels = LABELS;
        this.model.field = NotesInfoCte.FIELD;
        this.model.currentCtx = CtxCte.CTX.POSTIT;
        this.model.contexte = CtxCte.CTX;
        this.model.configCte =  NotesInfoCte;


        this.model.descriptionNote = "";
        this.nbrNotes = 0;
        this.initConfigGrid();
        this.getAllNotes();
        this.initSubscriptionNotes();
        this.subscriptionShowPopuModifierNote();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
        this.subscriptions.length = 0;
    }

    private initConfigGrid() {
        this.gridConfig = <NgGridConfig> {
            'margins': [10], /*  The size of the margins of each item. Supports up to four values in the same way as CSS margins. Can be updated using setMargins() */
            'draggable': true, /*  Whether the items can be dragged. Can be updated using enableDrag()/disableDrag() */
            'resizable': true, /*  Whether the items can be resized. Can be updated using enableResize()/disableResize() */
            'max_cols': 6, /*  The maximum number of columns allowed. Set to 0 for infinite. Cannot be used with max_rows */
            'max_rows': 10, /*  The maximum number of rows allowed. Set to 0 for infinite. Cannot be used with max_cols */
            'visible_cols': 0, /*  The number of columns shown on screen when auto_resize is set to true. Set to 0 to not auto_resize. Will be overriden by max_cols */
            'visible_rows': 0, /*  The number of rows shown on screen when auto_resize is set to true. Set to 0 to not auto_resize. Will be overriden by max_rows */
            'min_cols': 1, /*  The minimum number of columns allowed. Can be any number greater than or equal to 1. */
            'min_rows': 1, /*  The minimum number of rows allowed. Can be any number greater than or equal to 1. */
            'col_width': 282,           //  The width of each column
            'row_height': 255,          //  The height of each row
            'cascade': 'up',            //  The direction to cascade grid items ('up', 'right', 'down', 'left')
            'min_width': 282, /*  The minimum width of an item. If greater than col_width, this will update the value of min_cols */
            'min_height': 255, /*  The minimum height of an item. If greater than row_height, this will update the value of min_rows */
            'fix_to_grid': false,       //  Fix all item movements to the grid
            'auto_style': true,         //  Automatically add required element styles at run-time
            'auto_resize': false, /*  Automatically set col_width/row_height so that max_cols/max_rows fills he screen. Only has effect is max_cols or max_rows is set*/
            'maintain_ratio': false, /*  Attempts to maintain aspect ratio based on the colWidth/rowHeight values set in the config */
            'prefer_new': false,        //  When adding new items, will use that items position ahead of existing items
            'limit_to_screen': false, /*  When resizing the screen, with this true and auto_resize false, the grid will re-arrange to fit the screen size. Please note, at present this only works with cascade direction up.*/
            'center_to_screen': false, /*  When resizing the screen, with this true and limit_to_screen true, the grid will center itself to the screen if max columns width is smaller than the grid width.*/
        };
        this.noteConfigs=[];
    }



    private getAllNotes() {
        const nomMethode = 'getAllNotes';
        const typesNotesDemandes: Array<string> = [];
        typesNotesDemandes.push(this.notesEnCours? NotesInfoCte.TYPE_NOTE.POSTIT : NotesInfoCte.TYPE_NOTE.CONSIGNE);

        console.info(nomMethode + ' : ' + JSON.stringify(typesNotesDemandes));

        this.subscriptions.push(
            this.notesInfosService.getNotes(typesNotesDemandes, this.attributs)
                .subscribe(response => {
                    this.notes = response;
                    this.nbrNotes = this.notes.length;
                    this.initConfigGridNotes();
                }
            ));
    }

    private initConfigGridNotes() {
        if (this.notes && this.notes.length > 0) {
            this.noteConfigs=[];
            let index = 0;
            this.notes.map(note => {
                this.initConfigGridItem(note, index);
                index++;
            });
        }
    }

    private initConfigGridItem(note:any, index:number) {
        let line:number = +note[NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.NUMERO_LIGNE].valeur;
        let col:number = +note[NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.NUMERO_COLONNE].valeur
        let noteConfig = <NgGridItemConfig>{
            'col': col, //  The start column for the item
            'row': line,  //  The start row for the item
            'sizex': 1,             //  The start width in terms of columns for the item
            'sizey': 1,             //  The start height in terms of rows for the item
            'dragHandle': null,     //  The selector to be used for the drag handle. If null, uses the whole item
            'resizeHandle': null, /*  The selector to be used for the resize handle. If null, uses 'borderSize' pixels from the right for horizontal resize,
             'borderSize' pixels from the bottom for vertical, and the square in the corner bottom-right for both */
            'borderSize': 15,
            'fixed': false,         //  If the grid item should be cascaded or not. If yes, manual movement is required
            'draggable': true, /*  If the grid item can be dragged. If this or the global setting is set to false, the item cannot be dragged. */
            'resizable': true,      /*  If the grid item can be resized. If this or the global setting is set to false, the item cannot be resized. */
            'payload': index, /*  An optional custom payload (string/number/object) to be used to identify the item for serialization */
            'maxCols': 1, /*  The maximum number of columns for a particular item. This value will only override the value from the grid (if set) if it is smaller */
            'minCols': 1, /*  The minimum number of columns for a particular item. This value will only override the value from the grid if larger */
            'maxRows': 1, /*  The maximum number of rows for a particular item. This value will only override the value from the grid (if set) if it is smaller */
            'minRows': 1, /*  The minimum number of rows for a particular item. This value will only override the value from the grid if larger */
            'minWidth': 282, /*  The minimum width of a particular item. This value will override the value from the grid, as well as the minimum columns if the resulting size is larger */
            'minHeight': 255, /*  The minimum height of a particular item. This value will override the value from the grid, as well as the minimum rows if the resulting size is larger */
        };

        this.noteConfigs.push(noteConfig);
    }

    public onDragStop(index:number, event:NgGridItemEvent):void {
        if (this.notes[index][NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.NUMERO_LIGNE].valeur !== event.row ||
            this.notes[index][NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.NUMERO_COLONNE].valeur !== event.col) {
            this.notes[index][NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.NUMERO_LIGNE].valeur = event.row;
            this.notes[index][NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.NUMERO_COLONNE].valeur = event.col;
            this.notesInfosService.creerOuModifierNote(this.notes[index])
                .subscribe(response => {
                    console.log(response);
                }
            );
        }
    }

    public resolveNouvelleNote() {
        /*this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, true);*/
        this.isCreated = true;
    }

    public closeCreateNotePopup() {
        this.isCreated = false;
    }

    public creerNote() {
        this.closeCreateNotePopup();

        this.notesInfosService.getPrototypeNote( this.notesEnCours ?  NotesInfoCte.TYPE_NOTE.POSTIT : NotesInfoCte.TYPE_NOTE.CONSIGNE)
            .subscribe(response => {
                this.prototypeNote = response;
                this.prototypeNote.description = this.model.descriptionNote;
                /* si l'utilisateur ne choisit rien par défaut je mets jaune */
                this.prototypeNote[NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.COULEUR].valeur = this.model.checkviolet ? "violet" : (this.model.checkbleu ? "bleu" : "jaune");
                this.defaultPositionOfNote(this.prototypeNote);
                this.notesInfosService.creerOuModifierNote(this.prototypeNote, this.file)
                    .subscribe(response => {
                        console.log(response);
                    }
                )
            }
        )
    }

    /**
     * positionner le postit ou la consigne
     * par defaut sur l'ihm
     * @param note
     */
    private defaultPositionOfNote(note:any) {
        if (this.notes && this.notes.length > 0) {
            let index:number = this.notes.length - 1;
            if (this.notes[index][NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.NUMERO_COLONNE].valeur == 6) {
                note[NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.NUMERO_LIGNE].valeur = +this.notes[index][NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.NUMERO_LIGNE].valeur + 1;
                note[NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.NUMERO_COLONNE].valeur = 1;
            } else {
                note[NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.NUMERO_LIGNE].valeur = +this.notes[index][NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.NUMERO_LIGNE].valeur;
                note[NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.NUMERO_COLONNE].valeur = +this.notes[index][NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.NUMERO_COLONNE].valeur + 1;
            }
        } else {
            note[NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.NUMERO_LIGNE].valeur = 1;
            note[NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.NUMERO_COLONNE].valeur = 1;
        }
    }

    public initSubscriptionNotes() {
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.notesSaeUpdatedFromWebSocket, (response) => {
            this.getAllNotes();
        }));
    }

    public fileChange(outputFile) {
        this.file = outputFile.files[0];
    }

    public descriptionNoteChange($event) {
        this.model.descriptionNote = $event.target.value;
    }

   public onChange($event){
        $event.currentTarget.click();
        let fileName = $event.currentTarget.value;
       return fileName;
   }

    private subscriptionShowPopuModifierNote(){
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.noteModifierByOperateurEvent, (response) => {
                this.note = response.content;
                this.showPopupModifNote = true;
            }));

        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.hiddenPopupModifierNoteEvent, (response) => {
                this.showPopupModifNote = false;
            }));
    }

}
