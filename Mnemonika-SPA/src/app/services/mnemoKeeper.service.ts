import { Injectable } from '@angular/core';
import {MnemoModel} from '../Models/MnemoModel/MnemoModel';

@Injectable({
  providedIn: 'root'
})
export class MnemoKeeperService {
  static Mnemonika: MnemoModel[] = [];
  MnemoProp = { isFilled: false };
  constructor() { }
  
  fillKeeper(dynamicModel: any)
  {
    let curr;
    for (curr of dynamicModel){
      const model = new MnemoModel(curr.userId, curr.word);
      model.Context = curr.context;
      model.Mnemo = curr.mnemo;
      model.Translate = curr.translate;
      model.PictureUrl = curr.PictureUrl;
      model.DateOfCreate = new Date(curr.date);
      MnemoKeeperService.Mnemonika.push(model);
    }

    this.checkMnemonika();
  }

  checkMnemonika()
  {
    if (MnemoKeeperService.Mnemonika.length > 0)
    {
      this.MnemoProp.isFilled = true;
    }
  }
}
