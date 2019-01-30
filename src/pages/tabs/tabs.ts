import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { NbaPage } from '../nba/nba';
import { MapPage } from '../map/map';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = NbaPage;
  tab5Root = MapPage;
  
//@ViewChild('myTabs') tabRef: Tabs;

//ionViewDidEnter() {
//  this.tabRef.select(2);
// }
 
 
  constructor() {

  }
}
