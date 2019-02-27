import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { PostsProvider } from '../../providers/wp-rest/posts'

/**
 * Generated class for the NbaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'nba'
})
@Component({
  selector: 'page-book',
  templateUrl: 'book.html'
})
export class BookPage {

  public match = new Array();

  data: any;

  errorMessage: string;
  page = 0;
  perPage = 10;
  totalData = 100;
  totalPage = 1;

  posts;

  public like_btn = {
    color: 'black',
    icon_name: 'heart-outline'
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public postProvider: PostsProvider,
    public loadingCtrl: LoadingController) {

    let loader = loadingCtrl.create({ content: "..." });
    loader.present();

    this.postProvider.getPostsZeinabian(++this.page).subscribe(data => {
      console.log(data);
      this.posts = data;
      this.posts.forEach(element => {
        element.content.rendered = element.content.rendered.replace(/<\/?[^>]+(>|$)/g, "");
        return element
      });
      this.totalPage++;
    });
    loader.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NbaPage');
  }

  async doInfinite(infiniteScroll) {
    let loader = this.loadingCtrl.create({ content: "..." });
    await loader.present();

      setTimeout(() => {
      this.postProvider.getPostsZeinabian(++this.page).subscribe(data => {
        console.log(data);
        this.data = data;
        this.totalPage++;// this.data.total_pages;
        for (let i = 0; i < this.data.length; i++) {
          this.data[i].content.rendered = this.data[i].content.rendered.replace(/<\/?[^>]+(>|$)/g, "");
          this.posts.push(this.data[i]);
        }
      });

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 5000);

    await loader.dismiss();
  }
}
