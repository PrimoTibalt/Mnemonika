using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Mnemonika.API.DAL.Repository;

namespace Mnemonika.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<RegController> _logger;

        private readonly IUserRepositoryView _repos;

        public UsersController(ILogger<RegController> logger, IUserRepositoryView repos)
        {
            _logger = logger;
            _repos = repos;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            return Ok(_repos.GetUser("Bob"));
        }
    }
}
