import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



/*
  Generated class for the EnviromentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EnviromentProvider {

	public base_url:string = "";
	public gmap_api:string = "";
	public tomtom_api:string ="";
	public client_secret:string = "";
	public client_id:number = 0;
	public pusher_key:string = "";
	public pusher_secret:string = "";

	constructor(public http: HttpClient) {
	    // console.log('Hello EnviromentProvider Provider');
	}

}
