import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';

import { UtilityProvider } from '../../../providers/utility/utility';
import { EnviromentProvider } from '../../../providers/enviroment/enviroment';

/**
* Generated class for the DesignerCreatePage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
	selector: 'page-designer-create',
	templateUrl: 'designer-create.html',
})
export class DesignerCreatePage {

	inputData:any = {
		designer_id : '',
		project : '',
		description : '',
	}

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
	}


	close()
 	{
 		const returnData = {
 			status: 'CANCEL',
 		}
 		this.viewCtrl.dismiss(returnData);
 	}

 	checkValidation()
 	{
 		if(this.inputData.designer_id == '' || this.inputData.project == '')
		{
			this.util.presentToast('Fill Designer and name project!');
		}
		else
		{
			this.submit();
		}
 	}

 	submit()
 	{
 		let options = new RequestOptions({ headers: this.headers });

 		let data = {
 			designer_id : this.inputData.designer_id, 
 			project : this.inputData.project, 
 			description : this.inputData.description, 
 		};

 		this.http.post(this.env.base_url+"api/designer/store", data, options)
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
				}
			},
			error => { 
				this.util.presentToast('Server Error! try logout and login again!');
				this.util.loading.dismiss();
		 		this.viewCtrl.dismiss();
			}
 		);
 	}

}
