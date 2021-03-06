import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';
import { UtilityProvider } from '../../../../providers/utility/utility';
import { EnviromentProvider } from '../../../../providers/enviroment/enviroment';

import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the SendFeedbackCrmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-send-feedback-whatsapp-crm',
 	templateUrl: 'send-feedback-whatsapp-crm.html',
 })
 export class SendFeedbackWhatsappCrmPage {

 	inputData:any = {
 		id : '',
 		feedback_phone : '',
 	};

 	errorData:any = {
 		feedback_phone : '',
 	};

 	headers:any;

 	constructor(public viewCtrl  : ViewController,
 		public navParams : NavParams,
 		public env       : EnviromentProvider,
 		public http      : Http, 
 		public util      : UtilityProvider,
 		private socialSharing: SocialSharing,) {

 		this.headers = new Headers();
 		this.headers.append('Accept', 'application/json');
 		this.headers.append('Authorization', 'Bearer '+localStorage.getItem('token'));

 		this.inputData.id = this.navParams.get('id');
 		this.inputData.feedback_phone = this.navParams.get('feedback_phone');
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
	 		feedback_phone : this.inputData.feedback_phone,
		};

		const returnData = {
			status: 'APPLY',
		}

		this.util.showLoader('Loading...');
		this.http.post(this.env.base_url+"api/crm/sendFeedbackByWhatsapp", data, options)
			.subscribe(
				data => { 
					if(data.json().status == "OK")
					{
						this.util.presentToast(data.json().message);
						this.util.loading.dismiss();

						this.socialSharing.shareViaWhatsAppToReceiver(data.json().data.index.feedback_phone, data.json().data.text).then(() => {
							this.viewCtrl.dismiss(returnData);
						}).catch(() => {
							this.util.presentToast("Error Sending to Whatsapp");
							this.viewCtrl.dismiss(returnData);
						});

						
					}
					else
					{
				 		this.errorData.feedback_phone = data.json().error.feedback_phone !== undefined? data.json().error.feedback_phone[0] : ''
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
