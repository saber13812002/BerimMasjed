import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BerimMasjedApp } from './app.component';
import { Platform } from 'ionic-angular';

import { ElementRef } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { NbaPage } from '../pages/nba/nba';
import { BookPage } from '../pages/book/book';
import { HomePage } from '../pages/home/home';
import { TvPage } from '../pages/tv/tv';
import { TabsPage } from '../pages/tabs/tabs';
import { PlayerDetailPage } from '../pages/player-detail/player-detail';
import { PlaygroundDetailPage } from '../pages/playground-detail/playground-detail';
import { VideoDetailPage } from '../pages/video-detail/video-detail';
import { VideoPage } from '../pages/video/video';
import { QavamiPage } from '../pages/qavami/qavami';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageServiceProvider } from '../providers/language-service/language-service';
import { LoginPage } from '../pages/login/login';

import { LoginIdeaPage } from '../pages/login-idea/login';

import { RestProvider } from '../providers/rest/rest';
import { PostsProvider } from '../providers/wp-rest/posts'

import { AuthService } from '../providers/auth-service';
import { QuotesProvider } from '../providers/quotes/quotes';
import { CreateQuotePage } from '../pages/create-quote/create-quote';
import { QuotesPage } from '../pages/quotes/quotes';
import { QuotesDetailPage } from '../pages/quotes-detail/quotes-detail';


@NgModule({
  declarations: [
    BerimMasjedApp,
    AboutPage,
    LoginPage,
    LoginIdeaPage,
    ContactPage,
    HomePage,
    TvPage,
    TabsPage,
    NbaPage,
    BookPage,
    PlayerDetailPage,
    PlaygroundDetailPage,
    VideoDetailPage,
    VideoPage,
    QavamiPage,
    CreateQuotePage,
    QuotesPage,
    QuotesDetailPage,
    //HttpClientModule,
    //JsonpModule // if used
  ],
  imports: [
    HttpModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(BerimMasjedApp, {}, {
      links: [
        { segment: 'player', component: PlayerDetailPage, name: 'PlayerDetail' },
        { segment: 'playground/:id', component: PlaygroundDetailPage, name: 'PlaygroundDetail' },
        { segment: 'video/:id', component: VideoDetailPage, name: 'VideoDetail' },

      ]
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    BerimMasjedApp,
    AboutPage,
    LoginPage,
    LoginIdeaPage,
    ContactPage,
    HomePage,
    TvPage,
    TabsPage,
    NbaPage,
    BookPage,
    PlayerDetailPage,
    PlaygroundDetailPage,
    VideoDetailPage,
    VideoPage,
    QavamiPage,
    CreateQuotePage,
    QuotesPage,
    QuotesDetailPage,
    //HttpClientModule,
    //JsonpModule // if used
  ],
  providers: [

    LanguageServiceProvider,
    QuotesProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestProvider,
    PostsProvider,
    AuthService,

    LanguageServiceProvider
  ]
})

export class AppModule { }

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}
