import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { StrategiesModule } from 'app/core/strategies/strategies.module';
import { BulletinsModule } from 'app/core/bulletins/bulletins.module';
import { ListePlanActionComponent } from 'app/core/plan-action/components/liste-plan-action/liste-plan-action.component';
import { MacroComponent } from 'app/core/plan-action/components/macro/macro.component';
import { CommunicationComponent } from 'app/core/plan-action/components/communication/communication.component';
import { StrategieTabComponent } from 'app/core/plan-action/components/strategie-tab/strategie-tab.component';
import { PlanActionComponent } from 'app/core/plan-action/components/plan-action/plan-action.component';
import { PlanActionService } from 'app/core/plan-action/services/plan-action.service';
import { PlanActionWebSocketService } from 'app/core/plan-action/services/plan-action-web-socket.service';
import { PacStatusComponent } from './components/pac-status/pac-status.component';


@NgModule({
    declarations: [
        ListePlanActionComponent,
        MacroComponent,
        CommunicationComponent,
        StrategieTabComponent,
        PlanActionComponent,
        PacStatusComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        StrategiesModule,
        BulletinsModule
    ],
    exports: [
        ListePlanActionComponent,
        MacroComponent,
        CommunicationComponent,
        StrategieTabComponent,
        PlanActionComponent,
        PacStatusComponent
    ],
    providers: [
        PlanActionService,
        PlanActionWebSocketService
    ]
})
export class PlanActionModule {
}
