using Mnemonika.API.Models;

namespace Mnemonika.API.DAL.Repository
{
    public interface IUserRepository
    {
         User GetUser(string login, string password);

         RegistrationResult UserRegistration(string login, string password);
    }
}