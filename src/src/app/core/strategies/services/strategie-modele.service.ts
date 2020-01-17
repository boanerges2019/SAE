import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Headers, RequestOptions, RequestMethod,  Http, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import * as _ from 'underscore';
import { StrategiesService } from './strategies.service';
import { environment } from 'environments/environment';

// TODO à supprimer
import { PICTOGRAMMES } from './mocks/mock-pictogrammes';
import { CacheService} from 'app/shared/services/cache/cache.service';
import { CacheConstantes} from 'app/shared/services/cache/cache.constantes';


@Injectable()
export class StrategieModelService {

    private subscriptions:Subscription[] = [];

    public static BASE_URL = `${environment.apiUrl}/agorav2`;  // URL to web api

    public static strategieModels:{ [key: string]: any };
    public static pictogrammes:{ [key: string]: any };
    public static famillesMessages:{ [key: string]: any };
    public static formatsMessages:{ [key: string]: any };
    public static messagesEquipements:{ [key: string]: any };
    public static equipements:{ [key: string]: any };

    constructor(private http:Http,
                private cacheService:CacheService) {
    }


    /**
     * @return les modèles strategies.
     */
    getStrategieModels(type:string):Observable<any> {
        let data = this.cacheService.getObject(CacheConstantes[type]);
        if (data) return Observable.of(data);
        let param:string = "";
        switch (type) {
            case CacheConstantes.STRATEGIE_MODELS_MANUAL:
                param = "MOD_STR_MANUELLE";
                break;
            case CacheConstantes.STRATEGIE_MODELS_EVT:
                param = "MOD_STR_EVT";
                break;
            case CacheConstantes.STRATEGIE_MODELS_TDP:
                param = "MOD_STR_TDP";
                break;
            default:
                param = "MOD_STR_MANUELLE";
                break;
        }

        let url = `${StrategieModelService.BASE_URL}/str/resumes_modeles_strategies?type=${param}`;
        return this.http.get(url)
            .map(response => {
                data = _.values(response.json());
                this.cacheService.setObject(CacheConstantes[type], data);
                return data;
            });
    }


    /**
     * @return les familles messages.
     */
    getFamillesMessages():Observable<any> {
        let data = this.cacheService.getObject(CacheConstantes.FAMILLES_MESSAGES);
        if (data) return Observable.of(data);

        let url = `${StrategieModelService.BASE_URL}/str/familles_messages`;
        return this.http.get(url)
            .map(response => {
                data = _.values(response.json());
                this.cacheService.setObject(CacheConstantes.FAMILLES_MESSAGES, data);
                return data;
            });
    }

    /**
     * @return les formats Messages.
     */
    getFormatsMessages():Observable<any> {
        let data = this.cacheService.getObject(CacheConstantes.FORMATS_MESSAGES);
        if (data) return Observable.of(data);

        let url = `${StrategieModelService.BASE_URL}/str/formats_messages`;
        return this.http.get(url)
            .map(response => {
                data = _.values(response.json());
                this.cacheService.setObject(CacheConstantes.FORMATS_MESSAGES, data);
                return data;
            });
    }

    /**
     * @return les formats Messages.
     */
    getMessagesEquipements():Observable<any> {
        let data = this.cacheService.getObject(CacheConstantes.MESSAGES_EQUIPEMENTS);
        if (data) return Observable.of(data);

        let url = `${StrategieModelService.BASE_URL}/str/messages_equipements`;
        return this.http.get(url)
            .map(response => {
                data = _.values(response.json());
                this.cacheService.setObject(CacheConstantes.MESSAGES_EQUIPEMENTS, data);
                return data;
            });
    }

    /**
     * @return les formats Messages.
     */
    getEquipements():Observable<any> {
        let data:any[] = this.cacheService.getObject(CacheConstantes.EQUIPEMENTS);
        if (data) return Observable.of(data);

        let url = `${StrategieModelService.BASE_URL}/eqt/resumes_equipements?types=PMV`;
        return this.http.get(url)
            .map(response => {
                data = _.values(response.json().resumesEquipements);
                this.cacheService.setObject(CacheConstantes.EQUIPEMENTS, data);
                return data;
            });
    }

}
