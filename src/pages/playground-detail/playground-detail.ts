import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PlaygroundDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'playground-detail',
  segment: 'playground-detail/:id',
  //defaultHistory: ['playground-list'],
  //component: PlaygroundDetailPage,
})
@Component({
  selector: 'page-playground-detail',
  templateUrl: 'playground-detail.html',
})
export class PlaygroundDetailPage {

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
    console.log('ionViewDidLoad PlaygroundDetailPage');
  }

}
