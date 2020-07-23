import { Component, OnInit } from '@angular/core';
import { MnemoKeeperService } from '../services/mnemoKeeper.service';
import { MnemoModel } from '../MnemoModel/MnemoModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-CollectionMnemos',
  templateUrl: './CollectionMnemos.component.html',
  styleUrls: ['./CollectionMnemos.component.css']
})
export class CollectionMnemosComponent implements OnInit {
  gotModel = { isFilled: false };
  mnems: MnemoModel[];
  constructor(private keeper: MnemoKeeperService)
  {
    this.gotModel = keeper.MnemoProp;
    this.mnems = MnemoKeeperService.Mnemonika;
    console.log(this.mnems);
  }

  ngOnInit() {
  }

}
