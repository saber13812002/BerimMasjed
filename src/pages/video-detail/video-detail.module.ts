import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoDetailPage } from './video-detail';

@NgModule({
  declarations: [
    VideoDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(VideoDetailPage),
  ],
})
export class VideoDetailPageModule {}
