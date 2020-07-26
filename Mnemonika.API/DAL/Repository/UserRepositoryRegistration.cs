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
            if(String.IsNullOrWhiteSpace(login))
            {
                return new RegistrationResult() { Message=$"User login is null or whitespace", IsSucceeded=false };
            }
            if(String.IsNullOrWhiteSpace(password))
            {
                return new RegistrationResult() { Message=$"User password is null or whitespace.", IsSucceeded=false };
            }

            try
            {
                User existingUser;

                existingUser = await _context.users.FirstOrDefaultAsync(u => u.Username == login);
                if (existingUser != null)
                {
                    return new RegistrationResult() { Message=$"User with name {login} already exists.", IsSucceeded=false };
                }

                CreatePasswordHash(password, out passwordHash, out passwordSalt);
                var guid = Guid.NewGuid();
                var user = new User()
                {
                    Id = guid.ToString(),
                    Username = login,
                    Password = passwordHash,
                    Salt = passwordSalt
                };
                await _context.users.AddAsync(user);
                await _context.SaveChangesAsync();
                return new RegistrationResult() { Message="User Created." , IsSucceeded=true };
            }
            catch(Microsoft.EntityFrameworkCore.DbUpdateException)
            {
                return new RegistrationResult() { Message="Troubles with database update.", IsSucceeded=false };
            }
            catch(FormatException formExc)
            {
                return new RegistrationResult() { Message=formExc.Message, IsSucceeded=false };
            }
            catch(InvalidOperationException invalidExc)
            {
                return new RegistrationResult() { Message=invalidExc.Message, IsSucceeded=false };
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