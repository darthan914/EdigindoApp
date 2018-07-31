import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';
import { EnviromentProvider } from '../../../../providers/enviroment/enviroment';

/**
 * Generated class for the DeliveryWaitingFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-delivery-waiting-filter',
	templateUrl: 'filter.html',
})
export class DeliveryWaitingFilterPage {

	f_via    = '';
	f_range  = '';
	f_when   = 'today';
	f_status = 'WAITING';
	f_user   = '';
	f_id     = '';

	s_spk     = '';
	s_project = '';

	limit = 10;
	sort  = 'delivery.id';
	order = 'DESC';

	user:any;
		

	constructor(
		public viewCtrl  : ViewController,
		public navParams : NavParams,
		public env       : EnviromentProvider,
		public http      : Http, 
	) {
		this.f_via     = this.navParams.get('f_via');
		this.f_range   = this.navParams.get('f_range');
		this.f_when    = this.navParams.get('f_when');
		this.f_status  = this.navParams.get('f_status');
		this.f_user    = this.navParams.get('f_user');
		this.f_id      = this.navParams.get('f_id');
		this.s_spk     = this.navParams.get('s_spk');
		this.s_project = this.navParams.get('s_project');

		this.limit = this.navParams.get('limit');
		this.sort  = this.navParams.get('sort');
		this.order = this.navParams.get('order');
	}

	ionViewWillLoad() {
		this.getAllUserDelivery();
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
		const returnData = {
			status: 'APPLY',
			data: {
				f_via     : this.f_via,
				f_range   : this.f_range,
				f_when    : this.f_when,
				f_status  : this.f_status,
				f_user    : this.f_user,
				f_id      : this.f_id,
				s_spk     : this.s_spk,
				s_project : this.s_project,

				limit : this.limit,
				sort  : this.sort,
				order : this.order
			}
		}
		this.viewCtrl.dismiss(returnData);
	}

	reset()
	{
		const returnData = {
			status: 'APPLY',
			data: {
				f_via     : '',
				f_range   : '',
				f_when    : 'today',
				f_status  : 'WAITING',
				f_user    : '',
				f_id      : '',
				s_spk     : '',
				s_project : '',

				limit : 10,
				sort  : 'delivery.id',
				order : 'DESC',
			}
		}
		this.viewCtrl.dismiss(returnData);
	}

	getAllUserDelivery()
	{
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		// headers.append('Access-Control-Allow-Origin' , this.env.base_url);
		// headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
		// headers.append('Accept','application/json');
		// headers.append('content-type','application/json');

		let options = new RequestOptions({ headers: headers });

		let data = {
		};

		this.http.post(this.env.base_url+"api/delivery/user?token="+encodeURI(localStorage.getItem('token')), data, options)
			.subscribe(
				data => { 
					if(data.json().status == "OK")
					{
						this.user = data.json().data;
					}
				},
				error => { 

				}
			);
	}

}
