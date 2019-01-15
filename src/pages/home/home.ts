import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App} from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';

import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { UtilityProvider } from '../../providers/utility/utility';
import { EnviromentProvider } from '../../providers/enviroment/enviroment';

import { PusherProvider } from '../../providers/pusher/pusher';
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

	headers;
	
	notif;

	constructor(
		public app                 : App,
		public http                : Http, 
		public navCtrl	           : NavController,
		public navParams           : NavParams,
		public util                : UtilityProvider,
		public env                 : EnviromentProvider,
		public auth                : AuthenticationProvider,
		private localNotifications : LocalNotifications,
		// private plaform            : Platform,
		private pusher             : PusherProvider,
	)
	{
		if(localStorage.getItem("token") == null) {
			this.navCtrl.setRoot('LoginPage');
		}
		else
		{
			this.notification();
		}
	}

	menu = {
		'data' : [
			// {
			// 	'group_name' : 'Purchasing',
			// 	'access'     : 'list-listRequest',
			// 	'content'    : [
			// 		{'page' : 'purchasing-request', 'name' : 'Request', 'access' : 'list-listRequest'},
			// 	]
			// },

			{
				'group_name' : 'CRM',
				'access'     : 'list-crm',
				'content'    : [
					{'page' : 'list-crm', 'name' : 'List CRM', 'access' : 'list-crm'},
				]
			},
			{
				'group_name' : 'Delivery',
				'access'     : 'list-delivery',
				'content'    : [
					{'page' : 'courier', 'name' : 'List Delivery', 'access' : 'courier-delivery'}
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

	notification(clear:boolean = false)
	{
		this.headers = new Headers();
 		this.headers.append('Accept', 'application/json');
 		this.headers.append('Authorization', 'Bearer '+localStorage.getItem('token'));

 		var notif = this.localNotifications;

 		if(clear)
 		{
 			notif.clearAll();
 		}

		this.pusher.init().bind('Illuminate\\Notifications\\Events\\BroadcastNotificationCreated', function(data) {
			notif.schedule({
				id : 0,
				title : data.from,
				text: data.messages,
				data: {
			        app_slug : data.app_slug
			    }
			});
			console.log(data.messages);
		});

		let options = new RequestOptions({ headers: this.headers });

 		let data = {
 		}

		this.http.post(this.env.base_url+"api/crm/notifications", data, options)
 		.subscribe(
 			res => {
 				if(res.json().status == "OK")
 				{
 				// 	notif.schedule({
					// 	id : id++,
					// 	title : res.json().data,
					// 	trigger: {at: new Date(new Date().getTime() + 3600)},
					// });

					for (var i in res.json().data.schedule) {
						var id = 100;
						var title = "Meeting with :" + res.json().data.schedule[i].company_name + ' ' + res.json().data.schedule[i].pic_fullname;
						var text = "At :" + this.util.datetimeFormat(res.json().data.schedule[i].datetime_activity_iso);
						var datetime = new Date(res.json().data.schedule[i].datetime_activity_iso);

						notif.schedule({
							id : id++,
							title : title,
							text: text,
							trigger: {at: new Date(datetime.getTime() - (2*60*60*1000))},
						});
					}
 				}
 				
 			},
 			error => { 
 				this.util.presentToast('Server Error! try logout and login again!');
 			}
 		);
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

					this.notification(true);
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
		this.pusher.unsubscribed();
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

	testNotifDelay(minutes:number){
		this.localNotifications.schedule({
			id: 1,
			title: 'Delayed ILocalNotification',
			text: 'Content Notification Delay' + minutes,
			trigger: {at: new Date(new Date().getTime() + minutes * 60000)},
		})
	}

	testNotif(){
		this.localNotifications.schedule({
			id: 2,
		    text: 'Single ILocalNotification',
		});
	}

}
