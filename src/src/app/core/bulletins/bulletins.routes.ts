import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BulletinsPageComponent } from './components/bulletins-page/bulletins-page.component';

const routes: Routes = [
  { path: 'bulletins',  component: BulletinsPageComponent },
    {path: 'bulletins/:idBulletin', component: BulletinsPageComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class BulletinsRoutingModule {}
