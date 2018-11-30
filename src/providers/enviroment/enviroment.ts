import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



/*
  Generated class for the EnviromentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EnviromentProvider {

	public base_url:string = "https://digindo.co.id/";
	// public base_url:string = "http://localhost/edigindo/";
	public gmap_api:string = "AIzaSyAVtNYOssElRdK0--csb6E5B668Akr5TI4";
	public tomtom_api:string ="AI3DPRCFECXE339MvJi6kiQTOy8pmX1G";
	public client_secret:string = "jemIZzfjvUhOUnsHJk0o8GH04oYu6NUv7wG4HgjZ";
	public client_id:number = 2;

	constructor(public http: HttpClient) {
	    // console.log('Hello EnviromentProvider Provider');
	}

}
