import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Response } from '@angular/http';

//let apiUrl = "http://localhost/PHP-Slim-Restful/api/";
//let apiUrl = 'https://api.thewallscript.com/restful/';
let apiUrl = 'http://qavami.com/ideas/wp-content/plugins/berimbasket-otp2/api/';
//let jwtUrl = 'https://qavami.com/ideas/wp-json/jwt-auth/v1/token';
let jwtUrl = 'http://ennings.com/wp-json/jwt-auth/v1/token';
//let apiUrl = 'http://qavami.com/api/';
/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {

  constructor(public http: Http,public httpp: HttpClient) {
    console.log('Hello AuthService Provider');
  }

  postLogin(credential) {
    // let uri = ENV.security.serverUrl + ENV.security.jwtToken;

    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.httpp.post(jwtUrl, credential, { headers: headers })
      //.catch(this.handleError);
      .catch((err) => {

        // Do messaging and error handling here

        return Observable.throw(err)
      })
  }

  postData(credentials, type) {

    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http.post(apiUrl + type, JSON.stringify(credentials), { headers: headers }).
        subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });

    });

  }

  postJwtData(credentials) {

    return new Promise((resolve, reject) => {
      let headers = new Headers();

    headers.set('Content-Type', 'application/json');
      //headers.append('Content-Type', 'application/x-www-form-urlencoded');

      this.http.post(jwtUrl, credentials, { headers: headers }).
        subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });

    });

  }
}
