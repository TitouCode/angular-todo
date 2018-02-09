import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Http } from '@angular/http';
// import { Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/throw';

import { Todo } from './todo/todo';
const API_URL = environment.apiUrl;


@Injectable()
export class ApiService {

  constructor(private http: Http) { }
  // constructor(private jsonp: Jsonp) { }
  public getAll(document: string, params?: any): Observable<Todo[]> {
    return this.http
      .get(`${API_URL}/${document}/find`, { params })
      .map(response => {
        const rows = response.json();
        return rows;
      })
      .catch(this.handleError);
  }
  public createOne(document: string, row: any): Observable<Todo[]> {
    return this.http
      .post(`${API_URL}/${document}/create`, row)
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
  public updateOne(document: string, id: string, row: any): Observable<Todo[]> {
    return this.http
      .put(`${API_URL}/${document}/${id}/update`, row)
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
  public deleteOne(document: string, id: string): Observable<Todo[]> {
    return this.http
      .delete(`${API_URL}/${document}/${id}`)
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
  public delete(document: string, ids: any): Observable<Todo[]> {
    return this.http
      .post(`${API_URL}/${document}/delete`, ids)
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
  private handleError (error: Response | any) {
   console.error('ApiService::handleError', error);
   return Observable.throw(error);
  }

}
