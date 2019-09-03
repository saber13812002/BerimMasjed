import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENV } from '../../env';

/*
  Generated class for the QuotesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QuotesProvider {
  api_url = ENV.pods.baseUrl + ENV.pods.quotes_url;

  constructor(public http: HttpClient) {
    console.log('Hello QuotesProvider Provider');
  }

  getQuotes() {
    return this.http.get(this.api_url);
  }

  postQuote(title, content) {
    let data = {
      title: title,
      //quote_title: content,
      content: content,
      //author_title: author,
      status: 'publish'
    };
    console.log(data);

    let token = JSON.parse(localStorage.getItem('wpIonicTokenIdea')).token;
    console.log(token);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.api_url, data, { headers: headers });
  }

}
