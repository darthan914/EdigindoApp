import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';
import { UtilityProvider } from '../../../../providers/utility/utility';
import { EnviromentProvider } from '../../../../providers/enviroment/enviroment';

/**
 * Generated class for the RescheduleCrmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-reschedule-crm',
 	templateUrl: 'reschedule-crm.html',
 })
 export class RescheduleCrmPage {

 	inputData:any = {
 		id            : '',
 		activity      : '',
 		date_activity : '',
 		time_activity : '',
 	};

 	errorData:any = {
 		activity      : '',
 		date_activity : '',
 		time_activity : '',
 	};

 	crm:any;
 	activity:any;
 	minDate:any;
 	maxDate:any;

 	headers:any;

 	constructor(public viewCtrl  : ViewController,
 		public navParams : NavParams,
 		public env       : EnviromentProvider,
 		public http      : Http, 
 		public util      : UtilityProvider,) {

 		this.headers = new Headers();
 		this.headers.append('Accept', 'application/json');
 		this.headers.append('Authorization', 'Bearer '+localStorage.getItem('token'));

 		this.inputData.id = this.navParams.get('id');
 		this.inputData.activity = this.navParams.get('activity');
 		this.inputData.date_activity = this.navParams.get('datetime_activity');
 		this.inputData.time_activity = this.navParams.get('datetime_activity');
 	}

 	ionViewWillLoad() {
 		this.minDate = new Date().toISOString();

 		var now = new Date();
 		var addMaxYear = now.getFullYear() + 1
 		this.maxDate = addMaxYear;
		this.getCollection();
	}

	close()
	{
		const returnData = {
			status: 'CANCEL',
		}

		this.viewCtrl.dismiss(returnData);
	}

	apply()
	{
		let options = new RequestOptions({ headers: this.headers });


		var date = new Date(this.inputData.date_activity);
		var time = new Date(this.inputData.time_activity);

		let data = {
			id            : this.inputData.id,
	 		activity      : this.inputData.activity,
	 		date_activity : this.util.datePHPFormat(date),
	 		time_activity : this.util.timeFormat(time),
		};

		const returnData = {
			status: 'APPLY',
		}

		this.util.showLoader('Loading...');
		this.http.post(this.env.base_url+"api/crm/reschedule", data, options)
			.subscribe(
				data => { 
					if(data.json().status == "OK")
					{
						this.util.presentToast(data.json().message);
						this.util.loading.dismiss();
						this.viewCtrl.dismiss(returnData);
					}
					else
					{
				 		this.errorData.activity = data.json().error.activity !== undefined? data.json().error.activity[0] : ''
				 		this.errorData.date_activity = data.json().error.date_activity !== undefined ? data.json().error.date_activity[0] : ''
				 		this.errorData.time_activity = data.json().error.time_activity !== undefined ? data.json().error.time_activity[0] : ''
						this.util.presentToast(data.json().message);
					}
				},
				error => { 
					this.util.presentToast('Server Error! try logout and login again!');
					this.util.loading.dismiss();
					this.viewCtrl.dismiss(returnData);
				}
			);
	}


 	getCollection()
	{
		let options = new RequestOptions({ headers: this.headers });

		let data = {
		};

		this.http.post(this.env.base_url+"api/crm/collection", data, options)
			.subscribe(
				data => { 
					if(data.json().status == "OK")
					{
						this.crm = data.json().data.crm;
						this.activity = data.json().data.activity;
					}
				},
				error => { 
					this.util.presentToast('Server Error! try logout and login again!');
				}
			);
	}

 }
