import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';
import { EnviromentProvider } from '../../../providers/enviroment/enviroment';
import { UtilityProvider } from '../../../providers/utility/utility';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';

// import { DeliveryViewPage } from '../../delivery/delivery-view/delivery-view';
// import { DeliveryWaitingFilterPage } from '../../delivery/delivery-waiting/filter-delivery-waiting/filter-delivery-waiting';
// import { GotoPage } from '../../goto/goto';
// import { LoginPage } from '../../login/login';
// import { HomePage } from '../../home/home';


/**
 * Generated class for the DeliveryWaitingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
	name: 'delivery',
	segment: 'delivery',
	defaultHistory: ['home']
})
@Component({
	selector: 'page-delivery-waiting',
	templateUrl: 'delivery-waiting.html',
})
export class DeliveryWaitingPage {
	authData: any;

	index:any     = [];
	page:any      = 1;
	last_page:any = 1;

	limit:any = 10;

	from:any  = 0;
	to:any    = 0;
	total:any = 0;

	sort  = 'delivery.id'
	order = 'DESC'

	f_via    = '';
    f_range  = '';
    f_when   = 'today';
    f_status = 'WAITING';
    f_city   = '';
    f_user   = '';
    f_id     = '';

    s_spk     = '';
	s_project = '';

	enabledNextBtn:boolean = false;
	enabledPrevBtn:boolean = false;

	constructor(
		public navCtrl   : NavController,
		public navParams : NavParams,
		public modalCtrl : ModalController,
		public http      : Http, 
		public env       : EnviromentProvider,
		public util      : UtilityProvider,
		public auth      : AuthenticationProvider,
	)
	{
		
	}

	ionViewDidLoad() {
		// console.log('ionViewDidLoad DeliveryWaitingPage');
		this.load();
	}

	refresh(refresher)
	{
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		// headers.append('Access-Control-Allow-Origin' , this.env.base_url);
		// headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
		// headers.append('Accept','application/json');
		// headers.append('content-type','application/json');

		let options = new RequestOptions({ headers: headers });

		let data = {
			f_via     : this.f_via,
			f_range   : this.f_range,
			f_when    : this.f_when,
			f_status  : this.f_status,
			f_city    : this.f_city,
			f_user    : this.f_user,
			f_id      : this.f_id,
			s_spk     : this.s_spk,
			s_project : this.s_project,

			limit : this.limit,
			page  : this.page,
			sort  : this.sort,
			order : this.order
		}
			
		this.http.post(this.env.base_url+"api/delivery?token="+encodeURI(localStorage.getItem('token')), data, options)
			.subscribe(
				data => { 
					if(data.json().status == "OK")
					{
						refresher.complete();
						this.index = data.json().data.data;
						
						this.from      = data.json().data.from;
						this.to        = data.json().data.to;
						this.total     = data.json().data.total;
						this.last_page = data.json().data.last_page;

						if(data.json().data.next_page_url != null)
						{
							this.enabledNextBtn = true;
						}
						else
						{
							this.enabledNextBtn = false;
						}

						if(data.json().data.prev_page_url != null)
						{
							this.enabledPrevBtn = true;
						}
						else
						{
							this.enabledPrevBtn = false;
						}
						
					}
					else
					{
						refresher.complete();
						this.util.presentToast(data.json().message);
					}
					
				},
				error => { 
					refresher.complete();
					this.util.presentToast('Server Error!');
				}
			);
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

		let data = {
			f_via     : this.f_via,
			f_range   : this.f_range,
			f_when    : this.f_when,
			f_status  : this.f_status,
			f_city    : this.f_city,
			f_user    : this.f_user,
			f_id      : this.f_id,
			s_spk     : this.s_spk,
			s_project : this.s_project,

			limit : this.limit,
			page  : this.page,
			sort  : this.sort,
			order : this.order
		}

		this.util.showLoader('Loading...');
		this.http.post(this.env.base_url+"api/delivery?token="+encodeURI(localStorage.getItem('token')), data, options)
			.subscribe(
				data => {
					if(data.json().status == "OK")
					{
						this.util.loading.dismiss();
						this.index = data.json().data.data;
						
						this.from      = data.json().data.from;
						this.to        = data.json().data.to;
						this.total     = data.json().data.total;
						this.last_page = data.json().data.last_page;

						if(data.json().data.next_page_url != null)
						{
							this.enabledNextBtn = true;
						}
						else
						{
							this.enabledNextBtn = false;
						}

						if(data.json().data.prev_page_url != null)
						{
							this.enabledPrevBtn = true;
						}
						else
						{
							this.enabledPrevBtn = false;
						}
						
					}
					else
					{
						this.util.loading.dismiss();
						this.util.presentToast(data.json().message);
					}
					
				},
				error => { 
					this.util.loading.dismiss();
					this.util.presentToast('Server Error!');
				}
			);
	}

	view(id)
	{
		let data = {
	    	id: id
	    }
		const modal = this.modalCtrl.create('DeliveryViewPage', data);

		modal.present();

		modal.onWillDismiss((data) => {
			if(data.status == 'TAKE')
			{
				
			}
		})
	}

	filter()
	{
		const passingData = {
			f_via     : this.f_via,
			f_range   : this.f_range,
			f_when    : this.f_when,
			f_status  : this.f_status,
			f_city    : this.f_city,
			f_user    : this.f_user,
			f_id      : this.f_id,
			s_spk     : this.s_spk,
			s_project : this.s_project,

			limit : this.limit,
			sort  : this.sort,
			order : this.order
		}

		const modal = this.modalCtrl.create('DeliveryWaitingFilterPage', passingData);

		modal.present();

		modal.onWillDismiss((data) => {
			if(data.status == 'APPLY')
			{
				this.f_via     = data.data.f_via;
			    this.f_range   = data.data.f_range;
			    this.f_when    = data.data.f_when;
			    this.f_status  = data.data.f_status;
			    this.f_city    = data.data.f_city;
			    this.f_user    = data.data.f_user;
			    this.f_id      = data.data.f_id;

			    this.s_spk     = data.data.s_spk;
			    this.s_project = data.data.s_project;

			    this.limit = data.data.limit;
			    this.sort  = data.data.sort;
			    this.order = data.data.order;

			    this.load();
			}
		})
	}

	nextPage()
	{
		this.page = this.page + 1;
		this.load();
	}

	prevPage()
	{
		this.page = this.page - 1;
		this.load();
	}

	indexPage()
	{
		const passingData = {
			page      : this.page,
			last_page : this.last_page,
		}

		const modal = this.modalCtrl.create('GotoPage', passingData);

		modal.present();

		modal.onWillDismiss((data) => {
			console.log(data);
			if(data.status == 'APPLY')
			{
				this.page = data.data.page;
			    this.load();
			}
		})
	}

	take(id)
	{
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		// headers.append('Access-Control-Allow-Origin' , this.env.base_url);
		// headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
		// headers.append('Accept','application/json');
		// headers.append('content-type','application/json');

		let options = new RequestOptions({ headers: headers });

		let data = {
			id : id
		}

		this.util.showLoader('Loading...');
		this.http.post(this.env.base_url+"api/delivery/take?token="+encodeURI(localStorage.getItem('token')), data, options)
			.subscribe(
				data => {
					this.util.loading.dismiss();
					this.util.presentToast(data.json().message);

					if(data.json().status == "OK")
					{
						this.load();
					}

				},
				error => { 
					this.util.loading.dismiss();
					this.util.presentToast('Server Error!');
				}
			);
	}
}
