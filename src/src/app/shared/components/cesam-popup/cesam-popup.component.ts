import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { EventManager } from '../../../../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../../app/shared/services/constantes/event-manager.constantes';
import { CacheService} from '../../../../app/shared/services/cache/cache.service';
import { CacheConstantes} from '../../../../app/shared/services/cache/cache.constantes';
import { BaseService } from '../../../../app/core/evenement/services/base.service';

/**
 * Gestion de popup d'avertissement
 * @author SPIE.
 */
@Component({
    selector: 'cesam-popup',
    templateUrl: './cesam-popup.component.html',
    styleUrls: ['./cesam-popup.component.scss']
})
export class CesamPopupComponent implements OnInit, OnDestroy {

    subscriptions:Subscription[] = [];
    header = "header";

    cancleBtnContent = "Non";
    confirmBtnContent = "Oui";
    visible:boolean = false;
    mainStyle:any;
    mainClass:any;
    options:any = {};
    wellStyle:any;
    cancelBtnStyle:any;
    confirmBtnStyle:any;

    constructor(private eventManager:EventManager,
                private cacheService:CacheService, private evenementService : BaseService) {
    }

    ngOnInit() {
        this.options.header = "Confirmation";
        this.options.cancleBtnContent = "Cancel";
        this.options.confirmBtnContent = "OK";
        this.options.cancleBtnContent = "Cancel";
        this.confirmBtnStyle = this.options.confirmBtnClass = "ng2-opd-popup-Button";
        this.cancelBtnStyle = this.options.cancleBtnClass = "ng2-opd-popup-Button";
        this.options.showButtons = true;
        this.options.color = "#2095f2"; //"#5cb85c"
        this.options.widthProsentage = "40%";
        this.options.marginLeft = (((this.options.widthProsentage - 100) / 2) * -1) + "%";
        this.options.animation = "fadeInDown";
        this.options.animationDuration = 1;

        ;
        this.mainStyle = {
            'border-color': this.options.color,
            'border-style': 'solid',
            'border-width': '1px',
            'width': this.options.widthProsentage,
            'margin-left': this.options.marginLeft
        };
        this.mainClass = "container ng2-opd-popup-content-main";
        this.wellStyle = {
            'border-color': this.options.color,
            'background-color': this.options.color,
            'border-style': 'solid',
            'border-width': "1px",
            'color': '#fff',
            'border-radius': '1px'
        };

        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.showPopup, (response) => {
                this.visible = true;
            }));
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }


    public confirmYes() {
        this.visible = false;
        let idEvtEdit = this.cacheService.getObject(CacheConstantes.ID_EVT_EDIT);

        if(idEvtEdit){
            this.subscriptions.push(this.evenementService.entrerOuSortirModeEdition(idEvtEdit, "FIN")
                .subscribe((resp) => {
                    this.cacheService.setObject(CacheConstantes.ID_EVT_EDIT, null);
                }));
        }

        this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, null); // vide cache des données éventuellement non sauvegardées.
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.confirmActionResponseYes,
            content: {}
        });
    }

    public confirmNo() {
        this.visible = false;
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.confirmActionResponseNo,
            content: {}
        });
    }


}
