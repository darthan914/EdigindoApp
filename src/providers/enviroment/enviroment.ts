import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



/*
  Generated class for the EnviromentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EnviromentProvider {

	public base_url:string = "http://127.0.0.1/edigindo/";
	public gmap_api:string = "AIzaSyBAel9fAfMQ3xomX3v_iLWJSkNUE3TSkLI";
	public client_secret:string = "jemIZzfjvUhOUnsHJk0o8GH04oYu6NUv7wG4HgjZ";
	public client_id:number = 2;

	constructor(public http: HttpClient) {
	    // console.log('Hello EnviromentProvider Provider');
	}

}
