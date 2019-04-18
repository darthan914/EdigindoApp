import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';

import { UtilityProvider } from '../../../providers/utility/utility';
import { EnviromentProvider } from '../../../providers/enviroment/enviroment';

/**
 * Generated class for the DesignerDeletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-designer-delete',
  templateUrl: 'designer-delete.html',
})
export class DesignerDeletePage {

	id:any

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

		this.id = this.navParams.get('id');
	}



	close()
 	{
 		const returnData = {
 			status: 'CANCEL',
 		}
 		this.viewCtrl.dismiss(returnData);
 	}

 	submit()
 	{
 		let options = new RequestOptions({ headers: this.headers });

 		let data = {
 			id : this.id,
 		};

 		this.http.post(this.env.base_url+"api/designer/delete", data, options)
 		.subscribe(
 			data => { 
 				if(data.json().status == "OK")
 				{
 					this.util.presentToast(data.json().message);
					this.util.loading.dismiss();
					const returnData = {
			 			status: 'APPLY',
			 		}
			 		this.viewCtrl.dismiss(returnData);
 				}
	 			else
				{
					this.util.loading.dismiss();
					this.util.presentToast(data.json().message);
						const returnData = {
			 			status: 'FAILED',
			 		}
			 		this.viewCtrl.dismiss(returnData);
				}
			},
			error => { 
				this.util.presentToast('Server Error! try logout and login again!');
				this.util.loading.dismiss();
				const returnData = {
		 			status: 'FAILED',
		 		}
		 		this.viewCtrl.dismiss(returnData);
			}
 		);
 	}


}
