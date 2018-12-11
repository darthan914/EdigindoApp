import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';
import { EnviromentProvider } from '../../providers/enviroment/enviroment';

@Injectable()
export class PusherProvider {
	channel;
	
	constructor(public http: HttpClient, public env : EnviromentProvider,) {

		const pusher = new Pusher(this.env.pusher_key, {
			authEndpoint: this.env.base_url + 'api/broadcasting/auth?api_token=' + localStorage.getItem('token'),
		    key: this.env.pusher_key,
		    cluster : 'ap1',
		    encrypted: true,
		    auth: {
		    	headers: { 'Authorization': 'Bearer '+ localStorage.getItem('token') }
		    }
		});
		if(localStorage.getItem('user'))
		{

			this.channel = pusher.subscribe('private-App.User.' + JSON.parse(localStorage.getItem('user')).id );
		}
	}
	
	public init() {
		return this.channel;
	}

	public unsubscribed()
	{
		this.channel.unsubscribe('private-App.User.' + JSON.parse(localStorage.getItem('user')).id );
	}
}
