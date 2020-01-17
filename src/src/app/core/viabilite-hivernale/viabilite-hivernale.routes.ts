import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViabiliteHivernalePageComponent } from './components/viabilite-hivernale-page/viabilite-hivernale-page.component';

const routes: Routes = [
  { path: 'viabilite-hivernale',  component: ViabiliteHivernalePageComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class ViabiliteHivernaleRoutingModule {}
