import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';
import { UtilityProvider } from '../../../../providers/utility/utility';
import { EnviromentProvider } from '../../../../providers/enviroment/enviroment';

/**
 * Generated class for the SendFeedbackCrmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-send-feedback-email-crm',
 	templateUrl: 'send-feedback-email-crm.html',
 })
 export class SendFeedbackEmailCrmPage {

 	inputData:any = {
 		id : '',
 		feedback_email : '',
 	};

 	errorData:any = {
 		feedback_email : '',
 	};

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
 		this.inputData.feedback_email = this.navParams.get('feedback_email');
 	}

 	ionViewWillLoad() {
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

		let data = {
			id : this.inputData.id,
	 		feedback_email : this.inputData.feedback_email,
		};

		const returnData = {
			status: 'APPLY',
		}

		this.util.showLoader('Loading...');
		this.http.post(this.env.base_url+"api/crm/sendFeedbackByEmail", data, options)
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
				 		this.errorData.feedback_email = data.json().error.feedback_email !== undefined? data.json().error.feedback_email[0] : ''
						this.util.loading.dismiss();
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

 }
