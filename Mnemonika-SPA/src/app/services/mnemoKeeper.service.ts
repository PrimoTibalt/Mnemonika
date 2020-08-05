import { Injectable } from '@angular/core';
import { MnemoModel } from '../Models/MnemoModel/MnemoModel';

@Injectable({
  providedIn: 'root'
})
export class MnemoKeeperService {
  static Mnemonika: MnemoModel[] = [];

  gotModel = { isFilled: false };
  cameHere = { isHere: false };

  constructor() { }

  public fillKeeper(dynamicModel: any): void
  {
    this.cameHere.isHere = true;
    let curr;
    if (dynamicModel != null){
      this.clearMnemo();
      for (curr of dynamicModel){
        const model = new MnemoModel(curr.userId, curr.word);
        this.fillMnemoModel(curr, model);

        MnemoKeeperService.Mnemonika.push(model);
      }
    }
    this.checkMnemonika();
  }

  private checkMnemonika(): void
  {
    if (MnemoKeeperService.Mnemonika.length > 0)
    {
      this.gotModel.isFilled = true;
    }
  }

  private fillMnemoModel(from: any, to: MnemoModel): void
  {
    to.Context = from.context;
    to.Mnemo = from.mnemo;
    to.Translate = from.translate;
    to.PictureUrl = from.PictureUrl;
    to.DateOfCreate = new Date(from.date);
  }

  private clearMnemo(): void
  {
    const length =  MnemoKeeperService.Mnemonika.length;
    if (length > 0)
    {
      for (let i = 0; i < length; i++)
      {
        MnemoKeeperService.Mnemonika.pop();
      }
    }
  }
}
