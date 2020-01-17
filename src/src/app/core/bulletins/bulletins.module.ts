import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AlerteModule } from '../alerte/alerte.module';
import { BulletinsRoutingModule } from './bulletins.routes';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { BulletinsService } from './services/bulletins.service';
import { BulletinsWebsocketService } from './services/bulletins-websocket.service';


import { PreparationEnvoiPlanifieListComponent } from './components/preparation-envoi-planifies-list/preparation-envoi-planifies-list.component';
import { PreparationEnvoiListComponent } from './components/preparation-envoi-list/preparation-envoi-list.component';
import { PreparationEnvoiNewComponent } from './components/preparation-envoi-new/preparation-envoi-new.component';
import { PreparationEnvoiEditComponent } from './components/preparation-envoi-edit/preparation-envoi-edit.component';
import { PreparationEnvoiPlanificationComponent } from './components/preparation-envoi-planification/preparation-envoi-planification.component';
import { ApercuDocumentComponent } from './components/apercu-document/apercu-document.component';
import { BulletinsPageComponent } from './components/bulletins-page/bulletins-page.component';
import { CesamPdfViewerComponent } from './components/cesam-pdf-viewer/cesam-pdf-viewer.component';

@NgModule({
    declarations: [
        ApercuDocumentComponent,
        PreparationEnvoiPlanifieListComponent,
        PreparationEnvoiListComponent,
        PreparationEnvoiNewComponent,
        PreparationEnvoiEditComponent,
        PreparationEnvoiPlanificationComponent,
        BulletinsPageComponent,
        CesamPdfViewerComponent
    ],
    imports: [
        SharedModule,
        AlerteModule,
        BulletinsRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        PreparationEnvoiPlanifieListComponent,
        PreparationEnvoiListComponent,
        PreparationEnvoiNewComponent,
        PreparationEnvoiEditComponent,
        PreparationEnvoiPlanificationComponent,
        ApercuDocumentComponent,
        CesamPdfViewerComponent

    ],
    providers: [
        BulletinsService,
        BulletinsWebsocketService
    ]
})
export class BulletinsModule {
}
