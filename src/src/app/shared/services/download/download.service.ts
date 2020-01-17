import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable }  from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';

@Injectable()
export class DowloadService {

  private evenementsUrl = `${environment.apiUrl}/agorav2/topo`;  // URL to web api
  private headers;
  constructor(private http: Http) {
    this.headers = new Headers();
  }

  // downloadFile(id): Observable<Blob> {
  //   let options = new RequestOptions({responseType: ResponseContentType.Blob });
  //   return this.http.get(this._baseUrl + '/' + id, options)
  //       .map(res => res.blob())
  //       .catch(this.handleError)
  // }
}
