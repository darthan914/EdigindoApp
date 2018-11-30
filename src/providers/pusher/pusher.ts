import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';

@Injectable()
export class PusherProvider {
	channel;
	
	constructor(public http: HttpClient) {
		const pusher = new Pusher('1f7e56e80c089e2d8f69', {
			// authEndpoint: 'http://127.0.0.1/edigindo/broadcasting/auth',
		    // key: '1f7e56e80c089e2d8f69',
		    cluster : 'ap1',
		    encrypted: true,
		    auth: {
		    	headers: { 'Authorization': 'Bearer '+ localStorage.getItem('token') }
		    }
		});
		this.channel = pusher.subscribe('private-App.User.1');
	}
	
	public init() {
		return this.channel;
	}
}
