import { LoginServiceService } from '../../services/Login/loginService.service';
import { MnemoKeeperService } from '../../services/mnemoKeeper.service';
import { CreatorService } from '../../services/Creator/Creator.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from '../../services/Cookie/Cookie.service';
import { HeadersService } from '../../services/Headers/Headers.service';
import { ButtonsHiderService } from '../../services/ButtonsHider/buttonsHider.service';

@Component({
  selector: 'app-Mnemo',
  templateUrl: './Mnemo.component.html',
  styleUrls: ['./Mnemo.component.css']
})
export class NewMnemoComponent implements OnInit {
  authorized = { isAuthorized: false };
  startCreating = { isStarted: false };
  buttonsHide = { hide: false };
  color = '';

  constructor(private loginService: LoginServiceService,
              private http: HttpClient,
              private keeper: MnemoKeeperService,
              private creator: CreatorService,
              private cookie: CookieService,
              private headers: HeadersService,
              private hider: ButtonsHiderService)
  {
    this.authorized = loginService.authorized;
    this.startCreating = creator.startCreating;
    this.buttonsHide = hider.buttonsHide;
  }

  ngOnInit() { }

  createMnemo()
  {
    this.hider.hideButtons();
    this.startCreating.isStarted = true;
  }

  async showMnemo()
  {
    this.hider.hideButtons();
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

  private createRequestPromise()
  {
    const url = 'http://localhost:5000/mnemo/' + this.cookie.getCookie('userId');
    const headers = this.headers.authorizationHeaderFromToken();
    return this.http.get(url, headers).toPromise();
  }
}
