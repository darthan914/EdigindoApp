import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, ToastController} from 'ionic-angular';
import { Headers, RequestOptions } from '@angular/http';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { EnviromentProvider } from '../../providers/enviroment/enviroment';
import { UtilityProvider } from '../../providers/utility/utility';

import { HomePage } from '../home/home';
import { DeliveryPage } from '../delivery/delivery';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {
	loginData = { username:'', password:'' };
	result: any;

	constructor(
		public navCtrl     : NavController, 
		public alertCtrl   : AlertController,
		public loadingCtrl : LoadingController,
		public toastCtrl   : ToastController,
		public auth        : AuthenticationProvider,
		public util        : UtilityProvider,
	) {
		if(localStorage.getItem("token")) {
			this.util.showLoader('Authenticating...');
			this.auth.checkAuth(localStorage.getItem("token")).then((result) => {
				this.util.loading.dismiss();
				this.result = result;
				if(this.result.status == "ERROR")
				{
					this.util.presentToast(this.result.message);
				}
				else
				{
					localStorage.setItem('user', JSON.stringify(this.result.data.user));
					localStorage.setItem('position', JSON.stringify(this.result.data.position));
					this.navCtrl.setRoot(HomePage);
				}
				
			}, (err) => {
				localStorage.clear();
				this.util.loading.dismiss();
				this.util.presentToast('Session Login time out!');
			});
		}
	}

	login() {
		this.util.showLoader('Authenticating...');
		this.auth.login(this.loginData).then((result) => {
			this.util.loading.dismiss();
			this.result = result;
			if(this.result.status == "ERROR")
			{
				this.util.presentToast(this.result.message);
			}
			else
			{
				localStorage.setItem('token', this.result.data.token);
				localStorage.setItem('user', JSON.stringify(this.result.data.user));
				localStorage.setItem('position', JSON.stringify(this.result.data.position));
				this.navCtrl.setRoot(DeliveryPage);
			}
			
		}, (err) => {
			this.util.loading.dismiss();
			// this.presentToast(err);
			this.util.presentToast('Server Not Found!');
		});
	}


	
}
