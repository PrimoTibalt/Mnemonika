import { Injectable } from '@angular/core';
import { MnemoModel } from '../../Models/MnemoModel/MnemoModel';
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

  public async createPostRequest(model: MnemoModel): Promise<void>{
    const head = this.headers.authorizationHeaderFromToken();
    const request = this.http.post('http://localhost:5000/mnemo', model, head).toPromise();
    await request.then(resolve => {
      // Message about secceded creation.
    }, error => {
      // Message about error.
    });
  }

  public async createPutRequest(model: MnemoModel): Promise<void>{
    const head = this.headers.authorizationHeaderFromToken();
    const request = this.http.put('http://localhost:5000/mnemo', model, head).toPromise();
    await request.then(resolve => {
      // Message about secceded creation
    }, error => {
      // Message about error.
    });
  }
}
