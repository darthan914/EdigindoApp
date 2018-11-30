import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';
import { EnviromentProvider } from '../../../providers/enviroment/enviroment';
import { UtilityProvider } from '../../../providers/utility/utility';

/**
 * Generated class for the PricePurchasingRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-view-purchasing-request',
	templateUrl: 'view-purchasing-request.html',
})
export class ViewPurchasingRequestPage {

	id:any;
	index:any = [];

	headers:any;

	constructor(
		public viewCtrl  : ViewController,
		public navParams : NavParams,
		public http      : Http, 
		public env       : EnviromentProvider,
		public util      : UtilityProvider) 
	{
		this.headers = new Headers();
		this.headers.append('Accept', 'application/json');
        this.headers.append('Authorization', 'Bearer '+localStorage.getItem('token'));
        
		this.id = navParams.get('id');
	}

	ionViewWillLoad() {
		this.load();
	}

	load()
	{
		let options = new RequestOptions({ headers: this.headers });

		let data = {id: this.id};

		this.util.showLoader('Loading...');
		this.http.post(this.env.base_url+"api/listRequest/view", data, options)
		.subscribe(
			data => {
				this.util.loading.dismiss();
				if(data.json().status == "OK")
				{
					this.index = data.json().data;
				}
				else
				{
					this.util.presentToast(data.json().message);
					this.viewCtrl.dismiss();
				}

			},
			error => { 
				this.util.loading.dismiss();
				this.util.presentToast('Server Error! try logout and login again!');
			}
			);
	}

	close()
	{
		const returnData = {
			status: 'CANCEL',
		}
		this.viewCtrl.dismiss(returnData);
	}

}
