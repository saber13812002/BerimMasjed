import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Toast, ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { TranslateService } from '@ngx-translate/core';
import { LanguageServiceProvider } from "../../providers/language-service/language-service";
import { LanguageModel } from "../../models/language.model";
import { RestProvider } from '../../providers/rest/rest';

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
