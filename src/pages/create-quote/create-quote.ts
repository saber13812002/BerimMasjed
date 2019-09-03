import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuotesProvider } from '../../providers/quotes/quotes';
import { QuotesPage } from '../quotes/quotes';

/**
 * Generated class for the CreateQuotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-quote',
  templateUrl: 'create-quote.html',
})
export class CreateQuotePage {
  title;
  content;

  constructor(public navCtrl: NavController, public navParams: NavParams, private quotesProvider: QuotesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateQuotePage');
  }

  onAddQuote() {
    this.quotesProvider.postQuote(this.title, this.content).subscribe(data => {
      console.log(data);
      if (data)
        if (data['id'] > 0) {
          this.navCtrl.push(QuotesPage)
        }
    });
  }

  onListQuote(){
    this.navCtrl.push(QuotesPage)
  }

}
