import { Component, OnInit, Input } from '@angular/core';
import { CtxCte } from '../../../../../app/shared/services/constantes/ctx.constantes';
import { FieldMacroCommandeCte } from '../../../../../app/core/macro-commande/constantes/macro-commande.constantes';

@Component({
    selector: 'macro',
    templateUrl: './macro.component.html',
    styleUrls: ['./macro.component.scss']
})
export class MacroComponent implements OnInit {

    @Input() idEvenement:number;
    model:any = {}

    constructor() {
    }

    ngOnInit() {
        this.model.currentCtx = CtxCte.CTX.PAC_MACRO_COMMANDE;
        this.model.field = FieldMacroCommandeCte.FIELD;
        this.model.configCte = FieldMacroCommandeCte;
    }

}
