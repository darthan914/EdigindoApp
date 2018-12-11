import { Component } from '@angular/core';
import { IonicPage, NavParams, ModalController, AlertController  } from 'ionic-angular';

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
	selector: 'page-taken-delivery',
	templateUrl: 'taken-delivery.html',
})
export class TakenDeliveryPage {
	index:any     = [];
	group:any     = [];

	paginateData:any = {
		page           : 1,
		last_page      : 1,
		from           : 0,
		to             : 0,
		total          : 0,
		disabledNextBtn : "true",
		disabledPrevBtn : "true",
	}

	filterData:any = { 
		sort  : 'delivery.datetime_send',
		order : 'DESC',
		limit : 30,

		f_when	  : '',
		f_status  : '',
		f_id      : '',

		s_spk     : '',
		s_project : ''
	}

	filterInit:any = { 
		sort  : 'delivery.datetime_send',
		order : 'DESC',
		limit : 30,

		f_when	  : 'all',
		f_status  : '',
		f_id      : '',

		s_spk     : '',
		s_project : ''
	};

	headers:any;

	constructor(

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
		this.headers = new Headers();
		this.headers.append('Accept', 'application/json');
		this.headers.append('Authorization', 'Bearer '+localStorage.getItem('token'));
	}

	ionViewWillLoad() {
		this.load();
	}

	refresh(refresher)
	{
		let options = new RequestOptions({ headers: this.headers });

		let data = {
			f_when	  : this.filterData.f_when,
			f_status  : this.filterData.f_status,
			f_id	  : this.filterData.f_id,
			s_spk     : this.filterData.s_spk,
			s_project : this.filterData.s_project,

			limit : this.filterData.limit,
			page  : this.filterData.page,
			sort  : this.filterData.sort,
			order : this.filterData.order
		}

		this.http.post(this.env.base_url+"api/delivery/courier", data, options)
		.subscribe(
			res => { 
				if(res.json().status == "OK")
				{
					refresher.complete();
					this.index = res.json().data.index.data;
					this.group = res.json().data.group;

					this.paginateData.from      = res.json().data.index.from;
					this.paginateData.to        = res.json().data.index.to;
					this.paginateData.total     = res.json().data.index.total;
					this.paginateData.last_page = res.json().data.index.last_page;

					if(res.json().data.index.next_page_url != null)
					{
						this.paginateData.disabledNextBtn = "false";
					}
					else
					{
						this.paginateData.disabledNextBtn = "true";
					}

					if(res.json().data.index.prev_page_url != null)
					{
						this.paginateData.disabledPrevBtn = "false";
					}
					else
					{
						this.paginateData.disabledPrevBtn = "true";
					}

				}
				else
				{
					refresher.complete();
					this.util.presentToast(res.json().message);
				}

			},
			error => { 
				refresher.complete();
				this.util.presentToast('Server Error! try logout and login again!');
			}
			);
	}

	load()
	{
		let options = new RequestOptions({ headers: this.headers });

		let data = {
			f_when	  : this.filterData.f_when,
			f_status  : this.filterData.f_status,
			f_id	  : this.filterData.f_id,
			s_spk     : this.filterData.s_spk,
			s_project : this.filterData.s_project,

			limit : this.filterData.limit,
			sort  : this.filterData.sort,
			order : this.filterData.order,

			page  : this.paginateData.page,
		}

		this.util.showLoader('Loading...');
		this.http.post(this.env.base_url+"api/delivery/courier", data, options)
		.subscribe(
			res => {
				if(res.json().status == "OK")
				{
					this.util.loading.dismiss();
					this.index = res.json().data.index.data;
					this.group = res.json().data.group;

					this.paginateData.from      = res.json().data.index.from;
					this.paginateData.to        = res.json().data.index.to;
					this.paginateData.total     = res.json().data.index.total;
					this.paginateData.last_page = res.json().data.index.last_page;

					if(res.json().data.index.next_page_url != null)
					{
						this.paginateData.disabledNextBtn = "false";
					}
					else
					{
						this.paginateData.disabledNextBtn = "true";
					}

					if(res.json().data.index.prev_page_url != null)
					{
						this.paginateData.disabledPrevBtn = "false";
					}
					else
					{
						this.paginateData.disabledPrevBtn = "true";
					}

				}
				else
				{
					this.util.loading.dismiss();
					this.util.presentToast(res.json().message);
				}

			},
			error => { 
				this.util.loading.dismiss();
				this.util.presentToast('Server Error! try logout and login again!');
			}
			);
	}

