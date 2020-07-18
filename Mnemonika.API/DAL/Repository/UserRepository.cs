using System;
using System.Collections.Generic;
using Mnemonika.API.Models;

namespace Mnemonika.API.DAL.Repository
{
    public class UserRepository : IUserRepository
    {
        protected RegistrationContext _context {get; set;}

        public UserRepository(RegistrationContext context)
        {
            _context = context;
        }

        public User GetUser(string login, string password)
        {
            throw new NotImplementedException(nameof(GetUser));
        }

        public IList<User> GetUsers()
        {
            throw new NotImplementedException(nameof(GetUsers));
        }

        public RegistrationResult UserRegistration(string login, string password)
        {
            throw new NotImplementedException(nameof(UserRegistration));
        }
    }
}