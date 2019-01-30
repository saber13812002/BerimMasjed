import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser';
import { ENV } from '../../env';

@IonicPage({
  name: 'AboutPage'
})
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(
    private iab: InAppBrowser,
    public navCtrl: NavController
  ) {

  }

  async signup(type: string) {
    let signupOrSignin = (type == 'signup' ? ENV.security.register : ENV.security.login);

    let oauthUrl = ENV.security.serverUrl + signupOrSignin
    '?client_id=' + ENV.clientId + '&' +
      'redirect_uri=' + ENV.redirectUri + '&' +
      'response_type=id_token%20token&'
      //'scope=' + encodeURI(ENV.scope) + '&' +
      //'state=' + ENV.state + '&nonce=' + ENV.nonce;
      ;

    if (type == 'add')
      oauthUrl = 'https://masjedcloob.ir/blog/wp-admin/post-new.php';
    else if (type == 'all')
      oauthUrl = 'https://masjedcloob.ir/blog/wp-admin/edit.php';

    const browser = this.iab.create(oauthUrl, '_blank', 'location=no,clearcache=yes,clearsessioncache=yes,useWideViewPort=yes');

    browser.on('loadstart').subscribe((event) => {
      if ((event.url).indexOf('http://localhost:8100') === 0) {
        browser.on('exit').subscribe(() => { });
        browser.close();
        const defaultError = 'Problem authenticating with SimplePOS IDS';
      }
    });
    browser.on('exit').subscribe(function (event) {
    });

  }

}