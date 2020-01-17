import { RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpInterceptor } from 'app/shared/interceptors/http.interceptor';
import { EventManager } from 'app/shared/services/event/event-manager.service';
import { EventManagerCte } from 'app/shared/services/constantes/event-manager.constantes';

export class ErrorHandlerInterceptor extends HttpInterceptor {

    constructor(private eventManager: EventManager) {
        super();
    }

    requestIntercept(options?: RequestOptionsArgs): RequestOptionsArgs {
        return options;
    }

    responseIntercept(observable: Observable<Response>): Observable<Response> {
      return <Observable<Response>> observable.catch((error) => {
          if ([200, 201].indexOf(error.status) < 0)  {
              this.eventManager.broadcast({
                  name: EventManagerCte.EVENT_NAME.cesamHttpError, content: { error: error }
              });
          }
          return Observable.throw(error);
      });
    }
}
