import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlayerDetailPage } from '../player-detail/player-detail';
import { RestProvider } from '../../providers/rest/rest';
import { LoadingController } from 'ionic-angular';
import { ENV } from '../../env';

@IonicPage({
  name: 'contact'
})
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers: [RestProvider]
})

export class ContactPage {

  public people = new Array();
  public serverWebApp;

  private detailPage;
  data: any;

  errorMessage: string;
  page = 0;
  perPage = 10;
  totalData = 100;
  totalPage = 1;


  constructor(
    public navCtrl: NavController,
    public restProvider: RestProvider,
    public loadingCtrl: LoadingController
  ) {
    this.detailPage = PlayerDetailPage;

    this.serverWebApp = ENV.webapp.baseUrl;
    let loader = loadingCtrl.create({ content: "..." });
    loader.present();

    restProvider.getUsers(0).subscribe(people => {
      console.log('people : ', people);
      for (let i = 0; i < people.length; i++) {
        if (people[i].personalPic)
          people[i].img = ENV.webapp.baseUrl + ENV.webapp.avatarFolder + "/" + people[i].personalPic;
        else
          people[i].img = ENV.webapp.baseUrl + "/img/default/defaultAvatar.png";
      }
      loader.dismiss();

      this.data = people;
      this.people = this.data.data;
      this.perPage = this.data.per_page;
      this.totalData = this.data.total;
      this.totalPage += 1;//this.data.total_pages;

      this.people = people;
    });
  }

  loadPlayerDetail(person) {
    console.log(person);
    this.navCtrl.push(this.detailPage, { person: person });
  }

  doInfinite(infiniteScroll) {
    this.page = this.page + 1;
    setTimeout(() => {
      this.restProvider.getUsers(this.page)
        .subscribe(
          people => {
            for (let i = 0; i < people.length; i++) {
              if (people[i].personalPic)
                people[i].img = ENV.webapp.baseUrl + ENV.webapp.avatarFolder + "/" + people[i].personalPic;
              else
                people[i].img = ENV.webapp.baseUrl + "/img/default/defaultAvatar.png";
            }
            this.data = people;
            this.perPage = this.data.per_page;
            this.totalData = this.data.total;
            this.totalPage += 1;// this.data.total_pages;
            for (let i = 0; i < this.data.length; i++) {
              this.people.push(this.data[i]);
            }
          },
          error => this.errorMessage = <any>error);

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
}
