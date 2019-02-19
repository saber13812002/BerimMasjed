import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TvPage } from './tv';

@NgModule({
  declarations: [
    TvPage,
  ],
  imports: [
    IonicPageModule.forChild(TvPage),
  ],
})
export class TvPageModule {}