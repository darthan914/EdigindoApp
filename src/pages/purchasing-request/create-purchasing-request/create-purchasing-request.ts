import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PurchasingRequestCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
	name: 'create-purchasing-request',
	segment: 'create-purchasing-request',
	defaultHistory: ['home', 'purchasing-request']

})
@Component({
	selector: 'page-create-purchasing-request',
	templateUrl: 'create-purchasing-request.html',
})
export class CreatePurchasingRequestPage {

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewWillLoad() {
		// console.log('ionViewDidLoad PurchasingRequestCreatePage');
	}

}
