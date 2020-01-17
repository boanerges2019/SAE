import { NgModule } from '@angular/core';
import { SharedModule } from '../../../app/shared/shared.module';
import { AlerteModule } from '../alerte/alerte.module';
import { AnnuairesRoutingModule } from './annuaires.routes';

import { DetailsAnnuairesComponent } from './components/details-annuaires/details-annuaires.component';
import { ListeAnnuairesComponent } from './components/liste-annuaires/liste-annuaires.component';
import { AnnuairePageComponent } from './components/annuaires-page/annuaires-page.component';
import { AnnuaireService } from './services/annuaire.services';

@NgModule({
  imports: [
    SharedModule,
    AnnuairesRoutingModule,
    AlerteModule
  ],
  declarations: [
    ListeAnnuairesComponent,
    DetailsAnnuairesComponent,
    AnnuairePageComponent,
  ],
  exports: [
      DetailsAnnuairesComponent,
      ListeAnnuairesComponent
    ],
  providers: [
    AnnuaireService
  ]
})
export class AnnuairesModule { }
