import { Component, OnInit } from '@angular/core';
import { MnemoKeeperService } from '../../services/mnemoKeeper.service';
import { MnemoModel } from '../../Models/MnemoModel/MnemoModel';
import { ButtonsHiderService } from '../../services/ButtonsHider/buttonsHider.service';
import { CreatorService } from 'src/app/services/Creator/Creator.service';
import { R3TargetBinder } from '@angular/compiler';
import { AlertifyService } from 'src/app/services/Alertify/Alertify.service';

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
  private isReady = true; // syncronization on deleting.

  constructor(private keeper: MnemoKeeperService,
              private hider: ButtonsHiderService,
              private creator: CreatorService,
              private alertify: AlertifyService)
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
    if(this.codeIsUnreachable())
    {
      return;
    }
    
    this.setCodeUnreachable();
    for (let i = 0; i < this.collection.length; i++)
    {
      let elemText = this.collection[i].getElementsByClassName('mnemo-text')[0];
      if (elemText === null)
      {
        break;
      }
      let content = this.contextOrWord(elemText);
      content = content.replace(' ', '').trim();
      if (content.toUpperCase() === text.trim().toUpperCase()) 
      {
        this.hideTextIntoElement(i);
        this.runAnimationOfElement(i);
        this.removeItemWithTimeout(i);
        break;
      }
    }

    this.actionOnEmptyCollection();
  }

  private removeItemWithTimeout(index: number): void
  {
    setTimeout(()=>{
      try{
        this.collection[index].remove();
        this.isReady = true;
      }
      catch (TypeError){
        this.alertify.error('undefined occures on delete item');
      }}, 2000);
  }

  private hideTextIntoElement(index: number): void
  {
    (this.collection[index].firstChild as HTMLElement).style.visibility = 'hidden';
    (this.collection[index].firstChild as HTMLElement).style.zIndex = '-1';

    (this.collection[index].lastChild as HTMLElement).style.visibility = 'hidden';
    (this.collection[index].lastChild as HTMLElement).style.zIndex = '-1';
  }

  private runAnimationOfElement(index: number): void
  {
    this.collection[index].style.animationPlayState = 'running';
  }

  private actionOnEmptyCollection()
  {
    setTimeout(()=>{
      if (this.collection.length === 0)
      {
        this.gotModel.isFilled = false;
      }
    }, 3000);
  }

  private contextOrWord(element: Element): string
  {
    return element.firstChild.textContent.replace(' ', '').trim() !== '' ?
    element.firstChild.textContent : element.textContent;
  }

  private setCodeUnreachable(): void
  {
    this.isReady = false;
  }

  private codeIsUnreachable(): boolean
  {
    return !this.isReady;
  }
}
