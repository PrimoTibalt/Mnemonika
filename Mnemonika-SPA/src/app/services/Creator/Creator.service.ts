import { Injectable } from '@angular/core';
import { MnemoModel } from 'src/app/MnemoModel/MnemoModel';
import { HttpClient } from '@angular/common/http';
import { HeadersService } from '../Headers/Headers.service';
import { CookieService } from '../Cookie/Cookie.service';

@Injectable({
  providedIn: 'root'
})
export class CreatorService {

  startCreating = { isStarted: false };

  constructor(private http: HttpClient,
              private headers: HeadersService) { }

  async createPostRequest(model: MnemoModel){
    const head = this.headers.authorizationHeaderFromToken();
    const request = this.http.post('http://localhost:5000/mnemo', model, head).toPromise();
    await request.then(resolve => {
      // Message about secceded creation.
    }, error => {
      // Message about error.
    });
  }
}
