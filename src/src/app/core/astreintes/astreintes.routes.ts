import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AstreintesPageComponent } from './components/astreintes-page/astreintes-page.component';

const routes: Routes = [
  { path: 'astreintes',  component: AstreintesPageComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class AstreintesRoutingModule {}
