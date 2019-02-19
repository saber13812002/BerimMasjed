import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PlaygroundDetailPage } from '../playground-detail/playground-detail';
import { RestProvider } from '../../providers/rest/rest';
import { LoadingController } from 'ionic-angular';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
import { ENV } from '../../env';

@IonicPage({
  name: 'tv'
})
@Component({
  selector: 'page-tv',
  templateUrl: 'tv.html',
  providers: [RestProvider]
})
export class TvPage {

  public stories = new Array();
  public posts = new Array();
  private detailPage;

  public token = "";

  options: GeolocationOptions;
  currentPos: Geoposition;

  data: any;

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
    public toastController: ToastController,
    private geolocation: Geolocation
  ) {
    // this.token = localStorage.getItem('token');
    // if (this.token != "")
    //   this.presentToast("شما لاگین هستید میتوانید کامنت بگذارید");

    this.detailPage = PlaygroundDetailPage;

    let loader = loadingCtrl.create({ content: "در حال بارگذاری ..." });
    loader.present();

    restProvider.getTv(0).subscribe(stories => {
      console.log('stories : ', stories);
      for (let i = 0; i < stories.length; i++) {
        if (stories[i].file_id)
          stories[i].img = "https://berimbasket.ir/assets/tv/posts/" + stories[i].file_id + ".png";
        else
          stories[i].img = "http://masjedcloob.ir/img/default/defaultAvatar.png";
      }
      this.data = stories;
      this.stories = this.data.data;
      this.perPage = this.data.per_page;
      this.totalData = this.data.total;
      this.stories = stories;
    });

    restProvider.getTv(0).subscribe(posts => {

      posts.forEach(element => {
        //element.text = element.text.replace(/<\/?[^>]+(>|$)/g, "");
        //element.file = element.file.replace("upload/", "mobile/");
        //element.file = element.file + ".jpg";
        if (element.file_id)
          element.img = "https://berimbasket.ir/assets/tv/posts/" + element.file_id + ".png";
        else
          element.img = "http://masjedcloob.ir/img/default/defaultAvatar.png";

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
      this.restProvider.getTv(((this.page)))
        .subscribe(
          posts => {
            for (let i = 0; i < posts.length; i++) {
              if (posts[i].file_id)
                posts[i].img = "https://berimbasket.ir/assets/tv/posts/" + posts[i].file_id + ".png";
              else
                posts[i].img = "http://masjedcloob.ir/img/default/defaultAvatar.png";
            };

            this.data = posts;
            //this.posts = this.data.data;
            this.perPage = this.data.per_page;
            this.totalData = this.data.total;
            this.totalPage += 1;
            for (let i = 0; i < posts.length; i++) {
              this.posts.push(this.data[i]);
            }
            //this.posts = this.posts.concat(posts);
          },
          error => this.errorMessage = <any>error);

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 1000);
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


  presentToast(msg: string, time = 2000) {
    const toast = this.toastController.create({
      message: msg,
      duration: time,
      position: "top"
    });
    toast.present();
  }
}