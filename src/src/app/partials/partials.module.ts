import { NgModule } from '@angular/core';
import { SharedModule } from '../../app/shared/shared.module';
import { CoreModule } from '../../app/core/core.module';

//-- Composants structurels
import { BandeauComponent } from './bandeau/bandeau.component';
import { NavigationPrincipaleComponent } from './navigation-principale/navigation-principale.component';

// -- Services
import {BandeauService} from '../../app/partials/bandeau/services/bandeau.service'
import {BandeauWebsocketService} from '../../app/partials/bandeau/services/bandeau-websocket.service'

@NgModule({
  declarations: [
    NavigationPrincipaleComponent,
    BandeauComponent
  ],
  imports: [
    SharedModule,
    CoreModule,
  ],
  exports: [
    BandeauComponent,
    NavigationPrincipaleComponent,
  ],
  providers: [
      BandeauService,
      BandeauWebsocketService
  ]
})
export class PartialsModule { }
