import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SituationCourantePageComponent } from './components/situation-courante-page/situation-courante-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'situation-courante', pathMatch: 'full' },
  { path: 'situation-courante',  component: SituationCourantePageComponent },
  { path: 'balisages',  component: SituationCourantePageComponent },
  { path: 'balisages/:idEvenement/:edition',  component: SituationCourantePageComponent },
  { path: 'situation-courante/create-evenement-from-alerte',  component: SituationCourantePageComponent },
  //{ path: 'situation-courante/create-evenement-from-alerte/:idAlerteSource/:creation',  component: SituationCourantePageComponent },
  { path: 'situation-courante/evenement',  component: SituationCourantePageComponent },
  { path: 'situation-courante/evenement/:idEvenement',  component: SituationCourantePageComponent },
  { path: 'situation-courante/evenement/:idEvenement/:edition',  component: SituationCourantePageComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class SituationCouranteRoutingModule {}
