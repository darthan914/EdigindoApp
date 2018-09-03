import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Platform} from 'ionic-angular';

import { Http } from '@angular/http';

import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { UtilityProvider } from '../../providers/utility/utility';
import { EnviromentProvider } from '../../providers/enviroment/enviroment';

// import { PusherProvider } from '../../providers/pusher/pusher';
import { LocalNotifications } from '@ionic-native/local-notifications';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
	name: 'home',
	segment: 'home'
})
@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
})
export class HomePage {

	constructor(
		public app                 : App,
		public http                : Http, 
		public navCtrl	           : NavController,
		public navParams           : NavParams,
		public util                : UtilityProvider,
		public env                 : EnviromentProvider,
		public auth                : AuthenticationProvider,
		private localNotifications : LocalNotifications,
		private plaform            : Platform,
		// private pusher             : PusherProvider,
	)
	{
		if(localStorage.getItem("token") == null) {
			this.navCtrl.setRoot('LoginPage');
		}
		else
		{
			// this.pusher.init().bind('my-event', function(data) {
			//   console.log('An event was triggered with message: ' + data.message);
			// });
		}
	}

	menu = {
		'data' : [
			{
				'group_name' : 'Pengiriman',
				'access'     : 'list-delivery',
				'content'    : [
					{'page' : 'delivery', 'name' : 'Daftar Pengiriman', 'access' : 'list-delivery'},
					{'page' : 'courier', 'name' : 'Tugas Pengiriman', 'access' : 'courier-delivery'}
				]
			}
			
		]
	};


	user:any     = JSON.parse(localStorage.getItem('user'));
	position:any = JSON.parse(localStorage.getItem('position'));

	index:any  = [];
	result:any = [];



	ionViewDidLoad()
	{
		
	}

	ngOnInit() {
		
	}

	refresh(refresher)
	{
		if(localStorage.getItem("token")) {
			this.auth.auth().then((result) => {
				this.result = result;
				if(this.result.status == "ERROR")
				{
					refresher.complete();
					this.util.presentToast(this.result.message);
				}
				else
				{
					refresher.complete();
					localStorage.setItem('user', JSON.stringify(this.result.data.user));
					localStorage.setItem('position', JSON.stringify(this.result.data.position));

					this.user     = JSON.parse(localStorage.getItem('user'));
					this.position = JSON.parse(localStorage.getItem('position'));
				}
				
			}, (err) => {
				localStorage.clear();
				this.navCtrl.setRoot('login');
				this.util.presentToast('Session Login time out!');
			});
		}
	}

	onLogout() {
		this.util.showLoader('Logout...');
		this.auth.logout().then((result) => {
			this.util.loading.dismiss();
			this.navCtrl.setRoot('login');
		}, (err) => {
			this.util.loading.dismiss();
			this.navCtrl.setRoot('login');
		});
	}

	open(page)
	{
		this.navCtrl.push(page);
	}

	load()
	{
		
	}

	testNotif(){
		this.localNotifications.schedule({
			id: 1,
			title: 'Test Notification',
			text: 'Content Notification',
			trigger: {at: new Date(new Date().getTime() + 3600)},
			data: { data : ''}
		})
	}

}
