import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ENV} from '../../env';

/*
  Generated class for the QuotesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostsProvider {
  api_url = ENV.wp_api.baseUrl+ENV.wp_api.posts_url;

  constructor(public http: HttpClient) {
    console.log('Hello QuotesProvider Provider');
  }

  getPosts(page){
    return this.http.get(this.api_url+"?_embed&page="+page+"&per_page=1");
  }

  postQuote(content, author){
    let data = {
      title: content,
      quote: content,
      writer: author,
      status: 'publish'
    };
    console.log(data);

    let token = JSON.parse(localStorage.getItem('wpIonicToken')).token;
    console.log(token);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.api_url, data, {headers: headers});
  }

}
