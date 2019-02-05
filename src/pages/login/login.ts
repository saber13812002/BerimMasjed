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

  username: string = "";
  password: string = "";

  wpIonicToken: any;
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

  async ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

    this.wpIonicToken = JSON.parse(localStorage.getItem('wpIonicToken'));
    if (this.wpIonicToken) { //|| this.wpIonicToken.token != ""
      await this.validateToken();
    }
  }


  async login() {
    const loading = this.loadingCtrl.create({
      duration: 500
    });

    await this.getToken();
    // if (this.wpIonicToken)
    //   await this.validateToken()


    loading.onDidDismiss(() => {
      if (this.wpIonicToken)
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
    let oauthUrl = ENV.security.serverUrl + ENV.security.register
    '?client_id=' + ENV.clientId + '&' +
      'redirect_uri=' + ENV.redirectUri + '&' +
      'response_type=id_token%20token&';
    const browser = this.iab.create(oauthUrl, '_blank', 'location=no,clearcache=yes,clearsessioncache=yes,useWideViewPort=yes');

    browser.on('loadstart').subscribe((event) => {
      if ((event.url).indexOf('http://localhost:8100') === 0) {
        browser.on('exit').subscribe(() => { });
        browser.close();
      }
    });
    browser.on('exit').subscribe(function (event) {
    });

  }

  async getToken() {
    let token = await this.restProvider.postLogin(this.username, this.password).subscribe(data => {
      console.log(data);
      localStorage.setItem('wpIonicToken', JSON.stringify(data));
      return data.token;
    });

    this.wpIonicToken = localStorage.getItem('wpIonicToken');
  }

  async validateToken() {
    await this.restProvider.postTokenValidate(this.wpIonicToken.token).subscribe(data => {
      console.log(data);

      if (data.status == 200) {
        // this.presentToast("شما لاگین هستید میتوانید کامنت بگذارید");
        this.navCtrl.setRoot(TabsPage);
        return true;
      }
    });
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

  presentToast(msg: string, time = 2000) {
    const toast = this.toastController.create({
      message: msg,
      duration: time,
      position: "top"
    });
    toast.present();
  }
}
