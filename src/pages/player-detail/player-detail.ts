import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PlayerDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'player-detail'
})
@Component({
  selector: 'page-player-detail',
  templateUrl: 'player-detail.html',
})
export class PlayerDetailPage {

    public person = {
        name:"",
        height:"",
        weight:"",
        jerseyNoB:"",
        teamname:"",
        coach:"",
        score:"",
        place:"",
        uImages:""
    };

    apiUrl = 'https://berimbasket.ir/';
    apiFolder = 'bball';    

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
      let personId=navParams.data.person.id;
      this.person.name= navParams.data.person.namefa;
      this.person.height= navParams.data.person.height;
      this.person.weight= navParams.data.person.weight;
      this.person.jerseyNoB= navParams.data.person.jerseyNoB;
      this.person.teamname= navParams.data.person.teamname;
      this.person.coach= navParams.data.person.coach;
      
      if(navParams.data.person.uImages!=null)
        this.person.uImages= this.apiFolder+ navParams.data.person.uImages;
      else
        this.person.uImages= "";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerDetailPage');
  }

}
