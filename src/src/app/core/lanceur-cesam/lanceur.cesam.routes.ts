import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LanceurCesamComponent } from './components/lanceur.cesam.component';

const routes: Routes = [
  { path: 'lanceur_cesam',  component: LanceurCesamComponent },
    { path: 'lanceur_cesam',  component: LanceurCesamComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class LanceurCesamRoutingModule {}
