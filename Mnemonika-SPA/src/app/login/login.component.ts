import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  color: string;
  token: any;
  authorized = false;
  model: any = {};
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  async loginSystem(){
    const message = {Login: this.model.username, Password: this.model.password};
    const signinPromise = this.http.post('http://localhost:5000/login', message).toPromise();
    await signinPromise.then(
      resolve => {
        this.token = resolve;
        this.token = this.token.token;
        this.authorized = true;
      },
      error => {
        console.log(error);
      }
    );
  }

}
