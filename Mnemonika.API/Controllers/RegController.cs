using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Mnemonika.API.DAL.Repository;
using Mnemonika.API.Dtos;

namespace Mnemonika.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RegController : ControllerBase
    {
        private readonly ILogger<RegController> _logger;

        private readonly IUserRepositoryRegistration _repos;

        private readonly IConfiguration _config;

        public RegController(ILogger<RegController> logger, IUserRepositoryRegistration repos)
        {
            _logger = logger;
            _repos = repos;
        }

        [HttpPost]
        public async Task<IActionResult> Register(UserRegistrationDto user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _repos.UserRegistration(user.Login, user.Password);

            if (result.IsSucceeded)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest(result.Message);
            }
        }
    }
}
