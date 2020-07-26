import { Component, OnInit } from '@angular/core';
import { MnemoKeeperService } from '../../services/mnemoKeeper.service';
import { MnemoModel } from '../../Models/MnemoModel/MnemoModel';
import { ButtonsHiderService } from '../../services/ButtonsHider/buttonsHider.service';

@Component({
  selector: 'app-CollectionMnemos',
  templateUrl: './CollectionMnemos.component.html',
  styleUrls: ['./CollectionMnemos.component.css']
})
export class CollectionMnemosComponent implements OnInit {
  color = '';
  gotModel = { isFilled: false };
  buttonsHide = { hide: false };
  mnems: MnemoModel[];
  constructor(private keeper: MnemoKeeperService,
              private hider: ButtonsHiderService)
  {
    this.gotModel = keeper.MnemoProp;
    this.mnems = MnemoKeeperService.Mnemonika;
    this.buttonsHide = hider.buttonsHide;
  }

  ngOnInit() {
  }

  backToChoise()
  {
    this.gotModel.isFilled = false;
    this.hider.showButtons();
  }
}
