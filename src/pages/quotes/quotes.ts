import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { QuotesProvider } from '../../providers/quotes/quotes';
import { QuotesDetailPage } from '../../pages/quotes-detail/quotes-detail'
import { CreateQuotePage } from '../create-quote/create-quote';

/**
 * Generated class for the QuotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage {
  quotes;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl:LoadingController,
    private quotesProvider: QuotesProvider) {

      let loader = loadingCtrl.create({ content: "..." });
      loader.present();

    this.quotesProvider.getQuotes().subscribe(data => {
      console.log(data);
      this.quotes = data;
    });

    loader.dismiss();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuotesPage');
  }

  onShowQuoteDetail(quote) {
    this.navCtrl.push(QuotesDetailPage, { quote: quote });
  }

  onGoToCreateQuote() {
    this.navCtrl.push(CreateQuotePage)
  }

}
