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
	paginateData:any = {
		page           : 1,
		last_page      : 1,
		from           : 0,
		to             : 0,
		total          : 0,
		enabledNextBtn : false,
		enabledPrevBtn : false,
	}

	constructor(public viewCtrl  : ViewController, public navParams: NavParams) {
	}


	ionViewWillLoad() {
	this.paginateData   = this.navParams.get('paginateData');

		for(let i=0; i < this.paginateData.last_page; i++){ // n is array.length
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
