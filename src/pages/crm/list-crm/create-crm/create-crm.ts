import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';
import { UtilityProvider } from '../../../../providers/utility/utility';
import { EnviromentProvider } from '../../../../providers/enviroment/enviroment';

/**
 * Generated class for the CreateCrmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-create-crm',
 	templateUrl: 'create-crm.html',
 })
 export class CreateCrmPage {

 	inputData:any = {
 		type : '',

 		company_id : '',
 		company_name_prospec : '',
 		company_phone_prospec : '',
 		company_fax_prospec : '',

 		pic_id : '',
 		pic_fullname_prospec : '',
 		pic_gender_prospec : '',
 		pic_position_prospec : '',
 		pic_phone_prospec : '',
 		pic_email_prospec : '',

 		address_id : '',
 		address_prospec : '',

 		brand_id : '',
 		brand_prospec : '',

 		activity      : '',
 		date_activity : '',
 		time_activity : '',
 	};

 	errorData:any = {
 		type : '',

 		company_id : '',
 		company_name_prospec : '',
 		company_phone_prospec : '',
 		company_fax_prospec : '',

 		pic_id : '',
 		pic_fullname_prospec : '',
 		pic_gender_prospec : '',
 		pic_position_prospec : '',
 		pic_phone_prospec : '',
 		pic_email_prospec : '',

 		address_id : '',
 		address_prospec : '',
 		
 		brand_id : '',
 		brand_prospec : '',

 		activity      : '',
 		date_activity : '',
 		time_activity : '',
 	};

 	company:any;
 	brand:any;
 	address:any;
 	pic:any;


 	activity:any;
 	type:any;
 	minDate:any;
 	maxDate:any;

 	step:number = 0;


 	headers:any;

 	constructor(public viewCtrl  : ViewController,
 		public navParams : NavParams,
 		public env       : EnviromentProvider,
 		public http      : Http, 
 		public util      : UtilityProvider,) {

 		this.headers = new Headers();
 		this.headers.append('Accept', 'application/json');
 		this.headers.append('Authorization', 'Bearer '+localStorage.getItem('token'));
 	}

 	ionViewDidLoad() {
 		this.minDate = new Date().toISOString();

 		var now = new Date();
 		var addMaxYear = now.getFullYear() + 1
 		this.maxDate = addMaxYear;
		this.getCollection();
		this.getCompany();
 	}

 	setStep(n:number)
 	{
 		this.step = n;
 	}

 	close()
	{
		const returnData = {
			status: 'CANCEL',
		}

		this.viewCtrl.dismiss(returnData);
	}

 	checkValidation(current:number)
 	{
 		// 0 = select type crm (if client goto 1, if prospec goto 2)
		// 1 = select company, pic, address, brand for crm type client (if company and pic not empty goto 10)
		// 2 = select company for crm type prospec (if new goto 3, if select company goto 4)
		// 3 = create company (goto 5)
		// 4 = select pic for crm type prospec (if new goto 5, if select pic goto 6)
		// 5 = create pic (goto 7, if company selected goto 6)
		// 6 = select brand for crm type prospec (if new goto 7, if select brand or not goto 8)
		// 7 = create brand (goto 9, if company selected goto 8)
		// 8 = select address for crm type prospec (if new goto 9, if select address or not goto 10)
		// 9 = create address (goto 10)
		// 10 = create activity
		// 11 = finish


		switch (current) {
			case 0:
				if(this.inputData.type == 'CLIENT')
	 			{
					this.setStep(1);
	 			}
	 			else if(this.inputData.type == 'PROSPEC')
	 			{
	 				this.setStep(2);
	 			}
	 			else
	 			{
	 				this.util.presentToast('Pilih tipe!');
	 			}
				break;

			case 1:
				if(this.inputData.company_id != '' && this.inputData.pic_id != '')
	 			{
					this.setStep(10);
	 			}
	 			else
	 			{
	 				this.util.presentToast('Perusahaan dan PIC tidak boleh kosong!');
	 			}

				break;

			case 2:
				if(this.inputData.company_id != '')
	 			{
					this.setStep(4);
	 			}
	 			else
	 			{
	 				this.util.presentToast('Perusahaan tidak boleh kosong!');
	 			}
				break;

			case 3:
				if(this.inputData.company_name_prospec != '')
	 			{
					this.setStep(5);
	 			}
	 			else
	 			{
	 				this.util.presentToast('Nama perusahaan tidak boleh kosong!');
	 			}

				break;

			case 4:
				if(this.inputData.pic_id != '')
	 			{
					this.setStep(6);
	 			}
	 			else
	 			{
	 				this.util.presentToast('PIC tidak boleh kosong!');
	 			}

				break;
			case 5:
				if(this.inputData.pic_fullname_prospec != '' && this.inputData.pic_gender_prospec != '' 
					&& this.inputData.pic_phone_prospec != '' && this.inputData.pic_email_prospec != '')
	 			{
 					this.setStep(6);
	 			}
	 			else
	 			{
	 				this.util.presentToast('PIC nama, jenis kelamin, handphone dan email tidak boleh kosong!');
	 			}

				break;
			
			case 6:
				if(this.inputData.activity != '' && this.inputData.date_activity != '' && this.inputData.time_activity != '')
	 			{
					let options = new RequestOptions({ headers: this.headers });

					var date = new Date(this.inputData.date_activity);

					let data = {
						type : this.inputData.type,

				 		company_id : this.inputData.company_name_prospec != '' ? '' : this.inputData.company_id,
				 		company_name_prospec : this.inputData.company_name_prospec,
				 		company_phone_prospec : this.inputData.company_phone_prospec,
				 		company_fax_prospec : this.inputData.company_fax_prospec,

				 		pic_id : this.inputData.pic_fullname_prospec != '' ? '' : this.inputData.pic_id,
				 		pic_fullname_prospec : this.inputData.pic_fullname_prospec,
				 		pic_gender_prospec : this.inputData.pic_gender_prospec,
				 		pic_position_prospec : this.inputData.pic_position_prospec,
				 		pic_phone_prospec : this.inputData.pic_phone_prospec,
				 		pic_email_prospec : this.inputData.pic_email_prospec,

				 		address_id : this.inputData.address_id == 'new' || this.inputData.address_prospec != ''  ? '' : this.inputData.address_id,
				 		address_prospec : this.inputData.address_prospec,
				 		
				 		brand_id : this.inputData.brand_id == 'new' ? '' || this.inputData.brand_prospec != '' : this.inputData.brand_id,
				 		brand_prospec : this.inputData.brand_prospec,

				 		activity : this.inputData.activity,
				 		date_activity : this.util.datePHPFormat(date),
				 		time_activity : this.inputData.time_activity,
					};

					const returnData = {
						status: 'APPLY',
					}

					this.util.showLoader('Loading...');
					this.http.post(this.env.base_url+"api/crm/create", data, options)
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
	 			else
	 			{
	 				this.util.presentToast('Aktifitas tidak boleh kosong!');
	 			}

				break;
			
			default:
				// code...
				break;
		}
 	}

 	back(current:number)
 	{	
 		// 0 = select type crm (if client goto 1, if (back exit)
		// 1 = select company, pic, address, brand for crm type client (back goto 0)
		// 2 = select company for crm type prospec (back goto 0)
		// 3 = create company (back goto 2)
		// 4 = select pic for crm type prospec (back goto 2, if company prospec filled goto 3)
		// 5 = create pic (back goto 3, if company selected goto 4)
		// 6 = select brand for crm type prospec (back goto 4, if pic prospec filled goto 5)
		// 7 = create brand (back goto 5, if company selected goto 6)
		// 8 = select address for crm type prospec (back goto 6, if brand prospec filled goto 7)
		// 9 = create address (back goto 7, if company selected goto 8)
		// 10 = create activity (back goto 8, if address prospec filled goto 9)
		// 11 = finish

		switch (current) {
			case 0:
				this.viewCtrl.dismiss();
				break;

			case 1:
				this.inputData.company_id = '';
				this.inputData.pic_id = '';
				this.inputData.brand_id = '';
				this.inputData.address_id = '';

				this.setStep(0);
				break;

			case 2:
				this.inputData.company_id = '';
				this.inputData.brand_id = '';
				this.inputData.address_id = '';
				
				this.inputData.brand_prospec = '';
				this.inputData.address_prospec = '';

				this.setStep(0);
				break;

			case 3:
				this.inputData.company_name_prospec = '';
				this.inputData.company_phone_prospec = '';
				this.inputData.company_fax_prospec = '';
				this.inputData.brand_prospec = '';
				this.inputData.address_prospec = '';

				this.setStep(2);
				break;

			case 4:

				this.inputData.pic_id = '';

				if(this.inputData.company_name_prospec != '')
	 			{
					this.setStep(3);
	 			}
	 			else
	 			{
	 				this.setStep(2);
	 			}

				break;
			case 5:

				this.inputData.pic_fullname_prospec = '';
				this.inputData.pic_gender_prospec = '';
				this.inputData.pic_position_prospec = '';
				this.inputData.pic_phone_prospec = '';
				this.inputData.pic_email_prospec = '';

				if(this.inputData.company_id != '')
	 			{
					this.setStep(4);
	 			}
	 			else
	 			{
	 				this.setStep(3);
	 			}

				break;
			case 6:
				this.inputData.activity = '';
				this.inputData.date_activity = '';
				this.inputData.time_activity = '';

				if(this.inputData.type == 'CLIENT')
				{
					
					this.setStep(1);
				}
				else if(this.inputData.pic_fullname_prospec != '')
	 			{
					this.setStep(5);
	 			}
	 			else
	 			{
	 				this.setStep(4);
	 			}

				break;
			
			default:
				// code...
				break;
		}
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
						this.activity = data.json().data.activity_new;
						this.type = data.json().data.type;
					}
				},
				error => { 
					this.util.presentToast('Server Error! try logout and login again!');
				}
			);

		
	}

	getCompany(id:number = 0)
	{
		let options = new RequestOptions({ headers: this.headers });

		let data = {
			f_company : id,
		};

		this.http.post(this.env.base_url+"api/company/get", data, options)
			.subscribe(
				data => { 
					if(data.json().status == "OK")
					{
						this.company = data.json().data.company;
						this.brand = data.json().data.brand;
						this.address = data.json().data.address;
						this.pic = data.json().data.pic;

						this.inputData.pic_id = '';
						this.inputData.brand_id = '';
						this.inputData.address_id = '';
					}
				},
				error => { 
					this.util.presentToast('Server Error! try logout and login again!');
				}
			);
	}

 }
