using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Mnemonika.API.DAL.Repository;
using Mnemonika.API.Dtos;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System;

namespace Mnemonika.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LogInController : ControllerBase
    {
        private readonly ILogger<LogInController> _logger;

        private readonly IUserRepositoryView _repos;

        private readonly IConfiguration _config;

        public LogInController(ILogger<LogInController> logger, IUserRepositoryView repos, IConfiguration config)
        {
            _logger = logger;
            _repos = repos;
            _config = config;
        }

        [HttpGet]
        public IActionResult Show()
        {
            return Ok(_config.GetSection("AppSettings"));
        }

        [HttpPost]
        public async Task<IActionResult> LogIn(UserRegistrationDto user)
        {
            if (user is null)
            {
                return Unauthorized("user is null");
            }
            
            var userFromRepos = await _repos.GetUser(user.Login);
            if (userFromRepos is null)
            {
                return Unauthorized("user doesnt exists");
            }

            var claims = new[] {
                new Claim(ClaimTypes.NameIdentifier, userFromRepos.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepos.Username.ToString())
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value)
            );

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };
            
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return Ok(
                new{
                    token = tokenHandler.WriteToken(token),
                    userId = userFromRepos.Id
                }
            );
        }
    }
}