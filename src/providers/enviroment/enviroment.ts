import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



/*
  Generated class for the EnviromentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EnviromentProvider {

	public base_url:string = "http://digindo.co.id/edigindo/";
	public gmap_api:string = "AIzaSyBAel9fAfMQ3xomX3v_iLWJSkNUE3TSkLI";

	constructor(public http: HttpClient) {
	    // console.log('Hello EnviromentProvider Provider');
	}

}
