import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../services/Login/loginService.service';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../services/Register/register.service';
import { UserModel } from '../UserModel/UserModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  color: string;
  authorized = { isAuthorized: false };
  wannaRegister = { IsItSo: false };
  model: UserModel = new UserModel('', '');
  constructor(private loginService: LoginServiceService,
              private registerService: RegisterService) {
    this.authorized = loginService.authorized;
    this.wannaRegister = registerService.wannaRegister;
   }

  ngOnInit() {
  }

  async loginSystem(){
    if (this.loginService.loginSystem(this.model))
    {
      this.authorized.isAuthorized = true;
    }
  }

  async registerSystem(){
    this.registerService.wannaRegister.IsItSo = true;
  }
}
