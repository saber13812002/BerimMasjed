import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PlaygroundDetailPage } from '../playground-detail/playground-detail';
import { RestProvider } from '../../providers/rest/rest';
import { LoadingController } from 'ionic-angular';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
import { ENV } from '../../env';

@IonicPage({
  name: 'home'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [RestProvider]
})
export class HomePage {

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

    this.detailPage = PlaygroundDetailPage;

    let loader = loadingCtrl.create({ content: "در حال بارگذاری ..." });
    loader.present();

    restProvider.getStories(0).subscribe(stories => {
      console.log('stories : ', stories);
      for (let i = 0; i < stories.length; i++) {
        if (stories[i].personalPic)
          stories[i].img = ENV.webapp.baseUrl + ENV.webapp.avatarFolder + "/" + stories[i].personalPic;
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
        element.text = element.text.replace(/<\/?[^>]+(>|$)/g, "");
        element.file = element.file.replace("upload/", "mobile/");
        element.file = element.file + ".jpg";
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

  ngOnInit(): void {}

  async ionViewDidLoad() {
    let wptoken= await localStorage.getItem('wpIonicToken');

    this.token = (wptoken?JSON.parse(wptoken).token:null);

    if (this.token )
      this.presentToast("شما لاگین هستید میتوانید کامنت بگذارید");
    else 
      this.presentToast("شما به عنوان مهمان وارد شدید و نمیتوانید کامنت بگذارید");

  }


  loadPlaygroundDetail(playground) {
    console.log(playground);
    this.navCtrl.push(this.detailPage, { playground: playground });
  }

  doInfinite(infiniteScroll) {
    this.page = this.page + 1;
    setTimeout(() => {
      this.restProvider.getPosts(((this.page)))
        .subscribe(
          posts => {
            for (let i = 0; i < posts.length; i++) {
              posts[i].text = posts[i].text.replace(/<\/?[^>]+(>|$)/g, "");
              posts[i].file = posts[i].file.replace("upload/", "mobile/");
              posts[i].file = posts[i].file + ".jpg";
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