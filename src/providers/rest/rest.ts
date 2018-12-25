import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Response } from '@angular/http';
import { ENV } from '../../env';

@Injectable()
export class RestProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  apiUrl = ENV.api.baseUrl;
  apiFolder = 'api';

  getStories(page): Observable<any[]> {
    let URL1 = this.apiUrl + this.apiFolder + '/getUsersStory.php?token=asdfadsfklajdhi849hjbsvdsv&page=' + page;

    return this.http.get(URL1)
      //.catch(this.handleError);
      .catch((err) => {
                
        // Do messaging and error handling here
       
        return Observable.throw(err)
    })
  }

  getPosts(page): Observable<any[]> {
    let URL2 = this.apiUrl + this.apiFolder + '/getUsersPosts.php?token=asdfadsfklajdhi849hjbsvdsv&page=' + page;

    return this.http.get(URL2)
      //.catch(this.handleError);
      .catch((err) => {
                
        // Do messaging and error handling here
       
        return Observable.throw(err)
    })
  }

  getMatch(page): Observable<any[]> {
    let URL3 = this.apiUrl + this.apiFolder + '/getScoresV2.php?user=12&format=json&from=' + page;

    return this.http.get(URL3)
      //.catch(this.handleError);
      .catch((err) => {
                
        // Do messaging and error handling here
       
        return Observable.throw(err)
    })
  }

  postLogin(username, password) {
    let uri = ENV.security.serverUrl + ENV.security.jwtToken;

    let data = {
      username: username,
      password: password
    };

    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.post(uri, data, { headers: headers })
      //.catch(this.handleError);
      .catch((err) => {
                
        // Do messaging and error handling here
       
        return Observable.throw(err)
    })
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
