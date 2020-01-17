import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JournauxHistoriquesPageComponent } from './components/journaux-historiques-page/journaux-historiques-page.component';

const routes: Routes = [
  { path: 'journaux-historiques',  component: JournauxHistoriquesPageComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class JournauxHistoriquesRoutingModule {}
