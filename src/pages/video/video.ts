import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VideoDetailPage } from '../video-detail/video-detail';
import { RestProvider } from '../../providers/rest/rest';
import { LoadingController } from 'ionic-angular';
import { ENV } from '../../env';

@IonicPage({
  name: 'video'
})
@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
  providers: [RestProvider]
})
export class VideoPage {

  public stories = new Array();
  public posts = new Array();
  private detailPage;


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
    public loadingCtrl: LoadingController
  ) {

    this.detailPage = VideoDetailPage;

    let loader = loadingCtrl.create({ content: "در حال بارگذاری ..." });
    loader.present();

    // restProvider.getStories(0).subscribe(stories => {
    //   console.log('stories : ', stories);

    //   this.data = stories;
    //   this.stories = this.data.data;
    //   this.perPage = this.data.per_page;
    //   this.totalData = this.data.total;
    //   this.stories = stories;
    // });

    let posts = restProvider.getTv(0,"mp4");

    posts.subscribe(posts => {

      posts.forEach(element => {
      //   // element.text = element.text.replace(/<\/?[^>]+(>|$)/g, "");
      //   // element.file = element.file.replace("upload/", "mobile/");
      //   // element.file = element.file + ".jpg";
      element.FilmURL =  "https://berimbasket.ir/assets/tv/videos/" + element.file_id + ".mp4";

        return element
      });

      // var ret = posts._body.replace('{"d":null}', '');
      // posts = JSON.parse(ret);
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
      let posts = this.restProvider.getTv(this.page,"mp4");
        posts.subscribe( posts => {
            for (let i = 0; i < posts.length; i++) {
              // posts[i].text = posts[i].text.replace(/<\/?[^>]+(>|$)/g, "");
              // posts[i].file = posts[i].file.replace("upload/", "mobile/");
               posts[i].FilmURL =  "https://berimbasket.ir/assets/tv/videos/" + posts[i].file_id + ".mp4";
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

  tapPhotoLike(){}
}