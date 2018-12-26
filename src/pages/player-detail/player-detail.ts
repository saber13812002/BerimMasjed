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
        aliasName:"",
        birthPlace:"",
        codeMarkaz:"",
        lastDegreeHozeh:"",
        lastDegreeClassic:"",
        field:"",
        expert:"",
        cityId:"",
        cityOther:"",
        date:"",
        time:"",
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
      this.person.aliasName= navParams.data.person.aliasName;
      this.person.birthPlace= navParams.data.person.birthPlace;
      this.person.codeMarkaz= navParams.data.person.codeMarkaz;
      this.person.lastDegreeHozeh= navParams.data.person.lastDegreeHozeh;
      this.person.field= navParams.data.person.field;
      this.person.expert= navParams.data.person.expert;
      this.person.lastDegreeClassic= navParams.data.person.lastDegreeClassic;
      this.person.cityId= navParams.data.person.cityId;
      this.person.cityOther= navParams.data.person.cityOther;
      this.person.date= navParams.data.person.date;
      this.person.time= navParams.data.person.time;
      
      if(navParams.data.person.uImages!=null)
        this.person.uImages= this.apiFolder+ navParams.data.person.img;
      else
        this.person.uImages= "";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerDetailPage');
  }

}
