import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';
import { UtilityProvider } from '../../../../providers/utility/utility';
import { EnviromentProvider } from '../../../../providers/enviroment/enviroment';

/**
 * Generated class for the FilterListCrmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-filter-list-crm',
 	templateUrl: 'filter-list-crm.html',
 })
 export class FilterListCrmPage {

 	filterData:any = {
 		limit : 30,
 		sort  : 'crm_detail.id',
 		order : 'DESC',

 		f_company    : '',
 		f_activity  : '',
 		f_status   : 'NOT_FINISHED',
 		f_id     : '',
 	};

 	company:any;
 	activity:any;
 	status:any;
 	sort:any;

 	headers:any;

 	constructor(
 		public viewCtrl  : ViewController,
 		public navParams : NavParams,
 		public env       : EnviromentProvider,
 		public http      : Http, 
 		public util      : UtilityProvider,
 		) {

 		this.headers = new Headers();
 		this.headers.append('Accept', 'application/json');
 		this.headers.append('Authorization', 'Bearer '+localStorage.getItem('token'));
 		
 		this.filterData = this.navParams.get('filterData');
 	}

 	ionViewWillLoad() {
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
 		const returnData = {
 			status: 'APPLY',
 			filterData : this.filterData
 		}
 		this.viewCtrl.dismiss(returnData);
 	}

 	reset()
 	{
 		const returnData = {
 			status: 'RESET',
 		}
 		this.viewCtrl.dismiss(returnData);
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
 					this.company = data.json().data.company;
 					this.activity = data.json().data.activity;
 					this.status = data.json().data.status2;
 					this.sort = data.json().data.sort_crm_detail;
 				}
 			},
 			error => { 
 				this.util.presentToast('Server Error! try logout and login again!');
 			}
 			);
 	}
 }
