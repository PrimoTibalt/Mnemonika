import { Injectable } from '@angular/core';
import { HeadersService } from '../Headers/Headers.service';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../../UserModel/UserModel';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  wannaRegister = { IsItSo: false };
  constructor(private http: HttpClient) { }

  async registerSystem(model: UserModel): Promise<boolean>
  {
    const signinPromise = this.http.post('http://localhost:5000/reg', model).toPromise();
    let result = false;
    await signinPromise.then(
      resolve => {
        if (document.getElementById('regCont') != null)
        {
          document.getElementById('regCont').style.zIndex = '1';
        }

        const message = resolve;
        result = true;
      },
      error => {
        console.log(error);
        result = false;
      }
    );
    return result;
  }
}
