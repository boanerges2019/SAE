import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../app/shared/shared.module';

import { BaseService } from '../../../app/core/evenement/services/base.service';
import { GroupeService } from '../../../app/core/evenement/services/groupe.service';
import { EvenementWebsocketService } from '../../../app/core/evenement/services/evenement-websocket.service';
import { ModeleEvenementService } from '../../../app/core/evenement/services/modele-evenement.service';

import { ListeEvenementComponent } from '../../../app/core/evenement/components/liste-evenement/liste-evenement.component';
import { BalisageWrapperComponent } from '../../../app/core/evenement/components/balisage-wrapper/balisage-wrapper.component';
import { EvenementComponent } from '../../../app/core/evenement/components/evenement/evenement.component';
import { EvenementCommunComponent } from '../../../app/core/evenement/components/evenement-commun/evenement-commun.component';
import { EvenementLocalisationComponent } from '../../../app/core/evenement/components/evenement-localisation/evenement-localisation.component';
import { EvenementEmpriseComponent } from '../../../app/core/evenement/components/evenement-emprise/evenement-emprise.component';
import { EvenementLiensComponent } from '../../../app/core/evenement/components/evenement-liens/evenement-liens.component';
import { EvenementDepanneurComponent } from '../../../app/core/evenement/components/evenement-depanneur/evenement-depanneur.component';
import { EvenementExploitationComponent } from '../../../app/core/evenement/components/evenement-exploitation/evenement-exploitation.component';
import { EvenementSecoursComponent } from '../../../app/core/evenement/components/evenement-secours/evenement-secours.component';
import { EvenementSftrfComponent } from '../../../app/core/evenement/components/evenement-sftrf/evenement-sftrf.component';
import { EvenementCommentaireComponent } from '../../../app/core/evenement/components/evenement-commentaire/evenement-commentaire.component';
import { AccidentCaracteristiquesComponent } from '../../../app/core/evenement/components/specifique/accident/accident-caracteristiques/accident-caracteristiques.component';
import { AccidentIndustrielCaracteristiquesComponent } from '../../../app/core/evenement/components/specifique/accident-industriel/accident-industriel-caracteristiques/accident-industriel-caracteristiques.component';
import { AlerteEnlevementCaracteristiquesComponent } from '../../../app/core/evenement/components/specifique/alerte-enlevement/alerte-enlevement-caracteristiques/alerte-enlevement-caracteristiques.component';
import { AlternatCaracteristiquesComponent } from '../../../app/core/evenement/components/specifique/alternat/alternat-caracteristiques/alternat-caracteristiques.component';
import { AnimalCaracteristiquesComponent } from '../../../app/core/evenement/components/specifique/animal/animal-caracteristiques/animal-caracteristiques.component';
import { BasculementCaracteristiquesComponent } from '../../../app/core/evenement/components/specifique/basculement/basculement-caracteristiques/basculement-caracteristiques.component';
import { BouchonCaracteristiquesComponent } from '../../../app/core/evenement/components/specifique/bouchon/bouchon-caracteristiques/bouchon-caracteristiques.component';
import { ContresensCaracteristiquesComponent } from '../../../app/core/evenement/components/specifique/contresens/contresens-caracteristiques/contresens-caracteristiques.component';
import { ConvoiCaracteristiquesComponent } from '../../../app/core/evenement/components/specifique/convoi/convoi-caracteristiques/convoi-caracteristiques.component';
import { CrueCaracteristiquesComponent } from '../../../app/core/evenement/components/specifique/crue/crue-caracteristiques/crue-caracteristiques.component';
import { EboulementCaracteristiquesComponent } from '../../../app/core/evenement/components/specifique/eboulement/eboulement-caracteristiques/eboulement-caracteristiques.component';
import { FermetureCaracteristiquesComponent } from '../../../app/core/evenement/components/specifique/fermeture/fermeture-caracteristiques/fermeture-caracteristiques.component';
import { FuiteCaracteristiquesComponent } from '../../../app/core/evenement/components/specifique/fuite/fuite-caracteristiques/fuite-caracteristiques.component';
import { HorsGabaritCaracteristiquesComponent } from '../../../app/core/evenement/components/specifique/hors-gabarit/hors-gabarit-caracteristiques/hors-gabarit-caracteristiques.component';
import { IncendieCaracteristiquesComponent } from '../../../app/core/evenement/components/specifique/incendie/incendie-caracteristiques/incendie-caracteristiques.component';
import { IncendieBatimentCaracteristiquesComponent } from '../../../app/core/evenement/components/specifique/incendie-batiment/incendie-batiment-caracteristiques/incendie-batiment-caracteristiques.component';
import { InformationCaracteristiquesComponent } from '../../../app/core/evenement/components/specifique/information/information-caracteristiques/information-caracteristiques.component';
import { MalveillanceCaracteristiquesComponent } from '../../../app/core/evenement/components/specifique/malveillance/malveillance-caracteristiques/malveillance-caracteristiques.component';
import { ManifestationCaracteristiquesComponent } from '../../../app/core/evenement/components/specifique/manifestation/manifestation-caracteristiques/manifestation-caracteristiques.component';
import { MeteoCaracteristiquesComponent } from '../../../app/core/evenement/components/specifique/meteo/meteo-caracteristiques/meteo-caracteristiques.component';
import { ObstacleCaracteristiquesComponent } from '../../../app/core/evenement/components/specifique/obstacle/obstacle-caracteristiques/obstacle-caracteristiques.component';
import { PersonneCaracteristiquesComponent } from '../../../app/core/evenement/components/specifique/personne/personne-caracteristiques/personne-caracteristiques.component';
import { PlanCaracteristiquesComponent } from '../../../app/core/evenement/components/specifique/plan/plan-caracteristiques/plan-caracteristiques.component';
import { PollutionCaracteristiquesComponent } from '../../../app/core/evenement/components/specifique/pollution/pollution-caracteristiques/pollution-caracteristiques.component';
import { ReseauAreaCaracteristiquesComponent } from '../../../app/core/evenement/components/specifique/reseau-area/reseau-area-caracteristiques/reseau-area-caracteristiques.component';
import { SecoursCaracteristiquesComponent } from '../../../app/core/evenement/components/specifique/secours/secours-caracteristiques/secours-caracteristiques.component';
import { StockageCaracteristiquesComponent } from '../../../app/core/evenement/components/specifique/stockage/stockage-caracteristiques/stockage-caracteristiques.component';
import { TravauxCaracteristiquesComponent } from '../../../app/core/evenement/components/specifique/travaux/travaux-caracteristiques/travaux-caracteristiques.component';
import { ViabiliteCaracteristiquesComponent } from '../../../app/core/evenement/components/specifique/viabilite/viabilite-caracteristiques/viabilite-caracteristiques.component';
import { VehiculeCaracteristiquesComponent } from '../../../app/core/evenement/components/specifique/vehicule/vehicule-caracteristiques/vehicule-caracteristiques.component';
import { BalisageCaracteristiquesComponent } from '../../../app/core/evenement/components/specifique/balisage/balisage-caracteristiques/balisage-caracteristiques.component';
import { EvenementNouveauComponent } from '../../../app/core/evenement/components/evenement-nouveau/evenement-nouveau.component';
import { VehiculesComponent } from '../../../app/core/evenement/components/specifique/vehicules/vehicules.component';
import { ImpliquesComponent } from '../../../app/core/evenement/components/specifique/impliques/impliques.component';

