import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { Clipboard } from '@ionic-native/clipboard';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { EnviromentProvider } from '../providers/enviroment/enviroment';
import { UtilityProvider } from '../providers/utility/utility';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { PusherProvider } from '../providers/pusher/pusher';
// import { OAuthServiceProvider } from '../providers/o-auth-service/o-auth-service';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    HttpClientModule,

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EnviromentProvider,
    UtilityProvider,
    AuthenticationProvider,
    Geolocation,
    Clipboard,
    PusherProvider,
    LocalNotifications,
    // OAuthServiceProvider,
  ]
})
export class AppModule {}
