import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JournalAlertesPageComponent } from './components/journal-alertes-page/journal-alertes-page.component';

const routes:Routes = [
    {path: 'journal-alertes', component: JournalAlertesPageComponent},
    {path: 'journal-alertes/:idAlerte', component: JournalAlertesPageComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class JournalAlertesRoutingModule {
}
