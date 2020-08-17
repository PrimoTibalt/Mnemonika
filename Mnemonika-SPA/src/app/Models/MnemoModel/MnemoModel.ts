
export class MnemoModel {

  constructor(userId: string, word: string)
  {
    this.UserId = userId;
    this.Word = word;
  }
  UserId: string;

  Word: string;

  Context: string;

  Translate: string;

  PictureUrl: string;

  Mnemo: string;

  DateOfCreate: string;

  isTranslated = false;
}
