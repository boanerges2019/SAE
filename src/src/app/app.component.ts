import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModeleEvenementService } from '../app/core/evenement/services/modele-evenement.service';
import {LoginService} from '../app/core/login/services/login.service'
import { EventManager } from '../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../app/shared/services/constantes/event-manager.constantes';
import { CacheService } from '../app/shared/services/cache/cache.service';
import { CacheConstantes } from '../app/shared/services/cache/cache.constantes';
import { Subscription } from 'rxjs/Rx';
import { LoginWebSocketService } from '../app/core/login/services/login-web-socket.service';
import { AstreinteWebsocketService } from './core/astreintes/services/astreintes-websocket.service';
import { EquipementWebsocketService} from '../app/core/strategies/services/equipement-websocket.service';
import { EquipementService} from '../app/core/strategies/services/equipement.service';
import { AppConstantesCte } from '../app/app.constantes';

@Component({
    selector: 'cesam-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    title = '';
    isLogging:boolean;
    isActifServeur:boolean;
    subscriptions:Subscription[] = [];
    messages:any[] = [];
    listeServeurs:any={};

    constructor(private modeleEvenementService:ModeleEvenementService,
                private loginService:LoginService,
                private eventManager:EventManager,
                private cacheService:CacheService,
                private router:Router,
                private loginWebSocketService:LoginWebSocketService,
                private astreinteWsService: AstreinteWebsocketService,
                private equipementWebsocketService : EquipementWebsocketService,
                private equipementService : EquipementService
    ) {
        const nomMethode = "AppComponent.constructor";
        console.info(nomMethode);
        this.subscriptionsVariablesConnexionChange();

        // si on se connecte via le composant login
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.sendSessionUserConnexion, (response) => {
            this.isLogging=true;
        }));

        /* La session utilisateur à changer notification websocket du backend */
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.sessionUserUpdatedFromWebSocket, (response) => {
            let session = response.content;
            let currentSession = this.cacheService.getObject(CacheConstantes.SESSION);
            if (currentSession && session.identifiant !== currentSession.identifiant) return;

            if (session && session.login) {
                this.getSaeVariablesConnexion();
            }else{
                this.getSaeVariablesConnexion();
            }
        }));
    }

    ngOnInit() {
        const nomMethode = "AppComponent.ngOnInit";
        this.cacheService.clearAll();
        this.modeleEvenementService.init(); // TODO à bouger
        console.info(nomMethode);
        this.isLogging=false;
        this.isActifServeur=false;
        this.getSaeVariablesConnexion();
    }

    private getSsccVariablesConnexion(){
        this.equipementService.getVariablesSsccConnexion().subscribe(response => {
            let variables = response;
            let findScc : boolean = false;
            for (let i = 0; i < variables.length; i++){
                if (variables[i][AppConstantesCte.FIELDS.VARIABLES][AppConstantesCte.FIELDS.SSCC_DPS_ACTIF].valeur == "1") {
                    // Je viens de trouver le SSCC Actif
                    this.cacheService.setObject(CacheConstantes.SSCC_ACTIF, variables[i][AppConstantesCte.FIELDS.VARIABLES][AppConstantesCte.FIELDS.SSCC_DPS_ACTIF].codeInfoObjetProprietaire);
                    findScc =true;
                    this.loginService.getSession()
                        .subscribe(response => {
                            const newSession = response;
                            if (newSession && newSession.login) {
                                this.storeSession(newSession);
                                this.router.navigate(['/situation-courante']);
                            }
                        },
                            error => {
                            console.log(error);
                            this.cacheService.clearAll();
                            this.isLogging = false;
                            this.router.navigate(['/login', true]);
                        },
                        () => { }
                    );
                    break;
                }
            }
            if(!findScc){
                this.loginService.getSession()
                    .subscribe(response => {
                        const newSession = response;
                        if (newSession && newSession.login) {
                            this.storeSession(newSession);
                        }
                    },
                        error => {
                        console.log(error);
                        this.cacheService.clearAll();
                        this.isLogging = false;
                        this.router.navigate(['/login']);
                    },
                    () => { }
                );
            }
        });
    }

    private getSaeVariablesConnexion() {
        let eqt = "EQP-SRVSAE1";
        this.equipementService.getVariablesSaeConnexion(eqt).subscribe(response => {
            let field = "EQP-SRVSAE1.SAE0.DPR.ETAT_ACTIF";
            let variable = response[field];
            if(variable.valeur=="1"){
                this.cacheService.setObject(CacheConstantes.SAE_ACTIF, variable);
                this.isActifServeur = true;
                this.getSsccVariablesConnexion();
            }else{
                eqt = "EQP-SRVSAE2";
                this.equipementService.getVariablesSaeConnexion(eqt).subscribe(response => {
                    let field = "EQP-SRVSAE2.SAE0.DPR.ETAT_ACTIF";
                    let variable = response[field];
                    if(variable.valeur=="1"){
                        this.cacheService.setObject(CacheConstantes.SAE_ACTIF, variable);
                        this.isActifServeur = true;
                        this.getSsccVariablesConnexion();
                    }
                });
            }
        });

        setTimeout(() => {
            if(!this.isActifServeur){
                this.router.navigate(['/lanceur_cesam']);
            }
        }, 10);
    }

    ngOnDestroy() {
        this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, null); // vide cache des données éventuellement non sauvegardées.
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    /**
     * recupere une session si elle existe au lancement de l'application
     */
    public getSession() {
        const nomMethode = 'AppComponent.getSession';
        console.info(nomMethode + ' début');

        const session = this.cacheService.getObject(CacheConstantes.SESSION);
        if (session) {
            console.info(nomMethode + ' session=>' + JSON.stringify(session));

            this.isLogging = true;
            this.sendSessionToBandeau(session);
        } else {
            this.loginService.getSession()
                .subscribe(response => {
                    const newSession = response;
                    if (newSession && newSession.login) {
                        this.storeSession(newSession);
                        this.router.navigate(['/situation-courante']);
                    }
                },
                error => {
                    console.log(error);
                    this.router.navigate(['/login']);
                    this.cacheService.clearAll();
                },
                () => { }
            );
        }

    }

    private storeSession(session:any){
        this.cacheService.setObject(CacheConstantes.SESSION, session);
        this.sendSessionToBandeau(session);
        this.isLogging = true;
    }

    private sendSessionToBandeau(session:any) {
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.sessionUserAlreadyExist,
            content: {session: session}
        });
    }


    private subscriptionsVariablesConnexionChange(){
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.variablesConnexionSaeUpdatedFromWebSocket, (response) => {
                let saeActif = this.cacheService.getObject(CacheConstantes.SAE_ACTIF);
                let ssccActif = this.cacheService.getObject(CacheConstantes.SSCC_ACTIF);
                let variablesConnexionChanges = response.content;
                variablesConnexionChanges.forEach(variable => {
                    switch (variable.codeModele){
                        case AppConstantesCte.FIELDS.SSCC_DPS_ACTIF :
                            if(variable.valeur=="1"){
                                if(!ssccActif){
                                    this.getSaeVariablesConnexion();
                                }else{

                                }
                            }else{
                                if(ssccActif && ssccActif===variable.codeInfoObjetProprietaire){
                                    this.getSaeVariablesConnexion();
                                }else {

                                }
                            }
                            break;
                        case AppConstantesCte.FIELDS.SAE_DPR_ETAT_ACTIF :
                            if(saeActif && variable.codeInfo===saeActif.codeInfo && variable.valeur=="0"){
                                this.isActifServeur = false;
                                this.router.navigate(['/lanceur_cesam']);
                            }
                            if(saeActif && variable.codeInfo===saeActif.codeInfo && variable.valeur=="1" && this.isActifServeur === false){
                                this.isActifServeur = true;
                                this.router.navigate(['/situation-courante']);
                            }
                            break;
                        default : break;
                    }
                });
            }));
    }



    private updateVariablesChange(){

    }



}
