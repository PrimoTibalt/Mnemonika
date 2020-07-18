using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Mnemonika.API.Models;

namespace Mnemonika.API.DAL.Repository
{
    public class UserRepositoryRegistration : IUserRepositoryRegistration
    {
        protected RegistrationContext _context {get; set;}

        public UserRepositoryRegistration(RegistrationContext context)
        {
            _context = context;
        }

        public async Task<RegistrationResult> UserRegistration(string login, string password)
        {
            byte[] passwordHash, passwordSalt;
            try
            {
                var existingUser = await _context.users.FirstAsync(u => u.Username == login);
                if (existingUser != null)
                {
                    throw new ArgumentException($"User with name {login} already exists.");
                }

                CreatePasswordHash(password, out passwordHash, out passwordSalt);
                var user = new User()
                {
                    Username = login,
                    Password = passwordHash,
                    Salt = passwordSalt
                };
                await _context.users.AddAsync(user);
                await _context.SaveChangesAsync();
                return new RegistrationResult() { Message="UserCreated" , IsSucceeded=true };
            }
            catch(Microsoft.EntityFrameworkCore.DbUpdateException)
            {
                return new RegistrationResult() { Message="Troubles with database update", IsSucceeded=false };
            }
            catch(ArgumentException are)
            {
                return new RegistrationResult() { Message=are.Message, IsSucceeded=false };
            }
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}