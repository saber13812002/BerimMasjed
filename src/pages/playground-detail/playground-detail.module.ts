import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaygroundDetailPage } from './playground-detail';

@NgModule({
  declarations: [
    PlaygroundDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaygroundDetailPage),
  ],
})
export class PlaygroundDetailPageModule {}
