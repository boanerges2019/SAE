import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { LoginRoutingModule } from './login.routes';
import { LoginComponent } from './components/login.component';
import { LoginService } from 'app/core/login/services/login.service';
import { LoginWebSocketService } from 'app/core/login/services/login-web-socket.service';


@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        LoginRoutingModule
    ],
    exports: [
        LoginComponent
    ],
    providers: [
        LoginService,
        LoginWebSocketService
    ]
})
export class LoginModule {
}
