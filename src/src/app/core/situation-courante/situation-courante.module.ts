import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AlerteModule } from '../alerte/alerte.module';
import { EvenementModule } from '../evenement/evenement.module';
import { PlanActionModule } from '../plan-action/plan-action.module';
import { SituationCouranteRoutingModule } from './situation-courante.routes';

import { SituationCourantePageComponent } from './components/situation-courante-page/situation-courante-page.component';

@NgModule({
  declarations: [
    SituationCourantePageComponent
  ],
  imports: [
    SharedModule,
    AlerteModule,
    EvenementModule,
    PlanActionModule,
    SituationCouranteRoutingModule

  ],
  exports: [
    SituationCourantePageComponent,
    AlerteModule,
    EvenementModule,
    PlanActionModule,
    SituationCouranteRoutingModule
  ],
  providers: []
})
export class SituationCouranteModule { }
