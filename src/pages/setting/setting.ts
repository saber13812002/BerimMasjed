import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { LanguageServiceProvider } from "../../providers/language-service/language-service";
import { LanguageModel } from "../../models/language.model";

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  languageSelected : any = 'en';
  languages : Array<LanguageModel>;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public translate: TranslateService,
    public languageService: LanguageServiceProvider
  ) {

    this.languages = this.languageService.getLanguages();
    this.setLanguage();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }


  setLanguage(){
        let defaultLanguage = this.translate.getDefaultLang();
        if(this.languageSelected){
          this.translate.setDefaultLang(this.languageSelected);
          this.translate.use(this.languageSelected);
        }else{
          this.languageSelected = defaultLanguage;
          this.translate.use(defaultLanguage);
        }
      }


}
