import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { LanceurCesamRoutingModule } from './lanceur.cesam.routes';
import { LanceurCesamComponent } from './components/lanceur.cesam.component';
import { LoginService } from 'app/core/login/services/login.service';
import { LoginWebSocketService } from 'app/core/login/services/login-web-socket.service';


@NgModule({
    declarations: [
        LanceurCesamComponent
    ],
    imports: [
        LanceurCesamRoutingModule
    ],
    exports: [
        LanceurCesamComponent
    ],
    providers: [

    ]
})
export class LanceurCesamModule {
}
