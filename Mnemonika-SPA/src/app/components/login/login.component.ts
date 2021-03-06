import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../../services/Login/loginService.service';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../../services/Register/register.service';
import { UserModel } from '../../Models/UserModel/UserModel';

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

  ngOnInit(): void {
  }

  async loginSystem(): Promise<void>{
    if ((await this.loginService.loginSystem(this.model)).valueOf())
    {
      this.authorized.isAuthorized = true;
    }
  }

  async registerSystem(): Promise<void>{
    this.registerService.wannaRegister.IsItSo = true;
  }
}
