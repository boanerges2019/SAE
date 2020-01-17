import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MacroCommandePageComponent } from './components/macro-commande-page/macro-commande-page.component';

const routes: Routes = [
  { path: 'macro-commande',  component: MacroCommandePageComponent },
    {path: 'macro-commande/:idMacro', component: MacroCommandePageComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class MacroCommandeRoutingModule {}
