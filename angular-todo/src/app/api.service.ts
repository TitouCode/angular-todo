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
  public getAll(document: string): Observable<Todo[]> {
    return this.http
      .get(`${API_URL}/${document}/find`)
      .map(response => {
        const todos = response.json();
        return todos.map((todo) => new Todo(todo));
      })
      .catch(this.handleError);
  }
  private handleError (error: Response | any) {
   console.error('ApiService::handleError', error);
   return Observable.throw(error);
  }

}