	view(id)
	{
		let data = {
			id: id
		}
		const modal = this.modalCtrl.create('ViewDeliveryPage', data);

		modal.present();

		modal.onWillDismiss((data) => {

		})
	}

	filter()
	{
		const passingData = {
			filterData : this.filterData,
		}

		const modal = this.modalCtrl.create('FilterTakenDeliveryPage', passingData);

		modal.present();

		modal.onWillDismiss((res) => {
			if(res)
 			{
				if(res.status == 'APPLY')
				{
					this.filterData        = res.filterData;
					this.paginateData.page = 1;
				    this.load();
				}
				else if(res.status == 'RESET')
				{
					this.filterData        = this.filterInit;
					this.paginateData.page = 1;
				    this.load();
				}
			}
		})
	}

	nextPage()
	{
		this.paginateData.page = this.paginateData.page + 1;
		this.load();
	}

	prevPage()
	{
		this.paginateData.page = this.paginateData.page - 1;
		this.load();
	}

	indexPage()
	{
		const passingData = {
			paginateData : this.paginateData,
		}

		const modal = this.modalCtrl.create('GotoPage', passingData);

		modal.present();

		modal.onWillDismiss((res) => {
			if(res)
 			{
				if(res.status == 'APPLY')
				{
					this.paginateData.page = res.data.page;
				    this.load();
				}
			}
		})
	}

	undoTake(id)
	{
		let options = new RequestOptions({ headers: this.headers });

		let data = {
			id : id
		}

		this.util.showLoader('Loading...');
		this.http.post(this.env.base_url+"api/delivery/undoTake", data, options)
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
				this.util.presentToast('Server Error! try logout and login again!');
			}
			);
	}


	startSend(id)
	{
		var latitude  = 0;
		var longitude = 0;

		this.geolocation.getCurrentPosition().then((resp) => {
			latitude  = resp.coords.latitude;
			longitude = resp.coords.longitude;

			let options = new RequestOptions({ headers: this.headers });

			let data = {
				id              : id,
				start_latitude	: latitude,
				start_longitude : longitude,
				key             : this.env.gmap_api,
			}

			this.util.showLoader('Loading...');
			this.http.post(this.env.base_url+"api/delivery/startSend", data, options)
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
					this.util.presentToast('Server Error! try logout and login again!');
				}
				);
		}).catch((error) => {
			this.util.presentToast('Error! please allow access location to complete task!');
		});
	}

	undoStartSend(id)
	{
		let options = new RequestOptions({ headers: this.headers });

		let data = {
			id : id
		}

		this.util.showLoader('Loading...');
		this.http.post(this.env.base_url+"api/delivery/undoStartSend", data, options)
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
				this.util.presentToast('Server Error! try logout and login again!');
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
				placeholder: 'Nama penerima'
			},
			],
			buttons: [
			{
				text: 'Batal',
				role: 'cancel',
				handler: data => {
				}
			},
			{
				text: 'Submit',
				handler: get => {
					if (get.received_by != '') {

						var latitude  = 0;
						var longitude = 0;

						this.geolocation.getCurrentPosition().then((resp) => {
							latitude  = resp.coords.latitude;
							longitude = resp.coords.longitude;

							let options = new RequestOptions({ headers: this.headers });
							let data = {
								id : id,
								end_latitude  : latitude,
								end_longitude : longitude,
								received_by   : get.received_by
							}

							this.util.showLoader('Loading...');
							this.http.post(this.env.base_url+"api/delivery/finish", data, options)
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
									this.util.presentToast('Server Error! try logout and login again!');
								}
							);
						}).catch((error) => {
							this.util.presentToast('Error! please allow access location to complete task!');
						});
					} 
					else
					{
						this.util.presentToast('masukan nama penerima');
					}
				}
			}
			]
		});
		alert.present();


	}

	undoFinish(id)
	{
		let options = new RequestOptions({ headers: this.headers });

		let data = {
			id : id
		}

		this.util.showLoader('Loading...');
		this.http.post(this.env.base_url+"api/delivery/undoFinish", data, options)
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
				this.util.presentToast('Server Error! try logout and login again!');
			}
			);
	}
}
