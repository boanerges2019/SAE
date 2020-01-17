import { RequestOptionsArgs, Response } from '@angular/http';
import { LoginService } from 'app/core/login/services/login.service'
import { Observable } from 'rxjs/Observable';
import { HttpInterceptor } from 'app/shared/interceptors/http.interceptor';
import { EventManager } from 'app/shared/services/event/event-manager.service';
import { EventManagerCte } from 'app/shared/services/constantes/event-manager.constantes';
import { CacheService } from 'app/shared/services/cache/cache.service';
import { CacheConstantes } from 'app/shared/services/cache/cache.constantes';
import * as _ from 'underscore';

export class AuthenticationInterceptor extends HttpInterceptor {

    constructor(
        private eventManager: EventManager,
        private cacheService: CacheService,
        public loginService:LoginService
    ) {
        super();
    }

    requestIntercept(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (!this.cacheService) return options;
        let authenticatedUser  = this.cacheService.getObject(CacheConstantes.SESSION);

        if (!authenticatedUser || _.isEmpty(authenticatedUser)){
            if (!this.loginService) return options;
            this.loginService.goToLoginPage();
        }
        return options;
    }

    responseIntercept(observable: Observable<Response>): Observable<Response> {
      return observable;
    }
}
