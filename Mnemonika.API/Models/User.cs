using System;
using System.ComponentModel.DataAnnotations;

namespace Mnemonika.API.Models
{
    public class User
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string Username {get; set;}

        [Required]
        public byte[] Password {get; set;}

        [Required]
        public byte[] Salt {get; set;}

        // public string Email {get; set;}

        // public DateTime DateOfBirth {get; set;}
    }
}