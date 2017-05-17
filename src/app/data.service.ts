import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Entity } from "app/Entity";

@Injectable()
export class DataService {

  private _servicesUrl = 'https://rivendell17.azurewebsites.net';

  constructor(private _http: Http) { }

  getEntities(): Observable<Entity[]> {
    return this._http.get(this._servicesUrl+'/api/Entities')
        .map((response: Response) => <Entity[]>response.json())
        .do(data => console.log('All: ' +  JSON.stringify(data)))
        .catch(this.handleError);
  }

  getEntity(id: number): Observable<Entity> {
    return this._http.get(this._servicesUrl+'/api/Entities/'+id)
        .map((response: Response) => <Entity>response.json())
        .do(data => console.log( JSON.stringify(data)))
        .catch(this.handleError);
  }

  postService(data: object): Observable<any>{
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this._http.post(this._servicesUrl+'/api/Entities/', JSON.stringify(data), {headers:headers})
        .map(res => res.json())
        .catch(this.handleError);
  }

  putService(id: number, data: object): Observable<any>{
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this._http.put(this._servicesUrl+'/api/Entities/' + id.toString(), JSON.stringify(data), {headers:headers})
        .map(res => res.json())
        .catch(this.handleError);
  }

  private handleError(error: any) {
      let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg);
      return Observable.throw(errMsg);
  }
}
