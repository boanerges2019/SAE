import { Component, OnInit } from '@angular/core';
import { NotesInfoCte } from '../../../../../app/core/notes-infos/constantes/note-info.constantes';
import { CacheService } from '../../../../../app/shared/services/cache/cache.service';
import { CacheConstantes } from '../../../../../app/shared/services/cache/cache.constantes';
import { AbstractTab } from '../../../../shared/components/abstract-tab/abstract-tab';


@Component({
    selector: 'notes-infos-base',
    template:''
})
export class NotesInfosBaseComponent extends AbstractTab implements OnInit {

    model:any = {};
    isNotPermanente:boolean=false;
    session:any;

    constructor(protected cacheService:CacheService) {
        super();
        this.session = this.cacheService.getObject(CacheConstantes.SESSION);
    }

    ngOnInit() {
        this.model={};
        this.model.configCte = NotesInfoCte;
        this.model.checkjaune = false;
        this.model.checkbleu = false;
        this.model.checkviolet = false;
        this.isNotPermanente=false;
    }

    /**
     * on a choisit la couleur jaune
     */
    public selectJaune($event) {
        $event.stopPropagation();
        this.model.checkjaune = !this.model.checkjaune;
        this.model.checkbleu = false;
        this.model.checkviolet = false;
    }

    /**
     * on a choisit la couleur bleu
     */
    public selectBleu($event) {
        $event.stopPropagation();
        this.model.checkbleu = !this.model.checkbleu;
        this.model.checkjaune = false;
        this.model.checkviolet = false;
    }

    /**
     * on a choisit la couleur violet
     */
    public selectViolet($event) {
        $event.stopPropagation();
        this.model.checkviolet = !this.model.checkviolet;
        this.model.checkjaune = false;
        this.model.checkbleu = false;
    }

    public choicePermanente(){
        this.isNotPermanente= !this.isNotPermanente;
    }
}
