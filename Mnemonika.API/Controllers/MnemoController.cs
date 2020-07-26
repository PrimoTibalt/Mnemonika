using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Mnemonika.API.DAL.Repository;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Mnemonika.API.Dtos;
using Mnemonika.API.DAL.Repository.MnemoRepositoryFolder;

namespace Mnemonika.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MnemoController : ControllerBase
    {
        private readonly ILogger<LogInController> _logger;

        private readonly IMnemoRepository _repos;

        public MnemoController(ILogger<LogInController> logger, IMnemoRepository repos)
        {
            _logger = logger;
            _repos = repos;
        }

        [Authorize]
        [HttpGet]
        [Route("{userId}")]
        public async Task<IActionResult> GetMyMnemos(string userId)
        {
            return Ok(await this._repos.GetMnemoForUserToday(userId));
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateMnemo(MnemoTransferDto mnemo)
        {
            if (mnemo is null) 
            {
                return BadRequest("Didn't get mnemo.");
            }
            
            try
            {
                mnemo.Date = DateTime.Now;
                return Created("current", await this._repos.CreateMnemo(mnemo));
            }
            catch(ArgumentException exc)
            {
                return BadRequest(exc.Message);
            }
        }
    }
}