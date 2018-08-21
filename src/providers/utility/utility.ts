// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LoadingController, ToastController} from 'ionic-angular';

import { EnviromentProvider } from '../../providers/enviroment/enviroment';
import { DomSanitizer/*, SafeResourceUrl, SafeUrl*/ } from '@angular/platform-browser';

import { Http, Headers } from '@angular/http';

/*
  Generated class for the UtilityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilityProvider {

	loading: any;

	constructor(
		public http        : Http,
		private sanitizer  : DomSanitizer,
		private env        : EnviromentProvider,
		public loadingCtrl : LoadingController,
		public toastCtrl   : ToastController
	)
	{

	}

	getLocalURLImage(image) {
		if(image)
		{
			var url = this.env.base_url + image;
	    	return this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
		}
		return '';
		
	}

	dateFormat(date)
	{
		var today = new Date(date);
		var d:any = today.getDate();
		var m:any = today.getMonth(); //January is 0!
		var y = today.getFullYear().toString();

		if(d  < 10){
		    d = ("0" + d).slice(-2);
		}

		if(m < 10){
		    m = ("0" + (m+1)).slice(-2);
		}

		return d+'/'+m+'/'+y;
	}

	datetimeFormat(date)
	{
		var today = new Date(date);
		var d:any = today.getDate();
		var m:any = today.getMonth(); //January is 0!
		var y = today.getFullYear().toString();

		var h:any = today.getHours();
		var i:any = today.getMinutes();
		var s:any = today.getSeconds();


		if(d  < 10){
		    d = ("0" + d).slice(-2);
		}

		if(m < 10){
		    m = ("0" + (m+1)).slice(-2);
		}


		if(h < 10){
		    h = ("0" + h).slice(-2);
		} 

		if(i < 10){
		    i = ("0" + i).slice(-2);
		}

		if(s < 10){
		    s = ("0" + s).slice(-2);
		}


		return d+'/'+m+'/'+y+' '+h+':'+i+':'+s;
	}

	showLoader(msg){
		this.loading = this.loadingCtrl.create({
			content: msg
		});

		this.loading.present();
	}

	presentToast(msg) {
		let toast = this.toastCtrl.create({
			message: msg,
			duration: 3000,
			position: 'bottom',
			dismissOnPageChange: true
		});

		toast.present();
	}

	getData(url, request = null){
		return new Promise((resolve, reject) => {
	        let headers = new Headers();
	        headers.append('Accept', 'application/json');
	        headers.append('Authorization', 'Bearer '+localStorage.getItem('token'));

	        this.http.post(this.env.base_url+url, request, {headers: headers})
		          .subscribe(res => {
		            resolve(res.json());
		          }, (err) => {
		            reject(err);
		          });
	    });
	}



}
