import { Component, OnInit } from '@angular/core';
import { CreatorService } from '../services/Creator/Creator.service';
import { MnemoModel } from '../MnemoModel/MnemoModel';
import { CookieService } from '../services/Cookie/Cookie.service';

@Component({
  selector: 'app-CreateMnemo',
  templateUrl: './CreateMnemo.component.html',
  styleUrls: ['./CreateMnemo.component.css']
})
export class CreateMnemoComponent implements OnInit {

  startCreating = { isStarted: false };

  model: MnemoModel = new MnemoModel(0, '');

  constructor(private creator: CreatorService, private cookie: CookieService)
  {
    this.startCreating = creator.startCreating;
  }

  ngOnInit() {
  }

  async createPostRequiest(){
    this.fillModel();
    await this.creator.createPostRequest(this.model);
  }

  fillModel()
  {
    this.model.UserId = Number.parseInt(this.cookie.getCookie('userId'));
  }
}
