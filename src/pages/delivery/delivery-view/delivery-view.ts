import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';
import { EnviromentProvider } from '../../../providers/enviroment/enviroment';
import { UtilityProvider } from '../../../providers/utility/utility';

/**
 * Generated class for the DeliveryViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-delivery-view',
	templateUrl: 'delivery-view.html',
})
export class DeliveryViewPage {

	id:any;
	index:any = [];
	isoDate = '';

	constructor(
		public viewCtrl   : ViewController,
		public navParams : NavParams,
		public http      : Http, 
		public env       : EnviromentProvider,
		public util      : UtilityProvider,
	) {
		this.id = navParams.get('id');
	}

	ionViewWillLoad() {
		// console.log('ionViewDidLoad DeliveryViewPage');
		this.load();
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

		let data = {id: this.id};

		this.util.showLoader('Loading...');
		this.http.post(this.env.base_url+"api/delivery/view?token="+encodeURI(localStorage.getItem('token')), data, options)
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
					this.util.presentToast('Server Error!');
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
