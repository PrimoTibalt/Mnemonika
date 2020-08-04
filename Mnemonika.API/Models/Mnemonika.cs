using System;
using System.ComponentModel.DataAnnotations;

namespace Mnemonika.API.Models
{
    public class Mnemonika
    {
        [Required]
        public int Id {get; set;}

        [Required]
        public int UserId {get; set;}

        [Required]
        public string Word {get; set;}

        [Required]
        public DateTime Date {get; set;}
        
        public string Context {get; set;}

        public string Translate {get; set;}

        public string PictureUrl {get; set;}

        public string Mnemo {get; set;}

        public bool IsReadToday {get; set;}
    }
}