import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  answer: any;
  authorized = { isAuthorized: false };
  model: any = {};
  constructor(private http: HttpClient) { }

  async loginSystem(message: any){
    const signinPromise = this.http.post('http://localhost:5000/login', message).toPromise();
    await signinPromise.then(
      resolve => {
        this.answer = resolve;
        document.cookie = 'userId=' + this.answer.userId;
        document.cookie = 'token=' + this.answer.token + '; secure';
        this.authorized.isAuthorized = true;
        if (document.getElementById('logCont') != null)
        {
          document.getElementById('logCont').style.zIndex = '1';
        }
        return true;
      },
      error => {
        console.log(error);
        return false;
      }
    );
  }

}
