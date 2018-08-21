// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { App, AlertController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';

import { EnviromentProvider } from '../../providers/enviroment/enviroment';

/*
	Generated class for the AuthenticationProvider provider.

	See https://angular.io/guide/dependency-injection for more info on providers
	and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {

	token;

	constructor(
		public http      : Http,
		public env       : EnviromentProvider,
		public app       : App,
		public alertCtrl : AlertController,
	)
	{
		this.token = localStorage.getItem('token');
	}

	login(credentials)
	{
		return new Promise((resolve, reject) => {
	        let headers = new Headers();
	        headers.append('Accept', 'application/json');

	        this.http.post(this.env.base_url+"api/login", credentials, {headers: headers})
		          .subscribe(res => {
		            resolve(res.json());
		          }, (err) => {
		            reject(err);
		          });
	    });
	}

	logout()
	{
		return new Promise((resolve, reject) => {
	        let headers = new Headers();
	        headers.append('Accept', 'application/json');
	        headers.append('Authorization', 'Bearer '+this.token);

	        this.http.post(this.env.base_url+"api/logout", {}, {headers: headers})
	          .subscribe(res => {
	          	resolve(res.json());
	            localStorage.clear();
	          }, (err) => {
	            reject(err);
	            localStorage.clear();
	          });
	    });
	}


	checkAuth()
	{
		return new Promise((resolve, reject) => {
	        let headers = new Headers();
	        headers.append('Accept', 'application/json');
	        headers.append('Authorization', 'Bearer '+this.token);

	        this.http.post(this.env.base_url+"api/auth", {headers: headers})
		          .subscribe(res => {
		            resolve(res.json());
		          }, (err) => {
		            reject(err);
		          });
	    });
	}

	hasAccess(access:string):boolean
	{
		if(localStorage.getItem('position') != null)
		{
			var position = JSON.parse(localStorage.getItem('position'));
			var permission = position.permission.split(", ");

			if(permission != null && permission.includes(access))
			{
				return true;
			}
		}

		return false;
	}

}
