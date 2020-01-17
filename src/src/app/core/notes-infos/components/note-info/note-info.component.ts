import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NotesInfoCte } from 'app/core/notes-infos/constantes/note-info.constantes';
import { NotesInfosService } from 'app/core/notes-infos/services/notes-infos.service';
import { NotesInfosBaseComponent } from '../note-info-base/note-info-base.component';
import { Subscription } from 'rxjs/Rx';
import { CacheService } from 'app/shared/services/cache/cache.service';
import { EventManager } from 'app/shared/services/event/event-manager.service';
import { EventManagerCte } from 'app/shared/services/constantes/event-manager.constantes';
import { CtxCte } from 'app/shared/services/constantes/ctx.constantes';
import { CacheConstantes } from 'app/shared/services/cache/cache.constantes';


@Component({
    selector: 'note-info',
    templateUrl: './note-info.component.html',
    styleUrls: ['./note-info.component.scss']
})
export class NoteInfoComponent extends NotesInfosBaseComponent implements OnInit, OnDestroy {
    @Input() note:any;
    classCss:string;
    isUpdated:boolean = false;
    subscriptions:Subscription[] = [];
    lecteursDeLaNote:any[] = [];
    date:string;
    canDelete:boolean = true;
    canUpdated:boolean = true;
    canSign:boolean = true;
    canOpenFile:boolean = false;
    canShowLecteur:boolean = true;
    isShowLecteurs:boolean = true;
    model:any={};


    constructor(protected eventManager:EventManager, protected notesInfosService:NotesInfosService, protected cacheService:CacheService) {
        super(cacheService);
    }

    ngOnInit() {
        this.model = {};
        this.model.field = NotesInfoCte.FIELD;
        this.model.currentCtx = CtxCte.CTX.POSTIT;
        this.model.contexte = CtxCte.CTX;
        this.initCouleurNote();
        this.initDate();
        this.initRigthOnNote();

    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    private initRigthOnNote() {
        if (this.note) {
            console.log(this.note);
            this.canDelete = true;
            this.canUpdated = true;
            this.canSign = true;
            this.canShowLecteur = true;
            this.canOpenFile = false;

            /* detecte les droits de suppression et de modification et d'affichage de la liste des lecteurs si il y en a */
            if (this.note[NotesInfoCte.FIELD.ATTRIBUTS] && this.note[NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.AUTEUR]
                && this.note[NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.AUTEUR][NotesInfoCte.FIELD.AUTEUR_NOM]) {
                if (this.note[NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.AUTEUR][NotesInfoCte.FIELD.CODE_INFO].valeur !== this.session.codeOperateur) {
                    this.canDelete = false;
                    this.canUpdated = false;
                    this.canShowLecteur = false;
                } else {
                    this.canSign = false;
                    /* c'est l'auteur de la note je cache l'icone de signer */
                }
            }

            /* affichage icone pour fichier attaché  */
            if (this.note[NotesInfoCte.FIELD.ATTRIBUTS] && this.note[NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.FICHIER]
            && this.note[NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.FICHIER].valeur) {
                this.canOpenFile = true;
            }


            this.lecteursDeLaNote = [];

            if (this.note[NotesInfoCte.FIELD.ATTRIBUTS] && this.note[NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.LECTEURS] &&
                this.note[NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.LECTEURS][NotesInfoCte.FIELD.NOTE_LECTEURS]) {
                let lecteurs = this.note[NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.LECTEURS][NotesInfoCte.FIELD.NOTE_LECTEURS];
                if (lecteurs && lecteurs.length > 0) {
                    for (let i = 0; i < lecteurs.length; i++) {
                        let lecteur = {
                            nom: lecteurs[i][NotesInfoCte.FIELD.LECTEUR_NOM].valeur,
                            prenom: lecteurs[i][NotesInfoCte.FIELD.LECTEUR_PRENOM].valeur,
                            date: this.metLadateDansLeBonFormat(lecteurs[i][NotesInfoCte.FIELD.LECTEUR_SIGNATURE].valeur),
                            codeInfo: lecteurs[i][NotesInfoCte.FIELD.LECTEUR_CODE_INFO].valeur
                        }
                        if (lecteur.codeInfo === this.session.codeOperateur) { /* ça veut dire qu'il a déjà signé la note je cache dont l'icone de signer */
                            this.canSign = false;
                        }
                        this.lecteursDeLaNote.push(lecteur);
                    }
                } else {
                    this.canShowLecteur = false;
                }
            } else {
                this.canShowLecteur = false;
            }
        }
    }

    private initDate() {
        if (this.note) {
            if (this.note[NotesInfoCte.FIELD.ATTRIBUTS] && this.note[NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.DATE]
                && this.note[NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.DATE].valeur) {
                this.date = this.metLadateDansLeBonFormat(this.note[NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.DATE].valeur);
            } else {
                this.date = this.note.codeInfo;
            }
        }
    }

    private metLadateDansLeBonFormat(dateFromBack:string) {
        let date = "";
        let annee = dateFromBack.substring(2, 4);
        let mois = dateFromBack.substring(5, 7);
        let jour = dateFromBack.substring(8, 10);
        let heure = dateFromBack.substring(11, 13);
        let minute = dateFromBack.substring(14, 16);
        date = jour + "/" + mois + "/" + annee + "-" + heure + ":" + minute;
        return date;
    }

    public initCouleurNote() {
        if (this.note) {
            if (this.note[NotesInfoCte.FIELD.ATTRIBUTS] && this.note[NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.COULEUR]) {
                switch (this.note[NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.COULEUR].valeur) {
                    case NotesInfoCte.COULEUR.JAUNE:
                        this.model.checkjaune = true;
                        this.classCss = "note jaune";
                        break;
                    case NotesInfoCte.COULEUR.VIOLET:
                        this.model.checkviolet = true;
                        this.classCss = "note violet";
                        break;
                    case NotesInfoCte.COULEUR.BLEU:
                        this.model.checkbleu = true;
                        this.classCss = "note bleu";
                        break;
                    default :
                        break;
                }
            } else {
                this.model.checkjaune = true;
                this.classCss = "note jaune";
            }
        }
    }

    public modifierNote() {
        this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, true);
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.noteModifierByOperateurEvent,
            content: this.note
        });
    }

    public saveModifierNote(file:any) {
        this.isUpdated = false;
        this.note[NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.COULEUR].valeur = this.model.checkviolet ? "violet" : (this.model.checkbleu ? "bleu" : "jaune");
        this.notesInfosService.creerOuModifierNote(this.note, file)
            .subscribe(response => {
                console.log(response);
            }
        )
    }

    public supprimerNote() {
        this.notesInfosService.supprimerNote(this.note.identifiant)
            .subscribe(response => {
                console.log(response);
            }
        );
    }

    public editerNote() {
        window.open(this.note[NotesInfoCte.FIELD.ATTRIBUTS][NotesInfoCte.FIELD.FICHIER].codeValeur);
    }

    public signerNote() {
        this.notesInfosService.signerNote(this.note.identifiant)
            .subscribe(response => {
                console.log(response);
            }
        );
    }

    public closeModifierNotePopup() {
        this.isUpdated = false;
    }

    public descriptionNoteChange($event) {
        this.note.description = $event.target.value;
    }

    public showLecteurs() {
        this.isShowLecteurs = true;
    }

    public openFile(){
        this.notesInfosService.openFile(this.note.identifiant)
            .subscribe(response => {
                var blob = new Blob(
                    [response._body], {
                        type: 'application/pdf'
                    });
                var url  = URL.createObjectURL(blob);
                window.open(url);
            }
        );
    }
}
