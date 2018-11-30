import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PurchasingRequestEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
	name: 'edit-purchasing-request',
	segment: 'edit-purchasing-request',
	defaultHistory: ['home', 'purchasing-request']
})
@Component({
	selector: 'page-edit-purchasing-request',
	templateUrl: 'edit-purchasing-request.html',
})
export class EditPurchasingRequestPage {
	id:any;
	index:any = [];

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.id = navParams.get('id');
	}

	ionViewWillLoad() {
		// console.log('ionViewDidLoad PurchasingRequestEditPage');
	}

}
