import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { CtxCte } from 'app/shared/services/constantes/ctx.constantes';

@Component({
    selector: 'strategie-tab',
    templateUrl: './strategie-tab.component.html',
    styleUrls: ['./strategie-tab.component.scss']
})
export class StrategieTabComponent implements OnInit {

    model:any = {};
    subscriptions:Subscription[] = [];
    @Input() idEvenement:number;

    constructor() {
    }

    ngOnInit() {
        this.model.contexte = CtxCte.CTX;
        this.model.currentCtx = CtxCte.CTX.PAC_LIST_STRATEGIE;
    }
}
