import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';
import { UtilityProvider } from '../../../../providers/utility/utility';
import { EnviromentProvider } from '../../../../providers/enviroment/enviroment';

/**
 * Generated class for the DeliveryTakenFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-taken-filter-delivery',
	templateUrl: 'filter-taken-delivery.html',
})
export class FilterTakenDeliveryPage {

	filterData:any = { 
		sort  : 'delivery.datetime_send',
		order : 'DESC',
		limit : 30,

		f_when	  : 'all',
		f_status  : '',
		f_id      : '',

		s_spk     : '',
		s_project : ''
	}

	when:any;
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

		this.http.post(this.env.base_url+"api/delivery/collection", data, options)
			.subscribe(
				data => { 
					if(data.json().status == "OK")
					{
						this.when = data.json().data.when;
						this.status = data.json().data.statusf;
						this.sort = data.json().data.sort;
					}
				},
				error => { 
					this.util.presentToast('Server Error! try logout and login again!');
				}
			);
	}


}
