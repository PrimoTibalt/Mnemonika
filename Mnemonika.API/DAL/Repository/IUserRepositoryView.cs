using System.Collections.Generic;
using System.Threading.Tasks;
using Mnemonika.API.Models;

namespace Mnemonika.API.DAL.Repository
{
    public interface IUserRepositoryView
    {
        Task<User> GetUser(string login);

        Task<IList<User>> GetUsers();
    }
}