import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { NbaPage } from '../nba/nba';
import { TvPage } from '../tv/tv';
import { BookPage } from '../book/book';
import { VideoPage } from '../video/video';
import { QavamiPage } from '../qavami/qavami';
import { CreateQuotePage } from '../create-quote/create-quote';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab_1Root = CreateQuotePage;
  tab0Root = QavamiPage;
  tab1Root = HomePage;
  // tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = NbaPage;
  tab6Root = TvPage;
  tab7Root = BookPage;
  tab8Root = VideoPage;

//@ViewChild('myTabs') tabRef: Tabs;

//ionViewDidEnter() {
//  this.tabRef.select(2);
// }


  constructor() {

  }
}
