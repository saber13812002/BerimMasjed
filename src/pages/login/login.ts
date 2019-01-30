import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Toast, ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { TranslateService } from '@ngx-translate/core';
import { LanguageServiceProvider } from "../../providers/language-service/language-service";
import { LanguageModel } from "../../models/language.model";
import { RestProvider } from '../../providers/rest/rest';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser';
import { ENV } from '../../env';

import 'rxjs/add/operator/map'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [RestProvider]
})
export class LoginPage {

  patternUsername: RegExp = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
  patternPin: RegExp = /^\d{4}$/;

  languageSelected: any;
  languages: Array<LanguageModel>;

  username: string;
  password: string;

  token: any;

  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public translate: TranslateService,
    public languageService: LanguageServiceProvider,
    public toastController: ToastController,
    public restProvider: RestProvider,
    private iab: InAppBrowser,
    public navParams: NavParams) {

    this.languages = this.languageService.getLanguages();
    this.setLanguage();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  async login() {
    const loading = this.loadingCtrl.create({
      duration: 500
    });

    await this.getToken();



    loading.onDidDismiss(() => {
      if (this.token)
        this.navCtrl.setRoot(TabsPage);
      else
        this.toastController.create({
          message: "...",
          duration: 2000
        })
    });

    loading.present();

  }
  async signup() {
    let oauthUrl=ENV.security.serverUrl + ENV.security.register
      '?client_id=' + ENV.clientId + '&' +
      'redirect_uri=' + ENV.redirectUri + '&' +
      'response_type=id_token%20token&' 
      //'scope=' + encodeURI(ENV.scope) + '&' +
      //'state=' + ENV.state + '&nonce=' + ENV.nonce;
      ;
    const browser = this.iab.create(oauthUrl, '_blank', 'location=no,clearcache=yes,clearsessioncache=yes,useWideViewPort=yes');

    browser.on('loadstart').subscribe((event) => {
      if ((event.url).indexOf('http://localhost:8100') === 0) {
        browser.on('exit').subscribe(() => { });
        browser.close();

        //var parsedResponse = this.authService.fetchToken(event.url);

        const defaultError = 'Problem authenticating with SimplePOS IDS';
        // if (parsedResponse['state'] !== state) {
        //   reject(defaultError);
        // } else if (parsedResponse['access_token'] !== undefined &&
        //   parsedResponse['access_token'] !== null) {
        //   resolve(parsedResponse);
        // } else {
        //   reject(defaultError);
        // }
      }
    });
    browser.on('exit').subscribe(function (event) {
      //reject('The SimplePOS IDS sign in flow was canceled');
    });

  }

  async getToken() {
    let token = await this.restProvider.postLogin(this.username, this.password).subscribe(data => {
      console.log(data);
      return data.token;
      //localStorage.setItem('wpIonicToken', JSON.stringify(data));
    });

    this.token = token;
  }

  setLanguage() {
    let defaultLanguage = this.translate.getDefaultLang();
    if (this.languageSelected) {
      this.translate.setDefaultLang(this.languageSelected);
      this.translate.use(this.languageSelected);
    } else {
      this.languageSelected = defaultLanguage;
      this.translate.use(defaultLanguage);
    }
  }
}
