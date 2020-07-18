using System.ComponentModel.DataAnnotations;

namespace Mnemonika.API.Models
{
    public class RegistrationResult
    {
        public bool IsSucceeded {get; set;}

        [Required]
        public string Message {get; set;}
    }
}