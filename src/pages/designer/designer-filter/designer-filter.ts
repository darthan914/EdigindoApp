import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';

import { UtilityProvider } from '../../../providers/utility/utility';
import { EnviromentProvider } from '../../../providers/enviroment/enviroment';


/**
* Generated class for the DesignerFilterPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
	selector: 'page-designer-filter',
	templateUrl: 'designer-filter.html',
})
export class DesignerFilterPage {

	filterData:any = {
		limit : 30,
		sort  : 'designer.id',
		order : 'DESC',

		f_company    : '',
		f_activity  : '',
		f_status   : '',
		f_id     : '',
	};

	designer:any;
	year:any;
	month:any;
	status:any;
	sort:any;

	headers:any;


	constructor(
		public viewCtrl  : ViewController,
 		public navParams : NavParams,
 		public env       : EnviromentProvider,
 		public http      : Http, 
 		public util      : UtilityProvider
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
 					this.designer = data.json().data.designer;
 					this.year = data.json().data.year;
 					this.month = data.json().data.month;
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
