import { Injectable } from '@angular/core';
import { Headers, RequestOptions, RequestMethod,  Http, ResponseOptions, RequestOptionsArgs, ResponseContentType, URLSearchParams} from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { environment } from '../../../../environments/environment';
import * as _ from 'underscore';


@Injectable()
export class NotesInfosService {
    private baseUrl = `${environment.apiUrl}/agorav2`;  // URL to web api
    private headers;

    constructor(private http:Http) {
        this.headers = new Headers();
    }


    /**
     * Recuperer tous les résumés de notes
     * @param types
     * @param attributs
     * @returns {Observable<TResult>}
     */
    public getNotes(types?:Array<string>, attributs?:Array<string>):Observable<any[]> {
        const nomMethode = 'getNotes'
        console.log(nomMethode + ' : ' + JSON.stringify(types) + ' / ' + JSON.stringify(attributs));

        let url = `${this.baseUrl}/ppo/resumes_notes`;
        let queryParameters = new URLSearchParams();
        if (types !== undefined) {
            types.forEach(strType => queryParameters.append('types',strType));
        }
        if (attributs !== undefined) {
            attributs.forEach(strAtt => queryParameters.append('attributs',strAtt));
        }
        const options = new RequestOptions();
        options.params = queryParameters;
        return this.http.get(url, options).map(response => _.values(response.json()));
    }

    /**
     * recupere le prototype de la note
     * dont le type est passé en param
     * @param typeNote
     */
    public getPrototypeNote(typeNote:string):Observable<any>{
        let url = `${this.baseUrl}/ppo/prototype_note/${typeNote}`;
        return this.http.get(url).map(response => response.json());
    }

    /**
     * creer ou modifier une note
     * @param note
     * @param fichier
     * @returns {Observable<TResult>}
     */
    public creerOuModifierNote(note:any, fichier?:any):Observable<any> {
        let url = `${this.baseUrl}/ppo/note`;
        let headerParams:Headers = new Headers();
        let formData:FormData = new FormData();
        formData.append('note', JSON.stringify(note));

        if (fichier) {
            let today = new Date();
            let options = {year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric"};
            let now = today.toLocaleDateString("fr-FR", options);
            let date = "_"+now.slice(6,10) + "_" + now.slice(3,5) + "_" + now.slice(0,2) + "_" + now.slice(13,15)+ "_" + now.slice(16,18) + "_" + now.slice(19,21);
            let names = fichier.name.split(".");
            formData.append('fichier', fichier, `${names[0]+date+"."+names[1]}`);
            //formData.set("fichier", `${fichier.name+data}`, fichier);
        }





        //formParams['fichier'] = fichier;

        /*let requestOptions: RequestOptionsArgs = {
         method: 'PUT',
         headers: headerParams,
         search: queryParameters
         };*/
        // requestOptions.body = formParams['note'];
        return this.http.put(url, formData);
    }

    /**
     * recupere la note
     * dont l'identifiant est passé en param
     * @param identifiant
     */
    public getNote(identifiant:number):Observable<any> {
        let url = `${this.baseUrl}/ppo/notes/${identifiant}`;
        return this.http.get(url).map(response => {
            return response.json();
        });
    }

    public openFile(identifiant:number):Observable<any> {
        let url = `${this.baseUrl}/ppo/notes/${identifiant}/fichier_attache`;
        const options = {responseType: ResponseContentType.ArrayBuffer};
        return this.http.get(url, options);
    }

    public supprimerFile(identifiant:number):Observable<any> {
        let url = `${this.baseUrl}/ppo/notes/${identifiant}/supprimer_fichier_attache`;
        return this.http.get(url);
    }

    /**
     * Signe la note
     * dont l'identifiant est passé en param
     * @param identifiant
     */
    public signerNote(identifiant:number):Observable<any>{
        let url = `${this.baseUrl}/ppo/notes/${identifiant}/signer`;
        return this.http.post(url, {}, {headers: this.headers});
    }

    /**
     * Supprime la note
     * dont l'identifiant est passé en param
     * @param identifiant
     */
    public supprimerNote(identifiant:number):Observable<any>{
        let url = `${this.baseUrl}/ppo/notes/${identifiant}/supprimer`;
        return this.http.post(url, {}, {headers: this.headers});
    }


}
