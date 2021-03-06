import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Toast, ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { LoginIdeaPage } from '../login-idea/login';

import { TranslateService } from '@ngx-translate/core';
import { LanguageServiceProvider } from "../../providers/language-service/language-service";
import { LanguageModel } from "../../models/language.model";
import { RestProvider } from '../../providers/rest/rest';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser';
import { ENV } from '../../env';
import 'rxjs/add/operator/map';
import { URLSearchParams } from '@angular/http';



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

  redirectUri: string = "http://localhost:8100/";
  loginUrl = "https://masjedcloob.ir/blog/jwt.php?client_id=&redirect_uri=&response_type=id_token-token&jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbWFzamVkY2xvb2IuaXJcL2Jsb2ciLCJpYXQiOjE1NDk0NjAyMjEsIm5iZiI6MTU0OTQ2MDIyMSwiZXhwIjoxNTUwMDY1MDIxLCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxIn19fQ.sbGawBdMFt7jAhn3RIYyxui_er0_XsJ67YRWBtaUUyw";

  wpIonicTokenIdea: any;
  token: any;
  jwt: string;
  JWT: string;
  tokenl: any;

  logintext = "ورود به عنوان مهمان";

  constructor(public navCtrl: NavController,
    //private cookieService: CookieService,
    public loadingCtrl: LoadingController,
    public translate: TranslateService,
    public languageService: LanguageServiceProvider,
    public toastController: ToastController,
    public restProvider: RestProvider,
    // private iab: InAppBrowser,
    public navParams: NavParams) {

    this.username = localStorage.getItem('username');
    this.password = localStorage.getItem('password');

    this.languages = this.languageService.getLanguages();
    this.setLanguage();

  }

  // ngOnInit(): void {
  //   //this.cookieService.set( 'Test', 'Hello World' );
  //   //this.JWT = this.cookieService.get('JWT');
  //   console.log('jwt '+this.JWT)
  //   this.validateToken(this.JWT);
  // }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

    this.wpIonicTokenIdea = JSON.parse(localStorage.getItem('wpIonicTokenIdea'));
    if (this.wpIonicTokenIdea) { //|| this.wpIonicTokenIdea.token != ""
      await this.validateToken(null);
    }

    let params = new URLSearchParams(window.location.search);
    this.JWT = params.get('jwt');
    console.log('jwt :' + this.JWT)

  }

  async getToken() {
    let token = await this.restProvider.postLogin(this.username, this.password).subscribe(data => {
      console.log(data);
      localStorage.setItem('wpIonicTokenIdea', JSON.stringify(data));
      return data['token'];
    });

    this.wpIonicTokenIdea = localStorage.getItem('wpIonicTokenIdea');
  }

  async validateToken(jwt: string) {
    let tok = jwt ? jwt : this.wpIonicTokenIdea.token;
    await this.restProvider.postTokenValidate(tok).subscribe(data => {
      console.log(data);

      if (data.status == 200) {
        this.navCtrl.setRoot(TabsPage);
        return true;
      }
    });
  }

  public textChanged() {

    this.logintext = "ورود";
  }

  async login() {
    const loading = this.loadingCtrl.create({
      duration: 500
    });

    await this.getToken();
    // if (this.wpIonicTokenIdea)
    //   await this.validateToken()


    loading.onDidDismiss(() => {
      if (this.wpIonicTokenIdea)
        this.navCtrl.setRoot(TabsPage);
      else
        this.toastController.create({
          message: "...",
          duration: 2000
        })
    });

    loading.present();
    this.navCtrl.setRoot(TabsPage);
  }

  public async createAndSaveNonce(): Promise<string> {

    return "";
  }


  async signup(type: string) {
    let signupOrSignin = (type == 'signup' ? ENV.security.register : ENV.security.login);

    let oauthUrl = ENV.security.serverUrl + signupOrSignin
    '?client_id=' + ENV.clientId + '&' +
      'redirect_uri=' + ENV.redirectUri + '&' +
      'response_type=id_token%20token&'
      ;

    if (type == 'add')
      oauthUrl = 'https://masjedcloob.ir/blog/wp-admin/post-new.php';
    else if (type == 'all')
      oauthUrl = 'https://masjedcloob.ir/blog/wp-admin/edit.php';

    // const browser = this.iab.create(oauthUrl, '_blank', 'location=no,clearcache=yes,clearsessioncache=yes,useWideViewPort=yes');

    // browser.on('loadstart').subscribe((event) => {
    //   if ((event.url).indexOf('http://localhost:8100') === 0) {
    //     browser.on('exit').subscribe(() => { });
    //     browser.close();
    //     const defaultError = 'Problem authenticating with SimplePOS IDS';
    //   }
    // });
    // browser.on('exit').subscribe(function (event) {
    // });

  }


  signUpIdea() {
    this.navCtrl.setRoot(LoginIdeaPage);
  }


  public fetchToken(url: string): any {
    const parsedResponse = {};
    if (url) {
      var urlParameter = url.split('#')[1];
      if (urlParameter) {
        const responseParameters = urlParameter.split('&');
        for (let i = 0; i < responseParameters.length; i++) {
          parsedResponse[responseParameters[i].split('=')[0]] =
            responseParameters[i].split('=')[1];
        }
      }
    }
    return parsedResponse;
  }

  public async buildOAuthUrl(state, nonce): Promise<string> {

    return this.loginUrl +
      //'?client_id=' + this.oauthService.clientId
      + '&' + 'redirect_uri=' + this.redirectUri
      + '&' + 'response_type=id_token%20token' +
      //+ '&' + 'scope=' + encodeURI(this.oauthService.scope)
      + '&' + 'state=' + state + '&nonce=' + nonce;
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
