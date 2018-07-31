import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, App} from 'ionic-angular';

import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { UtilityProvider } from '../../providers/utility/utility';
import { EnviromentProvider } from '../../providers/enviroment/enviroment';
import { LoginPage } from '../../pages/login/login'

/**
 * Generated class for the SidemenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
	selector: 'sidemenu',
	templateUrl: 'sidemenu.html'
})
export class SidemenuComponent {

	user:any     = JSON.parse(localStorage.getItem('user'));
	position:any = JSON.parse(localStorage.getItem('position'));

	constructor(
		public navCtrl : NavController,
		public util    : UtilityProvider,
		public env     : EnviromentProvider,
		public auth    : AuthenticationProvider
	) {
		// console.log('Hello SidemenuComponent Component');
		// this.text = 'Hello World';
	}

	logout() {
		this.util.showLoader('Logout...');
		this.auth.logout().then((result) => {
			this.util.loading.dismiss();
			this.navCtrl.setRoot(LoginPage);
		}, (err) => {
			this.util.loading.dismiss();
			this.navCtrl.setRoot(LoginPage);
		});
	}

}
