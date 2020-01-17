import { Injectable, OnDestroy } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Subscription } from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import * as _ from 'underscore';
import { EvenementCte } from '../../../../app/core/evenement/constantes/evenement.constantes';
import { environment } from '../../../../environments/environment';
import { CacheService} from '../../../../app/shared/services/cache/cache.service';
import { CacheConstantes} from '../../../../app/shared/services/cache/cache.constantes';

@Injectable()
export class ModeleEvenementService implements OnDestroy {

    private subscriptions:Subscription[] = [];
    static BASE_URL_AGORA = `${environment.apiUrl}/agorav2`;  // URL to web api
    static BASE_URL_CESAM = `${environment.apiUrl}/cesam2`;

    public static enumerations:{ [key: string]: any };
    public static axes:{ [key: string]: any };
    public static typesLieux:{ [key: string]: any };
    public static lieux:{ [key: string]: any };
    public static categories:{ [key: string]: any };
    public static types:{ [key: string]: any }[] = []; //{ [key: string]: any };

    constructor(private http:Http, private cacheService:CacheService) {
    }

    public init() {
        if (!ModeleEvenementService.enumerations) {
            this.subscriptions.push(this.getEnumerations().subscribe(response => {
                ModeleEvenementService.enumerations = response.enumerations; //TODO à supprimer
                this.cacheService.setObject(CacheConstantes.ENUMERATIONS, response.enumerations);
            }));
        }

        if (!ModeleEvenementService.axes) {
            this.subscriptions.push(this.getAxes().subscribe(response => {
                ModeleEvenementService.axes = response.axes;
                this.cacheService.setObject(CacheConstantes.AXES, response.axes);
            }));
        }

        if (!ModeleEvenementService.typesLieux) {
            this.subscriptions.push(this.getTypesLieux().subscribe(response => {
                ModeleEvenementService.typesLieux = response.typesLieux;
                this.cacheService.setObject(CacheConstantes.TYPESLIEUX, response.typesLieux);
            }));
        }

        if (!ModeleEvenementService.lieux) {
            this.subscriptions.push(this.getLieux().subscribe(response => {
                ModeleEvenementService.lieux = response.lieux;
                this.cacheService.setObject(CacheConstantes.LIEUX, response.lieux);
            }));
        }

        if (!ModeleEvenementService.categories) {
            this.subscriptions.push(this.getCategories().subscribe(response => {
                ModeleEvenementService.categories = response.categoriesEvenements;
                ModeleEvenementService.types = _.sortBy(_.values(this.resolveTypes(ModeleEvenementService.categories)), function (o) {
                    return o.nom;
                });
                ModeleEvenementService.types = _.uniq(ModeleEvenementService.types, 'codeInfo');

                this.cacheService.setObject(CacheConstantes.CATEGORIES, response.categoriesEvenements);
                this.cacheService.setObject(CacheConstantes.TYPES, ModeleEvenementService.types);
            }));
        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }


    private getEnumerations():Observable<any> {
        let url = `${ModeleEvenementService.BASE_URL_AGORA}/core/enumerations`;
        return this.http.get(url)
            .map(response => {
                return response.json();
            });
    }

    private getAxes():Observable<any> {
        let url = `${ModeleEvenementService.BASE_URL_AGORA}/topo/axes`;
        return this.http.get(url)
            .map(response => {
                return response.json();
            });
    }


    private getTypesLieux():Observable<any> {
        let url = `${ModeleEvenementService.BASE_URL_AGORA}/topo/types_lieux`;
        return this.http.get(url)
            .map(response => {
                return response.json();
            });
    }

    private getLieux():Observable<any> {
        let url = `${ModeleEvenementService.BASE_URL_AGORA}/topo/lieux`;
        return this.http.get(url)
            .map(response => {
                return response.json();
            });
    }

    private getCategories():Observable<any> {
        let url = `${ModeleEvenementService.BASE_URL_AGORA}/evt/categories_evenements`;
        return this.http.get(url)
            .map(response => {
                return response.json();
            });
    }

    private resolveTypes(categories) {
        let types = [];
        for (const key in categories) {
            types = _.union(types, _.values(categories[key].resumesModelesEvenements));
        }
        ;
        return types;
    }

    public getListEvtsGroup(identifiant:number) {
        let url = `${ModeleEvenementService.BASE_URL_CESAM}/evt/groupes_evenements?identifiant_evenement=${identifiant}`;
        return this.http.get(url).map(response => _.values(response.json().groupesEvenements));
    }
}
