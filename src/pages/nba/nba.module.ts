import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NbaPage } from './nba';

@NgModule({
  declarations: [
    NbaPage,
  ],
  imports: [
    IonicPageModule.forChild(NbaPage),
  ],
})
export class NbaPageModule {}
