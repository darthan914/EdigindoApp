import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { HttpClientModule/*, HttpClient*/ } from '@angular/common/http';

import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { GotoPage } from '../pages/goto/goto';
import { DeliveryPage } from '../pages/delivery/delivery';
import { DeliveryWaitingPage } from '../pages/delivery/waiting/waiting';
import { DeliveryWaitingFilterPage } from '../pages/delivery/waiting/filter/filter';
import { DeliveryTakenPage } from '../pages/delivery/taken/taken';
import { DeliveryViewPage } from '../pages/delivery/view/view';

import { EnviromentProvider } from '../providers/enviroment/enviroment';
import { UtilityProvider } from '../providers/utility/utility';
import { AuthenticationProvider } from '../providers/authentication/authentication';

// import { ComponentsModule } from '../components/components.module';
import { SidemenuComponent } from '../components/sidemenu/sidemenu';


// import { AddEventModule } from '../add-event.module';





@NgModule({
  declarations: [
    SidemenuComponent,
    MyApp,
    LoginPage,
    HomePage,
    GotoPage,
    DeliveryPage,
    DeliveryWaitingPage,
    DeliveryWaitingFilterPage,
    DeliveryTakenPage,
    DeliveryViewPage,
  ],
  imports: [
    // ComponentsModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    GotoPage,
    DeliveryPage,
    DeliveryWaitingPage,
    DeliveryWaitingFilterPage,
    DeliveryTakenPage,
    DeliveryViewPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EnviromentProvider,
    UtilityProvider,
    AuthenticationProvider,
  ]
})
export class AppModule {}
