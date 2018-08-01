import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';

import { HttpClientModule/*, HttpClient*/ } from '@angular/common/http';

import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { GotoPage } from '../pages/goto/goto';
import { DeliveryPage } from '../pages/delivery/delivery';
import { DeliveryWaitingPage } from '../pages/delivery/delivery-waiting/delivery-waiting';
import { DeliveryWaitingFilterPage } from '../pages/delivery/delivery-waiting/filter-delivery-waiting/filter-delivery-waiting';
import { DeliveryTakenPage } from '../pages/delivery/delivery-taken/delivery-taken';
import { DeliveryTakenFilterPage } from '../pages/delivery/delivery-taken/filter-delivery-taken/filter-delivery-taken';
import { DeliveryViewPage } from '../pages/delivery/delivery-view/delivery-view';

import { EnviromentProvider } from '../providers/enviroment/enviroment';
import { UtilityProvider } from '../providers/utility/utility';
import { AuthenticationProvider } from '../providers/authentication/authentication';

// import { ComponentsModule } from '../components/components.module';
// import { SidemenuComponent } from '../components/sidemenu/sidemenu';


// import { AddEventModule } from '../add-event.module';





@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    // HomePage,
    // GotoPage,
    // DeliveryPage,
    // DeliveryWaitingPage,
    // DeliveryWaitingFilterPage,
    // DeliveryTakenPage,
    // DeliveryTakenFilterPage,
    // DeliveryViewPage,
  ],
  imports: [
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
    DeliveryTakenFilterPage,
    DeliveryViewPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EnviromentProvider,
    UtilityProvider,
    AuthenticationProvider,
    Geolocation,
  ]
})
export class AppModule {}
