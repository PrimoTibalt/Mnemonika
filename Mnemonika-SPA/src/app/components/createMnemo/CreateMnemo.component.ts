import { Component, OnInit } from '@angular/core';
import { CreatorService } from '../../services/Creator/Creator.service';
import { MnemoModel } from '../../Models/MnemoModel/MnemoModel';
import { CookieService } from '../../services/Cookie/Cookie.service';
import { ButtonsHiderService } from '../../services/ButtonsHider/buttonsHider.service';

@Component({
  selector: 'app-CreateMnemo',
  templateUrl: './CreateMnemo.component.html',
  styleUrls: ['./CreateMnemo.component.css']
})
export class CreateMnemoComponent implements OnInit {

  startCreating = { isStarted: false };

  model: MnemoModel = new MnemoModel('', '');

  constructor(private creator: CreatorService,
              private cookie: CookieService,
              private hider: ButtonsHiderService)
  {
    this.startCreating = creator.startCreating;
  }

  ngOnInit() {
  }

  async createPostRequiest(){
    this.fillModel();
    await this.creator.createPostRequest(this.model);
    this.model = new MnemoModel('', '');
  }

  fillModel()
  {
    this.model.UserId = this.cookie.getCookie('userId');
  }

  backToChoice()
  {
    this.startCreating.isStarted = false;
    this.hider.showButtons();
  }
}
