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
    public class RegController : ControllerBase
    {
        private readonly ILogger<RegController> _logger;

        private readonly IUserRepository _repos;

        public RegController(ILogger<RegController> logger, IUserRepository repos)
        {
            _logger = logger;
            _repos = repos;
        }

        [HttpPost]
        public async Task<IActionResult> Register()
        {
            // Create validation of user.
            // Create registration method.
            throw new NotImplementedException(nameof(Register));
        }
    }
}
