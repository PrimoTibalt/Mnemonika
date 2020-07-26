using System;

namespace Mnemonika.API.Dtos
{
    public class MnemoTransferDto
    {
        public string UserId {get; set;}

        public string Word {get; set;}

        public string Context {get; set;}

        public string Translate {get; set;}

        public string PictureUrl {get; set;}

        public string Mnemo {get; set;}

        public DateTime Date {get; set;}
    }
}