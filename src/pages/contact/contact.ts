import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlayerDetailPage } from '../player-detail/player-detail';
import { RestProvider } from '../../providers/rest/rest';
import { LoadingController } from 'ionic-angular';

@IonicPage({
  name: 'contact'
})
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
    providers:[RestProvider]
})

export class ContactPage {

    
    public people = new Array();
    
    private detailPage;
    apiUrl = 'https://berimbasket.ir/';
    apiFolder = 'bball';  
    data: any;
    //users: string[];
    errorMessage: string;
    page = 0;
    perPage = 10;
    totalData = 100;
    totalPage = 1;
    
    
  constructor(
    public navCtrl: NavController , 
    public playerDataProvider:RestProvider, 
    public loadingCtrl:LoadingController
  ) {
      
      this .detailPage = PlayerDetailPage;
      
      let loader= loadingCtrl.create({content:"Loading Players"});
      loader.present();    
      
      playerDataProvider.getStories(0).subscribe(people=>{
        console.log('people : ' ,people)  ;
            for(let i =0;i<people.length;i++){
            people[i].logo=this.apiUrl+people[i].uImages;
            // people[i].instagram="https://instagram.com/";
            // people[i].telegram="https://t.me/";
            people[i].apiUrl=this.apiUrl+this.apiFolder;
            //people[i].logoB="https://berimbasket.ir"+people[i].logoTitleB;
            }
          loader.dismiss();
          
         this.data = people;
         this.people = this.data.data;
         this.perPage = this.data.per_page;
         this.totalData = this.data.total;
         this.totalPage +=1 ;//this.data.total_pages;
          
          this.people=people;
      });
      
//      this.people.push({name:"p1",id:1});
//      this.people.push({name:"p2",id:2});
//      this.people.push({name:"p3",id:3});
  }

    loadPlayerDetail(person){
        console.log(person);
        this.navCtrl.push(this.detailPage,{person:person});
    }
    
    doInfinite(infiniteScroll) {
      this.page = this.page+1;
      setTimeout(() => {
        this.playerDataProvider.getStories(this.page*10)
           .subscribe(
             people => {
            for(let i =0;i<people.length;i++){
            people[i].logo=this.apiUrl+people[i].uImages;
            //people[i].logoB="basket.ir"+people[i].logoTitleB;
            }
               this.data = people;
               this.perPage = this.data.per_page;
               this.totalData = this.data.total;
               this.totalPage +=1;// this.data.total_pages;
               for(let i=0; i<this.data.length; i++) {
                 this.people.push(this.data[i]);
               }
             },
             error =>  this.errorMessage = <any>error);

        console.log('Async operation has ended');
        infiniteScroll.complete();
      }, 1000);
    }
}
