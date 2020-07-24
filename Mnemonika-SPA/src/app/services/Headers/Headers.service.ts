import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from '../Cookie/Cookie.service';

@Injectable({
  providedIn: 'root'
})
export class HeadersService {

  constructor(private cookie: CookieService) { }

  authorizationHeaderFromToken()
  {
    const head = { headers: new HttpHeaders({'Authorization': 'bearer ' + this.cookie.getCookie('token')}) };
    return head;
  }
}
