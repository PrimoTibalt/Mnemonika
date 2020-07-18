using Microsoft.EntityFrameworkCore;
using Mnemonika.API.Models;

namespace Mnemonika.API.DAL
{
    public class RegistrationContext : DbContext
    {
        public RegistrationContext(DbContextOptions<RegistrationContext> options) : base(options)
        {

        }

        public DbSet<User> users {get; set;}
    }
}