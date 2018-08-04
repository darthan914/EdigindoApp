import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { Http } from '@angular/http';
import { EnviromentProvider } from '../../../../providers/enviroment/enviroment';

/**
 * Generated class for the DeliveryTakenFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-delivery-taken-filter',
	templateUrl: 'filter-delivery-taken.html',
})
export class DeliveryTakenFilterPage {

	f_when   = 'all';
	f_status = '';
	f_id     = '';

	s_spk     = '';
	s_project = '';

	limit = 10;
	sort  = 'delivery.datetime_send';
	order = 'ASC';

	constructor(
		public viewCtrl  : ViewController,
		public navParams : NavParams,
		public env       : EnviromentProvider,
		public http      : Http, 
	) {
		this.f_when    = this.navParams.get('f_when');
		this.f_status  = this.navParams.get('f_status');
		this.f_id      = this.navParams.get('f_id');
		this.s_spk     = this.navParams.get('s_spk');
		this.s_project = this.navParams.get('s_project');

		this.limit = this.navParams.get('limit');
		this.sort  = this.navParams.get('sort');
		this.order = this.navParams.get('order');
	}

	ionViewDidLoad() {
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
			data: {
				f_when    : this.f_when,
				f_status  : this.f_status,
				f_id      : this.f_id,
				s_spk     : this.s_spk,
				s_project : this.s_project,

				limit : this.limit,
				sort  : this.sort,
				order : this.order
			}
		}
		this.viewCtrl.dismiss(returnData);
	}

	reset()
	{
		const returnData = {
			status: 'APPLY',
			data: {
				f_when    : 'all',
				f_status  : '',
				f_user    : '',
				f_id      : '',
				s_spk     : '',
				s_project : '',

				limit : 10,
				sort  : 'delivery.datetime_send',
				order : 'ASC',
			}
		}
		this.viewCtrl.dismiss(returnData);
	}


}
