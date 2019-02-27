import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PlaygroundDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'video-detail',
  segment: 'video-detail/:id'
})
@Component({
  selector: 'page-video-detail',
  templateUrl: 'video-detail.html',
})
export class VideoDetailPage {

  public court = {
    name:"",
};
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    let courtId=navParams.data.playground.id;
    this.court.name= navParams.data.playground.namefa;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoDetailPage');
  }

}
