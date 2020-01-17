import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import {SessionSae} from '../../../../app/shared/models/generic/SessionSae';
import { Headers, Http, ResponseOptions, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import { Observable }  from 'rxjs/Observable';

@Injectable()
export class LoginService {
    private baseUrl = `${environment.apiUrl}/agorav2/ppo`;  // URL to web api
    private headers;


    constructor(
        private http: Http,
        private router: Router) {
        this.headers = new Headers({ 'Content-Type': 'application/json'});
    }


    /**
     * connexion de login
     * @param login
     * @returns {Observable<Response>}
     */
    public connexion(login:string, mdp:string):Observable<any>{
        let url = `${this.baseUrl}/connexion?login=${login}`;
         return this.http.post(url,mdp);
    }

    /**
     * deconnexion
     * @param login
     * @returns {Observable<Response>}
     */
    public deconnexion():Observable<any>{
        let url = `${this.baseUrl}/deconnexion`;
        return this.http.post(url, {}, { headers: this.headers });
    }

    /**
     * Recupère une session
     * @returns {Observable<TResult>}
     */
    public getSession(): Observable<any>{

        const nomMethode = 'LoginService.getSession';
        console.info(nomMethode + ' début');

        let url = `${this.baseUrl}/session`;

        const retour  = this.http.get(url)
            .map((response) => {
                return response.json();
            });

        console.info(nomMethode + ' : retour = ' + retour);

        return retour;

    }


    public goToLoginPage(){
        this.router.navigate(['/login']);
    }
}
