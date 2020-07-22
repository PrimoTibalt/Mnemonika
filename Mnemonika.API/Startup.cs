using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Mnemonika.API.DAL;
using Mnemonika.API.DAL.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using Mnemonika.API.DAL.Repository.MnemoRepositoryFolder;
using Microsoft.Data.Sqlite;

namespace Mnemonika.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddCors(options => {
                options.AddDefaultPolicy(
                    builder => {
                        builder.AllowAnyMethod().AllowAnyOrigin().AllowAnyHeader();
                    }
                );
            });

            services.AddDbContext<RegistrationContext>(x => x.UseSqlite(Configuration.GetConnectionString("RegistrationConnection")));

            services.AddScoped<IUserRepositoryView, UserRepositoryView>();
            services.AddScoped<IUserRepositoryRegistration, UserRepositoryRegistration>();
            services.AddTransient<IDbConnection>(x => new SqliteConnection(this.Configuration.GetConnectionString("MnemoConnection")));
            services.AddScoped<MnemoContext, MnemoContext>();
            services.AddScoped<IMnemoRepository, MnemoRepository>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(option => 
            {
                option.TokenValidationParameters = new TokenValidationParameters{
                    ValidateIssuerSigningKey=true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseAuthentication();
            app.UseRouting();
            app.UseCors();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
