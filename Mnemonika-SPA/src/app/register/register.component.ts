import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../services/Register/register.service';
import { UserModel } from '../UserModel/UserModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  color: string;
  wannaRegister = { IsItSo: false };
  model: UserModel = new UserModel('', '');

  constructor(private register: RegisterService)
  {
    this.wannaRegister = this.register.wannaRegister;
  }

  ngOnInit() {
  }

  async registerSystem()
  {
    if(await this.register.registerSystem(this.model))
    {
      this.wannaRegister.IsItSo = false;
    }
  }
}