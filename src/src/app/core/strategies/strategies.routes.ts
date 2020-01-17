import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StrategiesPageComponent } from './components/strategies-page/strategies-page.component';

const routes: Routes = [
  { path: 'strategies',  component: StrategiesPageComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class StrategiesRoutingModule {}
