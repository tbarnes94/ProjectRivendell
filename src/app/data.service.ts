import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IService } from "app/iservice";

@Injectable()
export class DataService {

  private _servicesUrl = 'https://rivendell17.azurewebsites.net';

  constructor(private _http: Http) { }

  getServices(): Observable<IService[]> {
    return this._http.get(this._servicesUrl+'/api/Entries')
        .map((response: Response) => <IService[]>response.json())
        .do(data => console.log('All: ' +  JSON.stringify(data)))
        .catch(this.handleError);
  }

  getService(id: number): Observable<IService> {
    return this._http.get(this._servicesUrl+'/api/Entries/'+id)
        .map((response: Response) => <IService>response.json())
        .do(data => console.log( JSON.stringify(data)))
        .catch(this.handleError);
    // DEPRECATED METHOD -> Matches ID Locally instead of calling API
    // return this.getServices()
    //   .map((services: IService[]) => services.find(b => b.ID === id))
    //   .do(data => console.log( JSON.stringify(data)))
    //   .catch(this.handleError);
  }

  private handleError(error: any) {
      let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg);
      return Observable.throw(errMsg);
  }
}
