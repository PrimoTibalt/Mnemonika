using System.Threading.Tasks;
using Mnemonika.API.Models;

namespace Mnemonika.API.DAL.Repository
{
    public class UserRepositoryAuthentication : IUserRepositoryAuthentication
    {
        public async Task<User> Login(string login, string password)
        {
            throw new System.NotImplementedException();
        }
    }
}