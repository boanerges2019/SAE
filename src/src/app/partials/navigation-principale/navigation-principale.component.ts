import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { EventManager } from '../../../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../app/shared/services/constantes/event-manager.constantes';
import { Subscription } from 'rxjs/Rx';

@Component({
    selector: 'navigation-principale',
    templateUrl: './navigation-principale.component.html',
    styleUrls: ['./navigation-principale.component.scss']
})
export class NavigationPrincipaleComponent implements OnInit, OnDestroy {

    subscriptions:Subscription[] = [];
    menuSelected:boolean[] = [];
    nbrMenus:number;

    constructor(private router:Router,
                public eventManager:EventManager) {

    }

    ngOnInit() {
        this.nbrMenus = 11;
        this.menuSelected = [];
        for (let i = 0; i < this.nbrMenus; i++) {
            this.menuSelected.push(false);
        }
        this.menuSelected[0]=true;
        this.resolveNotificationAcquittementSubscription();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    /**
     *Débranche sur le lien clicqué.
     * @param  {string} link cible
     * @return {[type]}      [description]
     */
    gotoLink(link:string) {
        switch (link) {
            case 'situation-courante':
                this.router.navigate(['/']);
                this.selectedMenu(0);
                break;
            case 'journal-alertes':
                this.router.navigate(['/journal-alertes']);
                this.selectedMenu(1);
                break;
            case 'strategies':
                this.router.navigate(['/strategies']);
                this.selectedMenu(2);
                break;
            case 'macro-commande':
                this.router.navigate(['/macro-commande']);
                this.selectedMenu(3);
                break;
            case 'bulletins':
                this.router.navigate(['/bulletins']);
                this.selectedMenu(4);
                break;
            case 'balisages':
                this.router.navigate(['/balisages', {type: 'BAL'}]);
                this.selectedMenu(5);
                break;
            case 'viabilite-hivernale':
                this.router.navigate(['/viabilite-hivernale']);
                this.selectedMenu(6);
                break;
            case 'astreintes':
                this.router.navigate(['/astreintes']);
                this.selectedMenu(7);
                break;
            case 'annuaires':
                this.router.navigate(['/annuaires']);
                this.selectedMenu(8);
                break;
            case 'journaux-historiques':
                this.router.navigate(['/journaux-historiques']);
                this.selectedMenu(9);
                break;
            case 'notes-infos':
                this.router.navigate(['/notes-infos']);
                this.selectedMenu(10);
                break;
            default:
                this.router.navigate(['/']);
                this.selectedMenu(0);
                break;
        }
    }

    private selectedMenu(index:number) {
        for (let i = 0; i < this.nbrMenus; i++) {
            if (i === index) {
                this.menuSelected[i] = true;
            } else {
                this.menuSelected[i] = false;
            }
        }
    }

    /**
     * Ecoute et résoud toutes les notifications acquités
     * En positionnant le menu au bon endroit
     */
    private resolveNotificationAcquittementSubscription() {
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.selectSituationCouranteInMenuPrincipaleEvent, (response) => {
                if(response && response.content && response.content.indexOf("balisages")!==-1 ){
                    this.selectedMenu(5);
                }else{
                    this.selectedMenu(0);
                }
            }));
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.selectJournalAlerteInMenuPrincipaleEvent, (response) => {
                this.selectedMenu(1);
            }));
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.selectStrategieAffichageInMenuPrincipaleEvent, (response) => {
                this.selectedMenu(2);
            }));

        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.selectMacroCommandeInMenuPrincipaleEvent, (response) => {
                this.selectedMenu(3);
            }));
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.selectBulletinsInMenuPrincipaleEvent, (response) => {
                this.selectedMenu(4);
            }));
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.selectViabiltesHivernalesInMenuPrincipaleEvent, (response) => {
                this.selectedMenu(6);
            }));
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.selectAstreintesInMenuPrincipaleEvent, (response) => {
                this.selectedMenu(7);
            }));
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.selectAnnuairesInMenuPrincipaleEvent, (response) => {
                this.selectedMenu(8);
            }));
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.selectJournauxHistoriquesInMenuPrincipaleEvent, (response) => {
                this.selectedMenu(9);
            }));
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.selectNotesInfosInMenuPrincipaleEvent, (response) => {
                this.selectedMenu(10);
            }));
    }

}
