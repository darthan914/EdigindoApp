import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-goto',
	templateUrl: 'goto.html',
})
export class GotoPage {

	number = [];
	last_page = 0;

	constructor(public viewCtrl  : ViewController, public navParams: NavParams) {
	}


	ionViewWillLoad() {
	this.last_page   = this.navParams.get('last_page');

		for(let i=0; i < this.last_page; i++){ // n is array.length
			this.number.push({ index : i+1 });
		}
	}

	gotoPage(index)
	{
		const returnData = {
			status: 'APPLY',
			data: {
				page     : index,
			}
		}
		this.viewCtrl.dismiss(returnData);
	}


	close()
	{
		const returnData = {
			status: 'CANCEL',
		}
		this.viewCtrl.dismiss(returnData);
	}

}
