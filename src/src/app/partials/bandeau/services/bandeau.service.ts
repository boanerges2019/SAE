import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Headers, Http, ResponseOptions } from '@angular/http';
import { Observable }  from 'rxjs/Observable';

@Injectable()
export class BandeauService {
    private baseUrl = `${environment.apiUrl}/agorav2`;  // URL to web api
    private headers;

    constructor(
        private http: Http) {
        this.headers = new Headers({ 'Content-Type': 'application/json'});
    }

    /**
     * Récupère la liste des notifications "A TRAITER"
     * @param mode
     * @returns {Observable<TResult>}
     */
    public getNotifications(mode?:string): Observable<any[]>{
        let url = `${this.baseUrl}/ppo/notifications_saes`;
        if (mode !== undefined) {
            url = `${this.baseUrl}/ppo/notifications_saes?mode=${mode}`;
        }
        return this.http.get(url).map(response => response.json());
    }

    /**
     * Récupère une notification par son identifiant
     * @param identifiant
     * @returns {Observable<TResult>}
     */
    public getNotificationByIdentifiant(identifiant:number): Observable<any>{
        let url = `${this.baseUrl}/ppo/notifications_saes/${identifiant}`;
        return this.http.get(url)
            .map((response) => {
                return response.json();
            });
    }

    /**
     * Mettre à jour une notification
     * @param notification
     * @returns {Observable<TResult>}
     */
    public updateNotification(notification: any):Observable<any> {
        let url = `${this.baseUrl}/ppo/notification_sae`;
        return this.http.put(url, notification, { headers: this.headers })
            .map(response => response);
    }

    /**
     * connexion de login
     * @param login
     * @returns {Observable<Response>}
     */
    public connexion(login:string, mdp:string):Observable<any>{
        let url = `${this.baseUrl}/ppo/connexion/${login}`;
        return this.http.post(url, mdp, { headers: this.headers });
    }

    /**
     * deconnexion
     * @param login
     * @returns {Observable<Response>}
     */
    public deconnexion():Observable<any>{
        const nomMethode = 'BandeauService.deconnexion';
        console.info(nomMethode);

        let url = `${this.baseUrl}/ppo/deconnexion`;
        return this.http.post(url, {}, { headers: this.headers });
    }

    /**
     * Recupère une session
     * @returns {Observable<TResult>}
     */
    public getSession(): Observable<any>{
        let url = `${this.baseUrl}/ppo/session`;
        return this.http.get(url)
            .map((response) => {
                return response.json();
            });

    }

    /**
     * Permet d'acquitter la notif dont l'id
     * est passée en paramètre
     * @param identifiantNotif
     */
   public acquitterNotificationsSae(identifiantNotif:number){
        let url = `${this.baseUrl}/ppo/notifications_saes/${identifiantNotif}/acquitter`;
        return this.http.post(url, {}, { headers: this.headers });
   }
}
