import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DeliveryWaitingPage } from '../delivery/delivery-waiting/delivery-waiting';
import { DeliveryTakenPage } from '../delivery/delivery-taken/delivery-taken';

import { UtilityProvider } from '../../providers/utility/utility';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

import { LoginPage } from '../login/login';

/**
 * Generated class for the DeliveryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-delivery',
	templateUrl: 'delivery.html',
	// template: `
	// 	<ion-tabs [selectedIndex]="tab2">
	//       <ion-tab [root]="tab1" tabTitle="Waiting"></ion-tab>
	//       <ion-tab [root]="tab2" tabTitle="Taken"></ion-tab>
	//     </ion-tabs>
	// `,
})
export class DeliveryPage {
	authData: any;
	tab1: any;
	tab2: any;

	constructor(public navCtrl: NavController, public navParams: NavParams,
		public util      : UtilityProvider,
		public auth      : AuthenticationProvider,) {
		this.auth.checkAuth(localStorage.getItem('token')).then((data) => {
			this.authData = data;

			
			if(this.authData.status == "OK")
			{
				localStorage.setItem('user', JSON.stringify(this.authData.data.user));
				localStorage.setItem('position', JSON.stringify(this.authData.data.position));
			}
			
		}, (err) => {
			localStorage.clear();
			this.navCtrl.setRoot(LoginPage);
			this.util.presentToast('Session is Time Out!');
		});

		this.tab1 = DeliveryWaitingPage;
		this.tab2 = DeliveryTakenPage;
	}

	ionViewDidLoad() {
		// console.log('ionViewDidLoad DeliveryPage');
	}

}
