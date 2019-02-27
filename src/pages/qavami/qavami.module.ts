import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QavamiPage } from './qavami';

@NgModule({
  declarations: [
    QavamiPage,
  ],
  imports: [
    IonicPageModule.forChild(QavamiPage),
  ],
})
export class QavamiPageModule {}