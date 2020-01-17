import { NgModule } from '@angular/core';
import { SharedModule } from '../../../app/shared/shared.module';
import { AlerteModule } from '../alerte/alerte.module';
import { MacroCommandeRoutingModule } from './macro-commande.routes';

import { MacroCommandeService } from './services/macro-commande.service';
import { MacroCommandeWebsocketService } from '../../../app/core/macro-commande/services/macro-commande-websocket.service';
import { GestionMacroCommandeComponent } from './components/gestion-macro-commande/gestion-macro-commande.component';
import { MacroCommandePageComponent } from './components/macro-commande-page/macro-commande-page.component';
import { MacroCommandeBase } from './components/macro-commande-base/macro-commande-base.component';


@NgModule({
    declarations: [
        GestionMacroCommandeComponent,
        MacroCommandePageComponent,
        MacroCommandeBase
    ],
    imports: [
        SharedModule,
        AlerteModule,
        MacroCommandeRoutingModule
    ],
    exports: [
        GestionMacroCommandeComponent
    ],
    providers: [
        MacroCommandeService,
        MacroCommandeWebsocketService
    ]
})
export class MacroCommandeModule {
}
