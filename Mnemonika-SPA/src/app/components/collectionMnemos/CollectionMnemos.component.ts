import { Component, OnInit } from '@angular/core';
import { MnemoKeeperService } from '../../services/mnemoKeeper.service';
import { MnemoModel } from '../../Models/MnemoModel/MnemoModel';
import { ButtonsHiderService } from '../../services/ButtonsHider/buttonsHider.service';
import { CreatorService } from 'src/app/services/Creator/Creator.service';
import { R3TargetBinder } from '@angular/compiler';

@Component({
  selector: 'app-CollectionMnemos',
  templateUrl: './CollectionMnemos.component.html',
  styleUrls: ['./CollectionMnemos.component.css']
})
export class CollectionMnemosComponent implements OnInit {
  color = '';

  gotModel = { isFilled: false };
  cameHere = { isHere: false };
  buttonsHide = { hide: false };

  mnems: MnemoModel[];

  lastContext = '';
  collection = document.getElementsByClassName('container-mnemo') as HTMLCollectionOf<HTMLElement>;
  isReady = true;

  constructor(private keeper: MnemoKeeperService,
              private hider: ButtonsHiderService,
              private creator: CreatorService)
  {
    this.gotModel = keeper.gotModel;
    this.cameHere = keeper.cameHere;
    this.mnems = MnemoKeeperService.Mnemonika;
    this.buttonsHide = hider.buttonsHide;
  }

  ngOnInit() {
  }

  public backToChoise()
  {
    this.gotModel.isFilled = false;
    this.cameHere.isHere = false;
    this.hider.showButtons();
  }

  public async isReadToday(mnemo: MnemoModel): Promise<void>
  {
    await this.creator.createPutRequest(mnemo);
    if(mnemo.isTranslated)
    {
      this.deleteItem((mnemo.Context ? mnemo.Context : mnemo.Word) + ' ' + mnemo.Translate + ' ');
    }else{
      this.deleteItem(mnemo.Context ? mnemo.Context : mnemo.Word);
    }
  }

  public async clickItem(e: any): Promise<void>
  {
    if(e.target.text !== undefined)
    {
      const mnemo = this.findMnemo(e.target.text);
      if(mnemo.isTranslated){
        e.target.text = e.target.text.replace(mnemo.Translate, '');
      }else{
        e.target.text += mnemo.Translate;
      }
      mnemo.isTranslated = !mnemo.isTranslated;
    }
  }

  private findMnemo(word: string): MnemoModel
  {
    word = this.replaceTranslate(word);
    word = word.replace(' ', '').trim();
    for(let mnemo of this.mnems)
    {
      if(mnemo.Word === word)
      {
        return mnemo;
      }
    }

    return undefined;
  }

  private replaceTranslate(text: string): string
  {
    for(let mnem of this.mnems)
    {
      text = text.replace(mnem.Translate, '');
    }
    return text;
  }

  private async deleteItem(text: string): Promise<void>
  {
    if(!this.isReady)
    {
      return;
    }
    this.isReady = false;
    for (let i = 0; i < this.collection.length; i++)
    {
      let aElement = this.collection[i].getElementsByClassName('nav-link')[0];
      if (aElement != null )
      {
        if (aElement.firstChild.textContent.replace(' ', '').trim() === text.trim()) // js - the best language.
        {
          (this.collection[i].firstChild as HTMLElement).style.visibility = 'hidden';
          (this.collection[i].firstChild as HTMLElement).style.zIndex = '-1';

          (this.collection[i].lastChild as HTMLElement).style.visibility = 'hidden';
          (this.collection[i].lastChild as HTMLElement).style.zIndex = '-1';

          this.collection[i].style.animationPlayState = 'running';

          setTimeout(()=>{
            try{
              this.collection[i].remove();
              this.isReady = true;
            }
            catch (TypeError){
              console.log('undefined occures');
            }}, 2000);
          break;
        }
      }
      else{
        break;
      }
    }
    setTimeout(()=>{
      if (this.collection.length === 0)
      {
        this.gotModel.isFilled = false;
      }
    }, 3000);
    
  }
}
