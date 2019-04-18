import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';
import { EnviromentProvider } from '../../providers/enviroment/enviroment';
import { UtilityProvider } from '../../providers/utility/utility';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

/**
* Generated class for the DesignerPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage({
	name: 'list-designer',
	segment: 'list-designer',
	defaultHistory: ['home']
})
@Component({
	selector: 'page-designer',
	templateUrl: 'designer.html',
})
export class DesignerPage {

	index:any     = [];

	paginateData:any = {
		page           : 1,
		last_page      : 1,
		from           : 0,
		to             : 0,
		total          : 0,
		disabledNextBtn : "true",
		disabledPrevBtn : "true",
	}

	filterData:any = {
		limit : 30,
		sort  : 'designer.id',
		order : 'DESC',

		f_year : '',
		f_month : '',
		f_id     : '',
		search   : '',

	};

	filterInit:any = {
		limit : 30,
		sort  : 'designer.id',
		order : 'DESC',

		f_year : '',
		f_month : '',
		f_id     : '',
		search   : '',
	}

	headers:any;


	constructor(
		public navCtrl   : NavController,
		public navParams : NavParams,
		public modalCtrl : ModalController,
		public http      : Http, 
		public env       : EnviromentProvider,
		public util      : UtilityProvider,
		public auth      : AuthenticationProvider)
	{
		this.headers = new Headers();
		this.headers.append('Accept', 'application/json');
		this.headers.append('Authorization', 'Bearer '+localStorage.getItem('token'));
	}

	ionViewDidLoad() {
		this.load();
	}

	refresh(refresher)
 	{
 		let options = new RequestOptions({ headers: this.headers });

 		let data = {
 			f_year  : this.filterData.f_year,
 			f_month : this.filterData.f_month,
 			f_designer : this.filterData.f_designer,
 			search   : this.filterData.search,
 			f_id       : this.filterData.f_id,

 			limit : this.filterData.limit,
 			sort  : this.filterData.sort,
 			order : this.filterData.order,

 			page : this.paginateData.page,
 		}
 		
 		this.http.post(this.env.base_url+"api/designer", data, options)
 		.subscribe(
 			res => { 
 				if(res.json().status == "OK")
 				{
 					refresher.complete();
 					this.index = res.json().data.index.data;
 					
 					this.paginateData.from      = res.json().data.index.from;
 					this.paginateData.to        = res.json().data.index.to;
 					this.paginateData.total     = res.json().data.index.total;
 					this.paginateData.last_page = res.json().data.index.last_page;

 					if(res.json().data.index.next_page_url != null)
 					{
 						this.paginateData.disabledNextBtn = "false";
 					}
 					else
 					{
 						this.paginateData.disabledNextBtn = "true";
 					}

 					if(res.json().data.index.prev_page_url != null)
 					{
 						this.paginateData.disabledPrevBtn = "false";
 					}
 					else
 					{
 						this.paginateData.disabledPrevBtn = "true";
 					}
 					
 				}
 				else
 				{
 					refresher.complete();
 					this.util.presentToast(res.json().message);
 				}
 				
 			},
 			error => { 
 				refresher.complete();
 				this.util.presentToast('Server Error! try logout and login again!');
 			}
 			);
 	}

 	load()
 	{
 		let options = new RequestOptions({ headers: this.headers });

 		let data = {
 			f_year  : this.filterData.f_year,
 			f_month : this.filterData.f_month,
 			f_designer : this.filterData.f_designer,
 			search   : this.filterData.search,
 			f_id       : this.filterData.f_id,

 			limit : this.filterData.limit,
 			sort  : this.filterData.sort,
 			order : this.filterData.order,

 			page : this.paginateData.page,
 		}

 		this.util.showLoader('Loading...');
 		this.http.post(this.env.base_url+"api/designer", data, options)
 		.subscribe(
 			res => {
 				if(res.json().status == "OK")
 				{
 					this.util.loading.dismiss();
 					this.index = res.json().data.index.data;

 					this.paginateData.from      = res.json().data.index.from;
 					this.paginateData.to        = res.json().data.index.to;
 					this.paginateData.total     = res.json().data.index.total;
 					this.paginateData.last_page = res.json().data.index.last_page;

 					if(res.json().data.index.next_page_url != null)
 					{
 						this.paginateData.disabledNextBtn = "false";
 					}
 					else
 					{
 						this.paginateData.disabledNextBtn = "true";
 					}

 					if(res.json().data.index.prev_page_url != null)
 					{
 						this.paginateData.disabledPrevBtn = "false";
 					}
 					else
 					{
 						this.paginateData.disabledPrevBtn = "true";
 					}
 					
 				}
 				else
 				{
 					this.util.loading.dismiss();
 					this.util.presentToast(res.json().message);
 				}
 				
 			},
 			error => { 
 				this.util.loading.dismiss();
 				this.util.presentToast('Server Error! try logout and login again!');
 			}
 		);
 	}

 	filter()
 	{
 		const passingData = {
 			filterData : this.filterData
 		}

 		const modal = this.modalCtrl.create('DesignerFilterPage', passingData);

 		modal.present();

 		modal.onWillDismiss((res) => {
 			if(res)
 			{
	 			if(res.status == 'APPLY')
	 			{
	 				this.filterData        = res.filterData;
	 				this.paginateData.page = 1;
	 				this.load();
	 			}
	 			else if(res.status == 'RESET')
	 			{
	 				this.filterData        = this.filterInit;
	 				this.paginateData.page = 1;
	 				this.load();
	 			}
	 		}
 		})
 	}

 	nextPage()
 	{
 		this.paginateData.page = this.paginateData.page + 1;
 		this.load();
 	}

 	prevPage()
 	{
 		this.paginateData.page = this.paginateData.page - 1;
 		this.load();
 	}

 	indexPage()
 	{
 		const passingData = {
 			paginateData : this.paginateData,
 		}

 		const modal = this.modalCtrl.create('GotoPage', passingData);

 		modal.present();

 		modal.onWillDismiss((res) => {
 			if(res)
 			{
	 			if(res.status == 'APPLY')
	 			{
	 				this.paginateData.page = res.data.page;
	 				this.load();
	 			}
	 		}
 		})
 	}

 	create()
 	{

 		const modal = this.modalCtrl.create('DesignerCreatePage');

 		modal.present();

 		modal.onWillDismiss((res) => {
 			if(res)
 			{
	 			if(res.status == 'APPLY')
	 			{
	 				this.load();
	 			}
	 		}
 		})
 	}

 	edit(id)
 	{
 		const passingData = {
 			id : id,
 		}

 		const modal = this.modalCtrl.create('DesignerEditPage', passingData);

 		modal.present();

 		modal.onWillDismiss((res) => {
 			if(res)
 			{
	 			if(res.status == 'APPLY')
	 			{
	 				this.load();
	 			}
	 		}
 		})
 	}


 	delete(id)
 	{
 		const passingData = {
 			id : id,
 		}

 		const modal = this.modalCtrl.create('DesignerDeletePage', passingData);

 		modal.present();

 		modal.onWillDismiss((res) => {
 			if(res)
 			{
	 			if(res.status == 'APPLY')
	 			{
	 				this.load();
	 			}
	 		}
 		})
 	}

 	approve(id)
 	{
 		
 		let options = new RequestOptions({ headers: this.headers });

 		let data = {
 			id: id
 		}
 		
 		this.http.post(this.env.base_url+"api/designer/approve", data, options)
 		.subscribe(
 			res => { 
 				if(res.json().status == "OK")
 				{
 					this.load();
 				}
 				else
 				{
 					this.load();
 					this.util.presentToast(res.json().message);
 				}
 				
 			},
 			error => { 
 				this.load();
 				this.util.presentToast('Server Error! try logout and login again!');
 			}
 		);
 	}

 	reject(id)
 	{
 		let options = new RequestOptions({ headers: this.headers });

 		let data = {
 			id: id
 		}
 		
 		this.http.post(this.env.base_url+"api/designer/reject", data, options)
 		.subscribe(
 			res => { 
 				if(res.json().status == "OK")
 				{
 					this.load();
 				}
 				else
 				{
 					this.load();
 					this.util.presentToast(res.json().message);
 				}
 				
 			},
 			error => { 
 				this.load();
 				this.util.presentToast('Server Error! try logout and login again!');
 			}
 		);
 	}

 	success(id)
 	{
 		let options = new RequestOptions({ headers: this.headers });

 		let data = {
 			id: id
 		}
 		
 		this.http.post(this.env.base_url+"api/designer/success", data, options)
 		.subscribe(
 			res => { 
 				if(res.json().status == "OK")
 				{
 					this.load();
 				}
 				else
 				{
 					this.load();
 					this.util.presentToast(res.json().message);
 				}
 				
 			},
 			error => { 
 				this.load();
 				this.util.presentToast('Server Error! try logout and login again!');
 			}
 		);
 	}

 	failed(id)
 	{
 		let options = new RequestOptions({ headers: this.headers });

 		let data = {
 			id: id
 		}
 		
 		this.http.post(this.env.base_url+"api/designer/failed", data, options)
 		.subscribe(
 			res => { 
 				if(res.json().status == "OK")
 				{
 					this.load();
 				}
 				else
 				{
 					this.load();
 					this.util.presentToast(res.json().message);
 				}
 				
 			},
 			error => { 
 				this.load();
 				this.util.presentToast('Server Error! try logout and login again!');
 			}
 		);
 	}

}
