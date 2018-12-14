import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlaygroundDetailPage } from '../playground-detail/playground-detail';
import { RestProvider } from '../../providers/rest/rest';
import { LoadingController } from 'ionic-angular';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';

import { TranslateService } from '@ngx-translate/core';
import { LanguageServiceProvider } from "../../providers/language-service/language-service";
import { LanguageModel } from "../../models/language.model";

@IonicPage({
  name: 'home'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [RestProvider]
})
export class HomePage {

  languageSelected: any = 'en';
  languages: Array<LanguageModel>;

  public stories = new Array();
  public posts = new Array();
  private detailPage;

  options: GeolocationOptions;
  currentPos: Geoposition;

  apiUrl = 'http://masjedcloob.ir/upload/';
  apiFolder = 'bball';

  data: any;
  //users: string[];
  errorMessage: string;
  page = 0;
  perPage = 10;
  totalData = 100;
  totalPage = 1;

  public like_btn = {
    color: 'black',
    icon_name: 'heart-outline'
  };

  constructor(
    public navCtrl: NavController,
    public restProvider: RestProvider,
    public loadingCtrl: LoadingController,
    private geolocation: Geolocation,
    public translate: TranslateService,
    public languageService: LanguageServiceProvider
  ) {

    this.detailPage = PlaygroundDetailPage;

    let loader = loadingCtrl.create({ content: "در حال بارگذاری ..." });
    loader.present();

    this.languages = this.languageService.getLanguages();
    this.setLanguage();

    restProvider.getStories(0).subscribe(stories => {
      console.log('stories : ', stories);
      for (let i = 0; i < stories.length; i++) {
        if (stories[i].personalPic)
          stories[i].img = this.apiUrl + stories[i].personalPic;
        else
          stories[i].img = "http://masjedcloob.ir/img/default/defaultAvatar.png";
      }



      this.data = stories;
      this.stories = this.data.data;
      this.perPage = this.data.per_page;
      this.totalData = this.data.total;

      this.stories = stories;
    });

    restProvider.getPosts(0).subscribe(posts => {

      posts.forEach(element => {
        element.text= element.text.replace(/<\/?[^>]+(>|$)/g, "");

        return element
      });

      this.data = posts;
      this.posts = this.data.data;
      this.perPage = this.data.per_page;
      this.totalData = this.data.total;
      this.totalPage += 1;

      this.posts = posts;
    });
    
    loader.dismiss();
  }

  loadPlaygroundDetail(playground) {
    console.log(playground);
    this.navCtrl.push(this.detailPage, { playground: playground });
  }

  doInfinite(infiniteScroll) {
    this.page = this.page + 1;
    setTimeout(() => {
      this.restProvider.getPosts(((this.page) - 1))
        .subscribe(
          posts => {
            this.data = posts;
            this.perPage = this.data.per_page;
            this.totalData = this.data.total;
            this.totalPage += 1;// this.data.total_pages;
            posts.forEach(element => {
              element.text= element.text.replace(/<\/?[^>]+(>|$)/g, "");
              return element
            });
          },
          error => this.errorMessage = <any>error);

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 1000);
  }

  setLanguage() {
    let defaultLanguage = this.translate.getDefaultLang();
    this.languageSelected="fa";
    if (this.languageSelected) {
      this.translate.setDefaultLang(this.languageSelected);
      this.translate.use(this.languageSelected);
    } else {
      this.languageSelected = defaultLanguage;
      this.translate.use(defaultLanguage);
    }
  }

  likeButton() {
    if (this.like_btn.icon_name === 'heart-outline') {
      this.like_btn.icon_name = 'heart';
      this.like_btn.color = 'danger';
      // Do some API job in here for real!
    }
    else {
      this.like_btn.icon_name = 'heart-outline';
      this.like_btn.color = 'black';
    }
  }
}
