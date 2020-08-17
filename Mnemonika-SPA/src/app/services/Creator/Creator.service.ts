import { Injectable } from '@angular/core';
import { MnemoModel } from '../../Models/MnemoModel/MnemoModel';
import { HttpClient } from '@angular/common/http';
import { HeadersService } from '../Headers/Headers.service';
import { AlertifyService } from '../Alertify/Alertify.service';

@Injectable({
  providedIn: 'root'
})
export class CreatorService {

  startCreating = { isStarted: false };

  constructor(private http: HttpClient,
              private headers: HeadersService,
              private alertify: AlertifyService) { }

  public async createPostRequest(model: MnemoModel): Promise<void>{
    const head = this.headers.authorizationHeaderFromToken();
    const request = this.http.post('http://localhost:5000/mnemo', model, head).toPromise();
    await request.then(resolve => {
      this.alertify.success('Mnemo created.');
    }, error => {
      this.alertify.error(error);
    });
  }

  public async createPutRequest(model: MnemoModel): Promise<void>{
    const head = this.headers.authorizationHeaderFromToken();
    const request = this.http.put('http://localhost:5000/mnemo', model, head).toPromise();
    await request.then(resolve => {
    }, error => {
      this.alertify.error(error);
    });
  }
}
