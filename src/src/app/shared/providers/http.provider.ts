import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { LoginService } from 'app/core/login/services/login.service'
import { EventManager } from 'app/shared/services/event/event-manager.service';
import { InterceptableHttp } from 'app/shared//http/interceptable.http';
import { ErrorHandlerInterceptor } from 'app/shared/interceptors/error-handler.interceptor';
import { AuthenticationInterceptor } from 'app/shared/interceptors/auth.interceptor';
import { CacheService } from 'app/shared/services/cache/cache.service';


export function interceptableFactory(
        backend: XHRBackend,
        defaultOptions: RequestOptions,
        eventManager: EventManager,
        loginService: LoginService,
        cacheService: CacheService
     ){
  return new InterceptableHttp(
    backend,
    defaultOptions,
    [
      new ErrorHandlerInterceptor(eventManager),
      new AuthenticationInterceptor(eventManager, cacheService, loginService)
    ]
  )
}


export function customHttpProvider() {
  return {
    provide: Http,
    useFactory: interceptableFactory,
    deps: [
      XHRBackend,
      RequestOptions,
      EventManager
    ]
  }
}
