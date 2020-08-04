import { Injectable } from '@angular/core';
import { MnemoModel } from '../Models/MnemoModel/MnemoModel';

@Injectable({
  providedIn: 'root'
})
export class MnemoKeeperService {
  static Mnemonika: MnemoModel[] = [];

  MnemoProp = { isFilled: false };

  constructor() { }

  fillKeeper(dynamicModel: any): void
  {
    let curr;
    for (curr of dynamicModel){
      let alreadyExists = false;
      const model = new MnemoModel(curr.userId, curr.word);
      this.fillMnemoModel(curr, model);
      for (const old of MnemoKeeperService.Mnemonika){
        if (old.Context === model.Context && old.Word === model.Word){
          alreadyExists = true;
        }
      }

      if (alreadyExists){
        continue;
      } else {
        MnemoKeeperService.Mnemonika.push(model);
      }
    }

    this.checkMnemonika();
  }

  private checkMnemonika(): void
  {
    if (MnemoKeeperService.Mnemonika.length > 0)
    {
      this.MnemoProp.isFilled = true;
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
}
