import { NgModule } from '@angular/core';
import { SharedModule } from '../../../app/shared/shared.module';
import { AlerteModule } from '../alerte/alerte.module';
import { AstreintesRoutingModule } from './astreintes.routes';

import { SuiviAstreintesComponent } from './components/suivi-astreintes/suivi-astreintes.component';
import { DiffusionsMessageComponent } from './components/diffusions-message/diffusions-message.component';
import { AstreintesPageComponent } from './components/astreintes-page/astreintes-page.component';
import { AstreinteService } from './services/astreintes.service';
import { AnnuairesModule } from '../annuaires/annuaires.module';
import { AstreinteWebsocketService } from './services/astreintes-websocket.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DiffusionsMessageComponent,
    SuiviAstreintesComponent,
    AstreintesPageComponent
  ],
  imports: [
    FormsModule,
    SharedModule,
    AlerteModule,
    AstreintesRoutingModule,
    AnnuairesModule
  ],
  exports: [
    SuiviAstreintesComponent,
    DiffusionsMessageComponent
    
  ],
  providers: [
    AstreinteService,
    AstreinteWebsocketService
  ]
})
export class AstreintesModule { }
