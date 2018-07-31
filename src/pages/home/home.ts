import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App} from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';

import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { UtilityProvider } from '../../providers/utility/utility';
import { EnviromentProvider } from '../../providers/enviroment/enviroment';
import { LoginPage } from '../login/login';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
	selector: 'page-home',
	templateUrl: 'home.html',
 })
 export class HomePage {

		// user:any = JSON.parse(localStorage.getItem('user'));
	// position:any = JSON.parse(localStorage.getItem('position'));

	constructor(
		public app       : App,
		public http      : Http, 
		public navCtrl	 : NavController,
		public navParams : NavParams,
		public util      : UtilityProvider,
		public env       : EnviromentProvider,
		public auth      : AuthenticationProvider
	)
	{

	}


	user:any     = JSON.parse(localStorage.getItem('user'));
	position:any = JSON.parse(localStorage.getItem('position'));

	index:any  = [];
	result:any = [];

	ionViewDidLoad()
	{
		

		if(localStorage.getItem("token")) {
			this.auth.checkAuth(localStorage.getItem("token")).then((result) => {
				this.result = result;
				if(this.result.status == "ERROR")
				{
					this.util.presentToast(this.result.message);
				}
				else
				{
					localStorage.setItem('user', JSON.stringify(this.result.data.user));
					localStorage.setItem('position', JSON.stringify(this.result.data.position));
					
				}
				
			}, (err) => {
				localStorage.clear();
				this.navCtrl.setRoot(LoginPage);
				this.util.presentToast('Session Login time out!');
			});
		}
		else
		{
			this.navCtrl.setRoot(LoginPage);
		}

		this.load();
	}

	logout() {
		this.util.showLoader('Logout...');
		this.auth.logout().then((result) => {
			this.util.loading.dismiss();
			this.navCtrl.setRoot(LoginPage);
		}, (err) => {
			this.util.loading.dismiss();
			this.util.presentToast('Failed to logout!');
		});
	}

	load()
	{
		

		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		// headers.append('Access-Control-Allow-Origin' , this.env.base_url);
		// headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
		// headers.append('Accept','application/json');
		// headers.append('content-type','application/json');

		let options = new RequestOptions({ headers: headers });

		let data = {};

		this.http.post(this.env.base_url+"api/delivery?token="+encodeURI(localStorage.getItem('token')), data, options)
			.subscribe(
				data => { 
					this.index = data.json().data;
				},
				error => { 
					
				}
			);
	}

}
