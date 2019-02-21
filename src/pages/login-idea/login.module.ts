import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginIdeaPage } from './login';

@NgModule({
  declarations: [
    LoginIdeaPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginIdeaPage),
  ],
})
export class LoginIdeaPageModule {}
