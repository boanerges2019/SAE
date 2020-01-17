import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { SituationCouranteModule } from './situation-courante/situation-courante.module';
import { AnnuairesModule } from './annuaires/annuaires.module';
import { JournalAlertesModule } from './journal-alertes/journal-alertes.module';
import { AstreintesModule } from './astreintes/astreintes.module';
import { BulletinsModule } from './bulletins/bulletins.module';
import { MacroCommandeModule } from './macro-commande/macro-commande.module';
import { NotesInfosModule } from './notes-infos/notes-infos.module';
import { LoginModule } from './login/login.module';
import { LanceurCesamModule } from './lanceur-cesam/lanceur.cesam.module';
import { StrategiesModule } from './strategies/strategies.module';
import { ViabiliteHivernaleModule } from './viabilite-hivernale/viabilite-hivernale.module';
import { JournauxHistoriquesModule } from './journaux-historiques/journaux-historiques.module';

@NgModule({
    declarations: [],
    imports: [
        SharedModule,
        SituationCouranteModule,
        AnnuairesModule,
        AstreintesModule,
        BulletinsModule,
        JournalAlertesModule,
        MacroCommandeModule,
        NotesInfosModule,
        StrategiesModule,
        ViabiliteHivernaleModule,
        JournauxHistoriquesModule,
        LoginModule,
        LanceurCesamModule
    ],
    exports: [
        SituationCouranteModule,
        AnnuairesModule,
        AstreintesModule,
        BulletinsModule,
        JournalAlertesModule,
        MacroCommandeModule,
        NotesInfosModule,
        StrategiesModule,
        ViabiliteHivernaleModule,
        JournauxHistoriquesModule,
        LoginModule,
        LanceurCesamModule
    ],
    providers: []
})
export class CoreModule {
}
