import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AlerteModule } from '../alerte/alerte.module';
import { ViabiliteHivernaleRoutingModule } from './viabilite-hivernale.routes';

import { CircuitsVhComponent } from './components/circuits-vh/circuits-vh.component';
import { MeteoVhComponent } from './components/meteo-vh/meteo-vh.component';
import { RightVhComponent } from './components/right-vh/right-vh.component';
import { VehiculesSftrfComponent } from './components/vehicules-sftrf/vehicules-sftrf.component';
import { IntervenantsAstreinteComponent } from './components/intervenants-astreinte/intervenants-astreinte.component';
import { ViabiliteHivernalePageComponent } from './components/viabilite-hivernale-page/viabilite-hivernale-page.component';

import { ViabilitesHivernalesService } from './services/viabilites-hivernales.service';
import { ViabilitesHivernalesWebsocketService } from './services/viabilites-hivernales-websocket.service';

@NgModule({
  declarations: [
    CircuitsVhComponent,
    MeteoVhComponent,
    RightVhComponent,
    VehiculesSftrfComponent,
    IntervenantsAstreinteComponent,
    ViabiliteHivernalePageComponent
  ],
  imports: [
    SharedModule,
    AlerteModule,
    ViabiliteHivernaleRoutingModule
  ],
  exports: [
    CircuitsVhComponent,
    MeteoVhComponent,
    RightVhComponent,
    VehiculesSftrfComponent,
    IntervenantsAstreinteComponent
  ],
  providers: [
      ViabilitesHivernalesService,
      ViabilitesHivernalesWebsocketService
  ]
})
export class ViabiliteHivernaleModule { }
