import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotesInfosPageComponent } from './components/notes-infos-page/notes-infos-page.component';

const routes: Routes = [
  { path: 'notes-infos',  component: NotesInfosPageComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class NotesInfosRoutingModule {}
