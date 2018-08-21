import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { EnviromentProvider } from '../../providers/enviroment/enviroment';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

/*
  Generated class for the OAuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

interface TokenResponse {
  token_type?: string;
  expires_in?: number;
  access_token?: string;
  refresh_token?: string;
}

// interface RegisterUserForm {
//   name:string;
//   email:string;
//   password:string;
//   password_confirmation:string;
// }


@Injectable()
export class OAuthServiceProvider {
  
  // CONFIGURATION PARAMS
  baseDomain: string = this.env.base_url;
  clientSecret: string = 'jemIZzfjvUhOUnsHJk0o8GH04oYu6NUv7wG4HgjZ';
  clientId: number = 2; // Change for your oauth client ID
  
  // Other params
  tokenUrl: string = this.baseDomain + 'oauth/token';
  baseApiUrl: string = this.baseDomain + 'api';
  // registerUrl: string = this.baseApiUrl + '/user/register';
  validateTokenUrl: string = '';
  accessToken: string = '';
  refreshToken: string = '';
  OAuthOptions : any = {};
  loggedIn: boolean = false;

  constructor(
  	public http: HttpClient,
    public storage: Storage,
    public events: Events,
    public env : EnviromentProvider,
	) {
  }

  

  getToken(username: string, password: string) {
    let body = {
      username: username,
      password: password,
      grant_type: 'password',
      client_secret: this.clientSecret,
      client_id: this.clientId,

    };
    return this.http.post(this.tokenUrl, body,);
  }

  initOAuthService(username: string, password: string) {
    let body = {
      username: username,
      password: password,
      grant_type: 'password',
      client_secret: this.clientSecret,
      client_id: this.clientId,

    };
    return this.http.post(this.tokenUrl, body).subscribe(
      (res: TokenResponse) => {
        this.loginWithTokens(res.access_token, res.refresh_token);
      },
      err => {console.log(err.message)}
    );
  }

  // registerUser(user: RegisterUserForm) {
  //   let body = {
  //     name: user.name,
  //     email: user.email,
  //     password: user.password,
  //     password_confirmation: user.password

  //   }
  //   return this.http.post(this.registerUrl, body).subscribe(
  //     (res: TokenResponse) => {
  //       this.loginWithTokens(res.access_token, res.refresh_token);
  //     },
  //     err => {console.log(err.message)}
  //   );
  // }

  loginWithTokens(accessToken:string, refreshToken:string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.setOAuthOptions(accessToken);
    this.storeTokens(this.accessToken, this.refreshToken).then(
      (res) => {
        this.loggedIn = true;
        this.events.publish('user:login');
        return res;
      }
    ).catch(
      (err) => {console.log(err);}
    );
  }

  storeTokens(accessToken, refreshToken) {
    return this.storage.set('access_token', accessToken).then(
      (resA ) => {
        let res: any = {};
        res.accessToken = resA;
        this.events.publish('user:access_token:stored');
        return this.storage.set('refresh_token', refreshToken).then(
          (resB) => {
            res.refreshToken = resB;
            this.events.publish('user:refresh_token:stored');
            return res;
          }
        )
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  }

  deleteTokens() {
    return this.storage.remove('access_token').then(
      (resA ) => {
        let res: any = {};
        res.accessToken = resA;
        this.events.publish('user:access_token:deleted');
        return this.storage.remove('refresh_token').then(
          (resB) => {
            res.refreshToken = resB;
            this.events.publish('user:refresh_token:deleted');
            return res;
          }
        )
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  }

  setOAuthOptions(token){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + token );

    this.OAuthOptions = { headers: headers };
    return this.OAuthOptions;
  }

  logout() {
    this.deleteTokens().then(
      (res) => {
        this.accessToken = '';
        this.refreshToken = '';
        this.loggedIn = false;
        this.events.publish('user:logout');
      }
    );
  }

  apiGet(url:string, options?:any) {
    if(!options) {
      if(this.OAuthOptions) {
        let options = this.OAuthOptions;
      } else {
        let options = {};
      }
    }
    return this.http.get(this.baseApiUrl + url, {headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.accessToken)} );
  }

}
