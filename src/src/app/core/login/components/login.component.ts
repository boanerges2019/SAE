import { Component, NgZone} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'app/core/login/services/login.service'
import { EventManager } from 'app/shared/services/event/event-manager.service';
import { EventManagerCte } from 'app/shared/services/constantes/event-manager.constantes';
import { CacheService } from 'app/shared/services/cache/cache.service';
import { CacheConstantes } from 'app/shared/services/cache/cache.constantes';

@Component({
    selector: 'cesam-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    login:string="";
    mdp:string="";
    notShowFormLogin:boolean=false;

    constructor(public router: Router, private loginService:LoginService,
                private eventManager:EventManager, private cacheService:CacheService,
                private _ngZone: NgZone, private route:ActivatedRoute) {

        this.route.params.subscribe(params => {
            this.notShowFormLogin = params['notShowFormLogin'];
        });

    }

    public connexion() {
        this.loginService.connexion(this.login, this.mdp)
            .subscribe(response => {
                this.loginService.getSession()
                    .subscribe(response => {
                        let session = response;
                        if (session && session.login) {
                            this.cacheService.setObject(CacheConstantes.SESSION, session);
                            this.sendConnexionSessionToAppComponent(session);
                            this.router.navigate(['/situation-courante']);
                        }
                    }
                );

            });
    }

    private sendConnexionSessionToAppComponent(session:any) {
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.sendSessionUserConnexion,
            content: {session: session}
        });
    }
}
