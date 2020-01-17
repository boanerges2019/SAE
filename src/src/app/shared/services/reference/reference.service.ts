import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable }  from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ReferenceService {

  private evenementsUrl = `${environment.apiUrl}/agorav2/topo`;  // URL to web api
  private headers;
  constructor(private http: Http) {
    this.headers = new Headers();
  }

  /**
  * Récupère la liste des sections.
  * @param parameters la liste des paramètres.
  */
  getSections(parameters: string): Observable<any>{
    const url = `${this.evenementsUrl}/sections?${parameters}`;
    return this.http.get(url)
    .map((response) => {
      return response.json();
    });
  }

  
}
