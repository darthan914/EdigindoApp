import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController  } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

import { Http, Headers, RequestOptions } from '@angular/http';
import { EnviromentProvider } from '../../../providers/enviroment/enviroment';
import { UtilityProvider } from '../../../providers/utility/utility';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';

// import { DeliveryViewPage } from '../../delivery/delivery-view/delivery-view';
// import { DeliveryTakenFilterPage } from '../../delivery/delivery-taken/filter-delivery-taken/filter-delivery-taken';
// import { GotoPage } from '../../goto/goto';
// import { LoginPage } from '../../login/login';
// import { HomePage } from '../../home/home';

// import 'rxjs/add/operator/map';

/**
 * Generated class for the DeliveryTakenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
	name: 'courier',
	segment: 'courier',
	defaultHistory: ['home']
})
@Component({
 	selector: 'page-delivery-taken',
 	templateUrl: 'delivery-taken.html',
})
export class DeliveryTakenPage {
 	authData: any;

 	index:any     = [];
 	page:any      = 1;
 	last_page:any = 1;

 	limit:any = 10;

 	from:any  = 0;
 	to:any    = 0;
 	total:any = 0;

 	sort  = 'delivery.datetime_send'
 	order = 'DESC'

 	f_when	  = 'all';
 	f_status  = '';
 	f_id      = '';

 	s_spk     = '';
 	s_project = '';

 	enabledNextBtn:boolean = false;
 	enabledPrevBtn:boolean = false;

 	constructor(

 		public navCtrl	    : NavController,
 		public navParams    : NavParams,
 		public modalCtrl    : ModalController,
 		public http			: Http, 
 		public env			: EnviromentProvider,
 		public util			: UtilityProvider,
 		public auth			: AuthenticationProvider,
 		private geolocation : Geolocation,
 		private alertCtrl   : AlertController,
 		)
 	{
 		
 	}

 	ionViewWillLoad() {
		// console.log('ionViewDidLoad DeliveryTakenPage');
		this.load();
	}

	refresh(refresher)
	{
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		// headers.append('Access-Control-Allow-Origin' , this.env.base_url);
		// headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
		// headers.append('Accept','application/json');
		// headers.append('content-type','application/json');

		let options = new RequestOptions({ headers: headers });

		let data = {
			f_when	  : this.f_when,
			f_status  : this.f_status,
			f_id	  : this.f_id,
			s_spk     : this.s_spk,
			s_project : this.s_project,

			limit : this.limit,
			page  : this.page,
			sort  : this.sort,
			order : this.order
		}

		this.http.post(this.env.base_url+"api/delivery/courier?token="+encodeURI(localStorage.getItem('token')), data, options)
		.subscribe(
			data => { 
				if(data.json().status == "OK")
				{
					refresher.complete();
					this.index = data.json().data.data;

					this.from			= data.json().data.from;
					this.to				= data.json().data.to;
					this.total		 = data.json().data.total;
					this.last_page = data.json().data.last_page;

					if(data.json().data.next_page_url != null)
					{
						this.enabledNextBtn = true;
					}
					else
					{
						this.enabledNextBtn = false;
					}

					if(data.json().data.prev_page_url != null)
					{
						this.enabledPrevBtn = true;
					}
					else
					{
						this.enabledPrevBtn = false;
					}

				}
				else
				{
					refresher.complete();
					this.util.presentToast(data.json().message);
				}

			},
			error => { 
				refresher.complete();
				this.util.presentToast('Server Error!');
			}
			);
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

		let data = {
			f_when	  : this.f_when,
			f_status  : this.f_status,
			f_id	  : this.f_id,
			s_spk     : this.s_spk,
			s_project : this.s_project,

			limit : this.limit,
			page  : this.page,
			sort  : this.sort,
			order : this.order
		}

		this.util.showLoader('Loading...');
		this.http.post(this.env.base_url+"api/delivery/courier?token="+encodeURI(localStorage.getItem('token')), data, options)
		.subscribe(
			data => {
				console.log(data.json());

				if(data.json().status == "OK")
				{
					this.util.loading.dismiss();
					this.index = data.json().data.data;

					this.from      = data.json().data.from;
					this.to        = data.json().data.to;
					this.total     = data.json().data.total;
					this.last_page = data.json().data.last_page;

					if(data.json().data.next_page_url != null)
					{
						this.enabledNextBtn = true;
					}
					else
					{
						this.enabledNextBtn = false;
					}

					if(data.json().data.prev_page_url != null)
					{
						this.enabledPrevBtn = true;
					}
					else
					{
						this.enabledPrevBtn = false;
					}

				}
				else
				{
					this.util.loading.dismiss();
					this.util.presentToast(data.json().message);
				}

			},
			error => { 
				this.util.loading.dismiss();
				this.util.presentToast('Server Error!');
			}
			);
	}

	view(id)
	{
		let data = {
			id: id
		}
		const modal = this.modalCtrl.create('DeliveryViewPage', data);

		modal.present();

		modal.onWillDismiss((data) => {

		})
	}

	filter()
	{
		const passingData = {
			f_when	  : this.f_when,
			f_status  : this.f_status,
			f_id	  : this.f_id,
			s_spk	  : this.s_spk,
			s_project : this.s_project,

			limit : this.limit,
			sort  : this.sort,
			order : this.order
		}

		const modal = this.modalCtrl.create('DeliveryTakenFilterPage', passingData);

		modal.present();

		modal.onWillDismiss((data) => {
			if(data.status == 'APPLY')
			{
				this.f_when		= data.data.f_when;
				this.f_status	= data.data.f_status;

				this.s_spk     = data.data.s_spk;
				this.s_project = data.data.s_project;

				this.limit = data.data.limit;
				this.sort	= data.data.sort;
				this.order = data.data.order;

				this.load();
			}
		})
	}

	nextPage()
	{
		this.page = this.page + 1;
		this.load();
	}

	prevPage()
	{
		this.page = this.page - 1;
		this.load();
	}

	indexPage()
	{
		const passingData = {
			page			: this.page,
			last_page : this.last_page,
		}

		const modal = this.modalCtrl.create('GotoPage', passingData);

		modal.present();

		modal.onWillDismiss((data) => {
			console.log(data);
			if(data.status == 'APPLY')
			{
				this.page = data.data.page;
				this.load();
			}
		})
	}

	undoTake(id)
	{
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		// headers.append('Access-Control-Allow-Origin' , this.env.base_url);
		// headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
		// headers.append('Accept','application/json');
		// headers.append('content-type','application/json');

		let options = new RequestOptions({ headers: headers });

		let data = {
			id : id
		}

		this.util.showLoader('Loading...');
		this.http.post(this.env.base_url+"api/delivery/undoTake?token="+encodeURI(localStorage.getItem('token')), data, options)
		.subscribe(
			data => {
				this.util.loading.dismiss();
				this.util.presentToast(data.json().message);

				if(data.json().status == "OK")
				{
					this.load();
				}

			},
			error => { 
				this.util.loading.dismiss();
				this.util.presentToast('Server Error!');
			}
			);
	}


	startSend(id)
	{
		var start_latitude	= 0;
		var start_longitude = 0;
		var distance = 0;

		this.geolocation.getCurrentPosition().then((resp) => {
			start_latitude	= resp.coords.latitude;
			start_longitude = resp.coords.longitude;

			var headers = new Headers();
			headers.append('Content-Type', 'application/json');
			// headers.append('Access-Control-Allow-Origin' , this.env.base_url);
			// headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
			// headers.append('Accept','application/json');
			// headers.append('content-type','application/json');

			let options = new RequestOptions({ headers: headers });

			console.log(distance);

			let data = {
				id							: id,
				start_latitude	: start_latitude,
				start_longitude : start_longitude,
				key						 : this.env.gmap_api,
			}

			this.util.showLoader('Loading...');
			this.http.post(this.env.base_url+"api/delivery/startSend?token="+encodeURI(localStorage.getItem('token')), data, options)
			.subscribe(
				data => {
					this.util.loading.dismiss();
					this.util.presentToast(data.json().message);

					if(data.json().status == "OK")
					{

						this.load();
					}
				},
				error => { 
					this.util.loading.dismiss();
					this.util.presentToast('Server Error!');
				}
				);
		}).catch((error) => {
			console.log('Error getting location', error);

			var headers = new Headers();
			headers.append('Content-Type', 'application/json');
				// headers.append('Access-Control-Allow-Origin' , this.env.base_url);
				// headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
				// headers.append('Accept','application/json');
				// headers.append('content-type','application/json');

				let options = new RequestOptions({ headers: headers });

				console.log(distance);

				let data = {
					id				: id,
					start_latitude	: start_latitude,
					start_longitude : start_longitude
				}

				this.util.showLoader('Loading...');
				this.http.post(this.env.base_url+"api/delivery/startSend?token="+encodeURI(localStorage.getItem('token')), data, options)
				.subscribe(
					data => {
						this.util.loading.dismiss();
						this.util.presentToast(data.json().message);

						if(data.json().status == "OK")
						{

							this.load();
						}
					},
					error => { 
						this.util.loading.dismiss();
						this.util.presentToast('Server Error!');
					}
					);
			});
	}

	undoStartSend(id)
	{
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		// headers.append('Access-Control-Allow-Origin' , this.env.base_url);
		// headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
		// headers.append('Accept','application/json');
		// headers.append('content-type','application/json');

		let options = new RequestOptions({ headers: headers });

		let data = {
			id : id
		}

		this.util.showLoader('Loading...');
		this.http.post(this.env.base_url+"api/delivery/undoStartSend?token="+encodeURI(localStorage.getItem('token')), data, options)
		.subscribe(
			data => {
				this.util.loading.dismiss();
				this.util.presentToast(data.json().message);

				if(data.json().status == "OK")
				{
					this.load();
				}

			},
			error => { 
				this.util.loading.dismiss();
				this.util.presentToast('Server Error!');
			}
			);
	}


	finish(id)
	{
		let alert = this.alertCtrl.create({
			title: 'Enter Name Reciever',
			inputs: [
			{
				name: 'received_by',
				placeholder: 'Received By'
			},
			],
			buttons: [
			{
				text: 'Cancel',
				role: 'cancel',
				handler: data => {
				}
			},
			{
				text: 'Submit',
				handler: get => {
					if (get.received_by != '') {
						var headers = new Headers();
						headers.append('Content-Type', 'application/json');
							// headers.append('Access-Control-Allow-Origin' , this.env.base_url);
							// headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
							// headers.append('Accept','application/json');
							// headers.append('content-type','application/json');

							let options = new RequestOptions({ headers: headers });

							let data = {
								id : id,
								received_by : get.received_by
							}

							this.util.showLoader('Loading...');
							this.http.post(this.env.base_url+"api/delivery/finish?token="+encodeURI(localStorage.getItem('token')), data, options)
							.subscribe(
								data => {
									this.util.loading.dismiss();
									this.util.presentToast(data.json().message);

									if(data.json().status == "OK")
									{
										this.load();
									}

								},
								error => { 
									this.util.loading.dismiss();
									this.util.presentToast('Server Error!');
								}
								);
						} else {
							this.util.presentToast('Enter the name recieved');
						}
					}
				}
				]
			});
		alert.present();

		
	}

	undoFinish(id)
	{
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		// headers.append('Access-Control-Allow-Origin' , this.env.base_url);
		// headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
		// headers.append('Accept','application/json');
		// headers.append('content-type','application/json');

		let options = new RequestOptions({ headers: headers });

		let data = {
			id : id
		}

		this.util.showLoader('Loading...');
		this.http.post(this.env.base_url+"api/delivery/undoFinish?token="+encodeURI(localStorage.getItem('token')), data, options)
		.subscribe(
			data => {
				this.util.loading.dismiss();
				this.util.presentToast(data.json().message);

				if(data.json().status == "OK")
				{
					this.load();
				}

			},
			error => { 
				this.util.loading.dismiss();
				this.util.presentToast('Server Error!');
			}
			);
	}
}
