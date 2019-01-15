import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';
import { EnviromentProvider } from '../../../providers/enviroment/enviroment';
import { UtilityProvider } from '../../../providers/utility/utility';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';

import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the ListCrmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage({
 	name: 'list-crm',
 	segment: 'list-crm',
 	defaultHistory: ['home']
 })
 @Component({
 	selector: 'page-list-crm',
 	templateUrl: 'list-crm.html',
 })
 export class ListCrmPage {

 	index:any     = [];

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
 		limit : 30,
 		sort  : 'crm_detail.id',
 		order : 'DESC',

 		f_company    : '',
 		f_activity  : '',
 		f_status   : 'NOT_FINISHED',
 		f_id     : '',

 	};

 	filterInit:any = {
 		limit : 30,
 		sort  : 'crm_detail.id',
 		order : 'DESC',

 		f_company    : '',
 		f_activity  : '',
 		f_status   : 'NOT_FINISHED',
 		f_id     : '',
 	}

 	headers:any;

 	current_group:any = '';

 	constructor(public navCtrl   : NavController,
 		public navParams : NavParams,
 		public modalCtrl : ModalController,
 		public http      : Http, 
 		public env       : EnviromentProvider,
 		public util      : UtilityProvider,
 		public auth      : AuthenticationProvider,
 		private geolocation : Geolocation,
 		) {
 		this.headers = new Headers();
 		this.headers.append('Accept', 'application/json');
 		this.headers.append('Authorization', 'Bearer '+localStorage.getItem('token'));
 	}

 	ionViewDidLoad() {
 		this.load();
 	}

 	refresh(refresher)
 	{
 		let options = new RequestOptions({ headers: this.headers });

 		let data = {
 			f_company  : this.filterData.f_company,
 			f_activity : this.filterData.f_activity,
 			f_status   : this.filterData.f_status,
 			f_id       : this.filterData.f_id,

 			limit : this.filterData.limit,
 			sort  : this.filterData.sort,
 			order : this.filterData.order,

 			page : this.paginateData.page,
 		}
 		
 		this.http.post(this.env.base_url+"api/crm/schedule", data, options)
 		.subscribe(
 			res => { 
 				if(res.json().status == "OK")
 				{
 					refresher.complete();
 					this.index = res.json().data.index.data;
 					
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
 			f_company  : this.filterData.f_company,
 			f_activity : this.filterData.f_activity,
 			f_status   : this.filterData.f_status,
 			f_id       : this.filterData.f_id,

 			limit : this.filterData.limit,
 			sort  : this.filterData.sort,
 			order : this.filterData.order,

 			page : this.paginateData.page,
 		}

 		this.util.showLoader('Loading...');
 		this.http.post(this.env.base_url+"api/crm/schedule", data, options)
 		.subscribe(
 			res => {
 				if(res.json().status == "OK")
 				{
 					this.util.loading.dismiss();
 					this.index = res.json().data.index.data;

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

 	filter()
 	{
 		const passingData = {
 			filterData : this.filterData
 		}

 		const modal = this.modalCtrl.create('FilterListCrmPage', passingData);

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

 	create()
 	{

 		const modal = this.modalCtrl.create('CreateCrmPage');

 		modal.present();

 		modal.onWillDismiss((res) => {
 			if(res)
 			{
	 			if(res.status == 'APPLY')
	 			{
	 				this.load();
	 			}
	 		}
 		})
 	}


 	next(crm_id)
 	{
 		const passingData = {
 			crm_id : crm_id,
 		}

 		const modal = this.modalCtrl.create('NextCrmPage', passingData);

 		modal.present();

 		modal.onWillDismiss((res) => {
 			if(res)
 			{
	 			if(res.status == 'APPLY')
	 			{
	 				this.load();
	 			}
	 		}
 		})
 	}

 	reschedule(id, activity, datetime_activity)
 	{
 		const passingData = {
 			id : id,
 			activity : activity,
 			datetime_activity : datetime_activity,
 		}

 		const modal = this.modalCtrl.create('RescheduleCrmPage', passingData);

 		modal.present();

 		modal.onWillDismiss((res) => {
 			if(res)
 			{
	 			if(res.status == 'APPLY')
	 			{
	 				this.load();
	 			}
	 		}
 		})
 	}

 	checkIn(id)
 	{
 		var latitude  = 0;
 		var longitude = 0;

 		this.util.showLoader('Loading...');
 		this.geolocation.getCurrentPosition().then((resp) => {
 			latitude  = resp.coords.latitude;
 			longitude = resp.coords.longitude;

 			let options = new RequestOptions({ headers: this.headers });

 			let data = {
 				id                 : id,
 				latitude_check_in  : latitude,
 				longitude_check_in : longitude,
 			}

 			
 			this.http.post(this.env.base_url+"api/crm/checkIn", data, options)
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
 			this.util.loading.dismiss();
 			this.util.presentToast('Error! please allow access location to complete task!');
 		});
 	}

 	checkOut(id)
 	{
 		var latitude  = 0;
 		var longitude = 0;

 		this.util.showLoader('Loading...');
 		this.geolocation.getCurrentPosition().then((resp) => {
 			latitude  = resp.coords.latitude;
 			longitude = resp.coords.longitude;

 			let options = new RequestOptions({ headers: this.headers });

 			let data = {
 				id                  : id,
 				latitude_check_out  : latitude,
 				longitude_check_out : longitude,
 			}

 			
 			this.http.post(this.env.base_url+"api/crm/checkOut", data, options)
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
 			this.util.loading.dismiss();
 			this.util.presentToast('Error! please allow access location to complete task!');
 		});
 	}

 	sendFeedbackEmail(id, feedback_email)
 	{
 		const passingData = {
 			id : id,
 			feedback_email : feedback_email,
 		}

 		const modal = this.modalCtrl.create('SendFeedbackEmailCrmPage', passingData);

 		modal.present();

 		modal.onWillDismiss((res) => {
 			if(res)
 			{
	 			if(res.status == 'APPLY')
	 			{
	 				this.load();
	 			}
	 		}
 		})
 	}

 	sendFeedbackWhatsapp(id, feedback_phone)
 	{
 		const passingData = {
 			id : id,
 			feedback_phone : feedback_phone,
 		}

 		const modal = this.modalCtrl.create('SendFeedbackWhatsappCrmPage', passingData);

 		modal.present();

 		modal.onWillDismiss((res) => {
 			if(res)
 			{
	 			if(res.status == 'APPLY')
	 			{
	 				this.load();
	 			}
	 		}
 		})
 	}

 }
