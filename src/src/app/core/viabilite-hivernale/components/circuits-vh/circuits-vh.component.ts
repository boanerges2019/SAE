import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { ViabilitesHivernalesService } from '../../services/viabilites-hivernales.service';
import { ViabilitesHivernalesWebsocketService } from '../../services/viabilites-hivernales-websocket.service';
import { ViabilitesHivernalesServiceCte } from '../../constantes/viabilites-hivernales.constante';
import { EventManager } from 'app/shared/services/event/event-manager.service';
import { EventManagerCte } from 'app/shared/services/constantes/event-manager.constantes';
import { EnumerationsService } from 'app/shared/services/reference/enumerations.service';
import { CtxCte } from 'app/shared/services/constantes/ctx.constantes';


@Component({
    selector: 'circuits-vh',
    templateUrl: './circuits-vh.component.html',
    styleUrls: ['./circuits-vh.component.scss']
})
export class CircuitsVhComponent implements OnInit, OnDestroy {

    subscriptions:Subscription[] = [];
    circuits:any={};
    model:any={};
    condChaussees:any[]=[];
    eqpSpeciaux:any[]=[];
    etatChaussees:any[]=[];
    etatTraitements:any[]=[];
    meteos:any[]=[];
    tendancesCC:any[]=[];
    vents:any[]=[];
    isValid:boolean=true;

    constructor(private viabilitesHivernalesService:ViabilitesHivernalesService,
                private viabilitesHivernalesWebsocketService:ViabilitesHivernalesWebsocketService,
                private eventManager : EventManager, private enumerationsService:EnumerationsService) {

    }

    ngOnInit() {
        this.model.field = ViabilitesHivernalesServiceCte.FIELDS;
        this.model.currentCtx = CtxCte.CTX.VIABILITE_HIVERNALES;
        this.model.contexte = CtxCte.CTX;
        this.model.configCte =  ViabilitesHivernalesServiceCte;
        this.recupereCircuits();
        this.initSubscriptionViabiliteHivernale();
        this.initValeursParametres();
    }

    private initValeurParametre(codeInfo : any, listParam : any[]){
        this.enumerationsService.getValeursPossiblesByCodeInfoEnumerations(codeInfo)
            .subscribe(response => {
                response.forEach(valeurEnum => {
                    let val = {
                        nom: valeurEnum.nom,
                        description: valeurEnum.description,
                        codeInfo: valeurEnum.codeInfo,
                        valeur: valeurEnum.valeur,
                        id: valeurEnum.codeInfo,
                        text: valeurEnum.nom
                    };
                    listParam.push(val);
                });
            });

    }

    initValeursParametres(){
       this.initValeurParametre(ViabilitesHivernalesServiceCte.VALEURS_ENUMERATIONS.VH_COND_CHAUSSEE,this.condChaussees);
        this.initValeurParametre(ViabilitesHivernalesServiceCte.VALEURS_ENUMERATIONS.VH_EQP_SPECIAUX,this.eqpSpeciaux);
        this.initValeurParametre(ViabilitesHivernalesServiceCte.VALEURS_ENUMERATIONS.VH_ETAT_CHAUSSEE,this.etatChaussees);
        this.initValeurParametre(ViabilitesHivernalesServiceCte.VALEURS_ENUMERATIONS.VH_ETAT_TRAITEMENT,this.etatTraitements);
        this.initValeurParametre(ViabilitesHivernalesServiceCte.VALEURS_ENUMERATIONS.VH_METEO,this.meteos);
        this.initValeurParametre(ViabilitesHivernalesServiceCte.VALEURS_ENUMERATIONS.VH_TENDANCE_CC,this.tendancesCC);
        this.initValeurParametre(ViabilitesHivernalesServiceCte.VALEURS_ENUMERATIONS.VH_VENT,this.vents);
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    private recupereCircuits() {
        this.subscriptions.push(this.viabilitesHivernalesService.recupereCircuits()
            .subscribe(response => {
                this.circuits = response;
                for (let i = 0; i < this.circuits.circuits.length; i++) {
                    for (let key in this.circuits.circuits[i]) {
                        if (!this.circuits.circuits[i][key]) {
                            this.circuits.circuits[i][key] = " - ";
                        }
                    }
                }
            }, error => {
                console.log("Erreur lors de la récupération des circuits");
            }
        ));
    }

    public mettreAjourCircuits() {
        this.subscriptions.push(this.viabilitesHivernalesService.mettreAjourEtatsCircuits(this.circuits)
            .subscribe(response => {
                console.log("Mise à jour circuits ok");
            }, error => {
                console.log("Erreur lors de la récupération des circuits");
            }
        ));
    }

    public envoiDonnees() {
        this.subscriptions.push(this.viabilitesHivernalesService.envoiDonnees()
            .subscribe(response => {

            }, error => {
                console.log("Erreur lors de l'envoi des données");
            }
        ));
    }

    public envoiReseau() {
        this.subscriptions.push(this.viabilitesHivernalesService.envoiReseau()
            .subscribe(response => {

            }, error => {
                console.log("Erreur lors de l'envoi réseau");
            }
        ));
    }

    private initSubscriptionViabiliteHivernale(){
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.viabilitesHivernalesUpdatedFromWebSocket, (response) => {
                if(response.content && response.content.circuits){
                    if(response.content.circuits[ViabilitesHivernalesServiceCte.FIELDS.CIRCUIT_1]){
                        this.circuits[ViabilitesHivernalesServiceCte.FIELDS.CIRCUIT_1] = response.content[ViabilitesHivernalesServiceCte.FIELDS.CIRCUIT_1];
                    }
                    if(response.content.circuits[ViabilitesHivernalesServiceCte.FIELDS.CIRCUIT_2]){
                        this.circuits[ViabilitesHivernalesServiceCte.FIELDS.CIRCUIT_2] = response.content[ViabilitesHivernalesServiceCte.FIELDS.CIRCUIT_2];
                    }
                }
            }));
    }

    public temperatureChange2(){
        this.isValid = true;
       let temp = parseInt(this.circuits.circuits[this.model.configCte.FIELDS.CIRCUIT_2].temperature);
        if(isNaN(temp)){
            this.isValid = false;
        }else{
            if(this.circuits.circuits[this.model.configCte.FIELDS.CIRCUIT_2].temperature < -100 || this.circuits.circuits[this.model.configCte.FIELDS.CIRCUIT_2].temperature>100){
                this.isValid = false;
            }
        }
    }

    public temperatureChange1(){
        this.isValid = true;
        let temp = parseInt(this.circuits.circuits[this.model.configCte.FIELDS.CIRCUIT_1].temperature);
        if(isNaN(temp)){
            this.isValid = false;
        }else{
            if(this.circuits.circuits[this.model.configCte.FIELDS.CIRCUIT_1].temperature < -100 || this.circuits.circuits[this.model.configCte.FIELDS.CIRCUIT_1].temperature>100){
                this.isValid = false;
            }
        }

    }

}
