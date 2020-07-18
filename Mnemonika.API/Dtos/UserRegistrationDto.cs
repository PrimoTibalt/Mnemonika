using System.ComponentModel.DataAnnotations;

namespace Mnemonika.API.Dtos
{
    public class UserRegistrationDto
    {
        [Required]
        [MinLength(2)]
        public string Login { get; set; }

        [Required]
        [MinLength(8)]
        public string Password { get; set; }
    }
}