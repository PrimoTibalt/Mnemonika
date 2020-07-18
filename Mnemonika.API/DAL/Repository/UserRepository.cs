using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Mnemonika.API.Dtos;
using Mnemonika.API.Models;

namespace Mnemonika.API.DAL.Repository
{
    public class UserRepositoryView : IUserRepositoryView
    {
        protected RegistrationContext _context {get; set;}

        public UserRepositoryView(RegistrationContext context)
        {
            _context = context;
        }

        public async Task<User> GetUser(string login)
        {
            return await _context.users.FirstOrDefaultAsync(u => u.Username == login);
        }

        public async Task<IList<User>> GetUsers()
        {
            return await _context.users.ToListAsync();
        }
    }
}