import { CheckSousEmpriseDirective } from '../../../app/core/evenement/components/evenement-emprise/check-sous-emprise.directive';
import { CirculationTunnelCaracteristiquesComponent } from './components/specifique/circulation-tunnel/circulation-tunnel-caracteristiques/circulation-tunnel-caracteristiques.component';

@NgModule({
  declarations: [
    ListeEvenementComponent,
    BalisageWrapperComponent,
    EvenementCommunComponent,
    EvenementComponent,
    EvenementLocalisationComponent,
    EvenementEmpriseComponent,
    EvenementLiensComponent,
    EvenementDepanneurComponent,
    EvenementExploitationComponent,
    EvenementSecoursComponent,
    EvenementSftrfComponent,
    EvenementCommentaireComponent,
    EvenementNouveauComponent,
    AccidentCaracteristiquesComponent,
    AccidentIndustrielCaracteristiquesComponent,
    AlerteEnlevementCaracteristiquesComponent,
    AlternatCaracteristiquesComponent,
    AnimalCaracteristiquesComponent,
    BasculementCaracteristiquesComponent,
    BouchonCaracteristiquesComponent,
    ContresensCaracteristiquesComponent,
    ConvoiCaracteristiquesComponent,
    CrueCaracteristiquesComponent,
    EboulementCaracteristiquesComponent,
    FermetureCaracteristiquesComponent,
    FuiteCaracteristiquesComponent,
    HorsGabaritCaracteristiquesComponent,
    IncendieCaracteristiquesComponent,
    IncendieBatimentCaracteristiquesComponent,
    InformationCaracteristiquesComponent,
    MalveillanceCaracteristiquesComponent,
    ManifestationCaracteristiquesComponent,
    MeteoCaracteristiquesComponent,
    ObstacleCaracteristiquesComponent,
    PersonneCaracteristiquesComponent,
    PlanCaracteristiquesComponent,
    PollutionCaracteristiquesComponent,
    ReseauAreaCaracteristiquesComponent,
    SecoursCaracteristiquesComponent,
    StockageCaracteristiquesComponent,
    TravauxCaracteristiquesComponent,
    ViabiliteCaracteristiquesComponent,
    VehiculeCaracteristiquesComponent,
    BalisageCaracteristiquesComponent,
    VehiculesComponent,
    ImpliquesComponent,
    CheckSousEmpriseDirective,
    CirculationTunnelCaracteristiquesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    ListeEvenementComponent,
    EvenementCommunComponent,
    EvenementComponent,
    BalisageWrapperComponent,
    EvenementLocalisationComponent,
    EvenementEmpriseComponent,
    EvenementLiensComponent,
    EvenementDepanneurComponent,
    EvenementExploitationComponent,
    EvenementSecoursComponent,
    EvenementSftrfComponent,
    EvenementCommentaireComponent,
    EvenementNouveauComponent,
    AccidentCaracteristiquesComponent,
    AccidentIndustrielCaracteristiquesComponent,
    AlerteEnlevementCaracteristiquesComponent,
    AlternatCaracteristiquesComponent,
    AnimalCaracteristiquesComponent,
    BasculementCaracteristiquesComponent,
    BouchonCaracteristiquesComponent,
    ContresensCaracteristiquesComponent,
    ConvoiCaracteristiquesComponent,
    CrueCaracteristiquesComponent,
    EboulementCaracteristiquesComponent,
    FermetureCaracteristiquesComponent,
    FuiteCaracteristiquesComponent,
    HorsGabaritCaracteristiquesComponent,
    IncendieCaracteristiquesComponent,
    IncendieBatimentCaracteristiquesComponent,
    InformationCaracteristiquesComponent,
    MalveillanceCaracteristiquesComponent,
    ManifestationCaracteristiquesComponent,
    MeteoCaracteristiquesComponent,
    ObstacleCaracteristiquesComponent,
    PersonneCaracteristiquesComponent,
    PlanCaracteristiquesComponent,
    PollutionCaracteristiquesComponent,
    ReseauAreaCaracteristiquesComponent,
    SecoursCaracteristiquesComponent,
    StockageCaracteristiquesComponent,
    TravauxCaracteristiquesComponent,
    ViabiliteCaracteristiquesComponent,
    VehiculeCaracteristiquesComponent,
    VehiculesComponent,
    ImpliquesComponent,
    CheckSousEmpriseDirective,
  ],
  providers: [
    BaseService,
    GroupeService,
    EvenementWebsocketService,
    ModeleEvenementService,
  ]
})
export class EvenementModule { }
