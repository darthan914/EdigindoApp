import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';

import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
	templateUrl: 'app.html',
	// template: `
	// 	<ion-menu [content]="sidemenu" type="overlay">
	// 		<ion-content>
	// 			<ion-list>
	// 				<div class="profile">
	// 					<div style="width: 12em; height: 12em;" [style.background-image]="this.util.getLocalURLImage(user.photo)" class="img-profile"></div>
	// 					<div class="name-profile">{{ user.fullname }}</div>
	// 					<div class="position-profile">{{ position.name }}</div>
	// 				</div>
	// 			</ion-list>
	// 			<!-- <div class="ln_solid"></div> -->
	// 			<ion-list>
	// 				<ion-item *ngIf="this.auth.hasAccess('list-designRequest')">My Request Design</ion-item>
	// 				<ion-item *ngIf="this.auth.hasAccess('list-delivery')">My List Deliver</ion-item>
	// 				<ion-item (click)="logout()">Logout</ion-item>
	// 			</ion-list>
	// 		</ion-content>
	// 	</ion-menu>
	// `
})
export class MyApp {

	rootPage:any = LoginPage;

	constructor(
		platform: Platform,
		statusBar: StatusBar,
		splashScreen: SplashScreen,
		public http: Http,

	)
	{
		platform.ready().then(() => {

			statusBar.styleDefault();
			splashScreen.hide();

		});
	}

	

}

