import { LoginServiceService } from '../services/loginService.service';
import { MnemoKeeperService } from '../services/mnemoKeeper.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-Mnemo',
  templateUrl: './Mnemo.component.html',
  styleUrls: ['./Mnemo.component.css']
})
export class NewMnemoComponent implements OnInit {
  authorized = { isAuthorized: false };
  buttonsHide = false;
  color = '';

  constructor(private loginService: LoginServiceService,
     private http: HttpClient,
     private keeper: MnemoKeeperService)
  {
    this.authorized = loginService.authorized;
  }

  ngOnInit() { }

  createMnemo()
  {
    this.hideButtons();
    console.log('Create');
  }

  async showMnemo()
  {
    this.hideButtons();
    const getMnemosPromise = this.createRequestPromise();
    await getMnemosPromise.then(
      resolve => {
        this.keeper.fillKeeper(resolve);
      },
      error => {
        console.log(error);
      }
    );
  }

  hideButtons()
  {
    this.buttonsHide = true;
  }

  // returns cookie with such 'name'
  // or undefined
  getCookie(name: string)
  {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  createRequestPromise()
  {
    const url = 'http://localhost:5000/mnemo/' + this.getCookie('userId');
    const headers = new HttpHeaders({'Authorization': 'bearer ' + this.getCookie('token')});
    return this.http.get(url, {headers}).toPromise();
  }
}
