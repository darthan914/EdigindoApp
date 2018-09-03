import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { LoginPage } from '../pages/login/login';
// import { HomePage } from '../pages/home/home';

import { Http } from '@angular/http';

import { UtilityProvider } from '../providers/utility/utility';
import { AuthenticationProvider } from '../providers/authentication/authentication';

import { PusherProvider } from '../providers/pusher/pusher';

@Component({
	templateUrl: 'app.html',
})
export class MyApp {

	rootPage:string = 'login';

	constructor(
		platform       : Platform,
		statusBar      : StatusBar,
		splashScreen   : SplashScreen,
		public http    : Http,
		public util    : UtilityProvider,
		public auth    : AuthenticationProvider,
		private pusher : PusherProvider,

	)
	{
		platform.ready().then(() => {

			statusBar.styleDefault();
			splashScreen.hide();

			

		});

		const channel = this.pusher.init();
		channel.bind('my-event', (data) => {
			alert(data.message);
		});
	}

	

}

