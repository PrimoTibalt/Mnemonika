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
    this.showCollection();
  }

  private showCollection(): void
  {
    if (MnemoKeeperService.Mnemonika.length > 0)
    {
      this.gotModel.isFilled = true;
      this.emphasizeWord();
    }
  }

  private fillMnemoModel(from: any, to: MnemoModel): void
  {
    to.Context = from.context;
    to.Mnemo = from.mnemo;
    to.Translate = from.translate;
    to.PictureUrl = from.PictureUrl;
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

  private emphasizeWord(): void
  {
    setTimeout(() => {
      const elements: any = document.getElementsByClassName('mnemo-text') as HTMLCollectionOf<HTMLElement>;
      const mnemsToIgnore: MnemoModel[] = [];
      for (const element of elements)
      {
        for (const mnem of MnemoKeeperService.Mnemonika)
        {
          if (mnemsToIgnore.includes(mnem))
          {
            continue;
          }
          const text: string = element.innerHTML;
          if (this.rightMnemo(mnem, text))
          {
            const upperText = text.toUpperCase();
            const index = upperText.indexOf(mnem.Word.toUpperCase());
            const pre = text.substr(0, index);
            const after = text.substr(index + mnem.Word.length, element.innerHTML.length);
            let word = mnem.Word;
            if (text.charAt(index).toUpperCase() === text.charAt(index))
            {
              word = word.charAt(0).toUpperCase().concat(word.substr(1, word.length - 1));
            }

            element.innerHTML = pre.concat('<em><u><strong>' + word + '</strong></u></em>', after);
            mnemsToIgnore.push(mnem);
          }
        }
      }
    }, 700);
  }

  private rightMnemo(mnem: MnemoModel, elemText: string): boolean
  {
    if (mnem.Context.replace(' ', '').trim() !== '')
    {
      if (elemText.toUpperCase().includes(mnem.Context.toUpperCase()))
      {
        return true;
      }
    }
    else
    {
      if (elemText.toUpperCase().includes(mnem.Word.toUpperCase()))
      {
        return true;
      }
    }

    return false;
  }
}
