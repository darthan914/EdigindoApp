import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DeliveryWaitingPage } from '../delivery/waiting/waiting';
import { DeliveryTakenPage } from '../delivery/taken/taken';

/**
 * Generated class for the DeliveryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-delivery',
	template: `
		<ion-tabs>
	      <ion-tab [root]="tab1" tabTitle="Waiting"></ion-tab>
	      <ion-tab [root]="tab2" tabTitle="Taken"></ion-tab>
	    </ion-tabs>
	`,
})
export class DeliveryPage {

	tab1: any;
	tab2: any;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.tab1 = DeliveryWaitingPage;
		this.tab2 = DeliveryTakenPage;
	}

	ionViewDidLoad() {
		// console.log('ionViewDidLoad DeliveryPage');
	}

}
