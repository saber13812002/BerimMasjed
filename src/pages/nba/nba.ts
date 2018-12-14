import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RestProvider } from '../../providers/rest/rest';
import { LoadingController } from 'ionic-angular';

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
  selector: 'page-nba',
  templateUrl: 'nba.html',
    providers:[RestProvider]
})
export class NbaPage {

    public match = new Array();
    
    data: any;
    //users: string[];
    errorMessage: string;
    page = 0;
    perPage = 10;
    totalData = 100;
    totalPage = 1;
    
    apiUrl = 'https://berimbasket.ir/';
    apiFolder = 'bball';    
    
  constructor(public navCtrl: NavController, public navParams: NavParams, public playerDataProvider:RestProvider, public loadingCtrl:LoadingController) {
      
      let loader= loadingCtrl.create({content:"Loading NBA Score Box"});
      loader.present();
      
        playerDataProvider.getMatch(0).subscribe(match=>{
        console.log('match : ' ,match)  ;
            for(let i =0;i<match.length;i++){
            match[i].logoA=this.apiUrl+match[i].logoTitleA;
            match[i].logoB=this.apiUrl+match[i].logoTitleB;
            }
            loader.dismiss();
            
         this.data = match;
         this.match = this.data.data;
         this.perPage = this.data.per_page;
         this.totalData = this.data.total;
         this.totalPage +=1 ;//this.data.total_pages;
            
            
          this.match=match;
      });
      
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NbaPage');
  }

 doInfinite(infiniteScroll) {
      this.page = this.page+1;
      setTimeout(() => {
        this.playerDataProvider.getMatch(this.page*10)
           .subscribe(
             match => {
             for(let i =0;i<match.length;i++){
            match[i].logoA=this.apiUrl+match[i].logoTitleA;
            match[i].logoB=this.apiUrl+match[i].logoTitleB;
            }
               this.data = match;
               this.perPage = this.data.per_page;
               this.totalData = this.data.total;
               this.totalPage +=1;// this.data.total_pages;
               for(let i=0; i<this.data.length; i++) {
                 this.match.push(this.data[i]);
               }
             },
             error =>  this.errorMessage = <any>error);

        console.log('Async operation has ended');
        infiniteScroll.complete();
      }, 1000);
    }
    
}
