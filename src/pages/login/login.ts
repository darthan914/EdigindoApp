import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController, ToastController} from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { UtilityProvider } from '../../providers/utility/utility';

// import { HomePage } from '../home/home';
// import { DeliveryPage } from '../delivery/delivery';

@IonicPage({
	name: 'login',
	segment: 'login'
})
@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {
	login: any = {username: '', password: ''};
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
			this.auth.auth().then((result) => {
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
					this.navCtrl.setRoot('home');
				}
				
			}, (err) => {
				localStorage.clear();
				this.util.loading.dismiss();
				this.util.presentToast('Session Login time out!');
			});
		}
	}

	onLogin() {
		this.util.showLoader('Authenticating...');
		this.auth.login(this.login).then((result) => {
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
				this.navCtrl.setRoot('home');
			}
			
		}, (err) => {
			this.util.loading.dismiss();
			this.util.presentToast('Server Not Found!');
		});
	}


	
}
