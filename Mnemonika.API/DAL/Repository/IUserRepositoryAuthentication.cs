using System.Threading.Tasks;
using Mnemonika.API.Models;

namespace Mnemonika.API.DAL.Repository
{
    public interface IUserRepositoryAuthentication
    {
         Task<User> Login(string login, string password);
    }
}