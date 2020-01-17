import { Injectable } from '@angular/core';
import { HttpInterceptor } from '../../../app/shared/interceptors/http.interceptor';
import { Http, ConnectionBackend, RequestOptions, RequestOptionsArgs, Request, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InterceptableHttp extends Http {
    private firstInterceptor: HttpInterceptor;

    constructor(
        backend: ConnectionBackend,
        defaultOptions: RequestOptions,
        interceptors: HttpInterceptor[]
    ) {
        super(backend, defaultOptions);

        /**
         * building a responsibility chain of http interceptors, so when processXXXInterception is called on first interceptor,
         * all http interceptors are called in a row
         * Note: the array of interceptors are wired in customHttpProvider of the generated Jhipster app in file `http.provider.ts`
         *
        */
        if (interceptors && interceptors.length > 0) {
            interceptors.reduce((chain, current) => {
                chain.successor = current;
                return current;
            });

            this.firstInterceptor = interceptors[0];
        }
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.request(url, this.getRequestOptionArgs(options)));
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.get(url, this.getRequestOptionArgs(options));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.post(url, body, this.getRequestOptionArgs(options));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.put(url, body, this.getRequestOptionArgs(options));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.delete(url, this.getRequestOptionArgs(options));
    }

    getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (!options) {
            options = new RequestOptions();
        }
        if (!options.headers) {
            options.headers = new Headers();
        }

        return !this.firstInterceptor ? options : this.firstInterceptor.processRequestInterception(options);
    }

    intercept(observable: Observable<Response>): Observable<Response> {
        return !this.firstInterceptor ? observable : this.firstInterceptor.processResponseInterception(observable);
    }
}
