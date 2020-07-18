using System.Threading.Tasks;
using Mnemonika.API.Models;

namespace Mnemonika.API.DAL.Repository
{
    public interface IUserRepositoryRegistration
    {
         Task<RegistrationResult> UserRegistration(string login, string password);
    }
}