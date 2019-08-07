import { Component } from '@angular/core';
import { Config, Platform } from 'ionic-angular';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { LoginIdeaPage } from '../pages/login-idea/login';


import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class BerimMasjedApp {
  rootPage:any = LoginIdeaPage;
  textDir: string = "rtl";

  constructor(
    platform: Platform,
    private translate: TranslateService,
    private config: Config
  ) {
    translate.setDefaultLang('fa');
    translate.use('fa');
    //this.initTranslate();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.


      //this is to determine the text direction depending on the selected language
      this.translate.onLangChange.subscribe((event: LangChangeEvent) =>
      {
        this.textDir = event.lang == 'fa'? 'rtl' : 'ltr';
      });


    });
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('fa');
    //translate.setDefaultLang('en');
    this.translate.use('fa');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('fa'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }


}
