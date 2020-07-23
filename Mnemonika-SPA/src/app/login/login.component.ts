import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginServiceService } from '../services/loginService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  color: string;
  authorized = { isAuthorized: false };
  model: any = {};
  constructor(private http: HttpClient, private loginService: LoginServiceService) {
    this.authorized = loginService.authorized;
   }

  ngOnInit() {
  }

  async loginSystem(){
    const message = {Login: this.model.username, Password: this.model.password};
    if (this.loginService.loginSystem(message))
    {
      this.authorized.isAuthorized = true;
    }
  }
}
