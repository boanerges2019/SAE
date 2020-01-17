import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnnuairePageComponent } from './components/annuaires-page/annuaires-page.component';

const routes: Routes = [
  { path: 'annuaires',  component: AnnuairePageComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class AnnuairesRoutingModule {}
