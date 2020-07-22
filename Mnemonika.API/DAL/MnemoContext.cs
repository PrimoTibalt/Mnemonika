using System.Data;
using Microsoft.EntityFrameworkCore;

namespace Mnemonika.API.DAL
{
    public class MnemoContext
    {
        public IDbConnection ConnectionContext { get; set; }

        public MnemoContext(IDbConnection connectionContext){
            this.ConnectionContext = connectionContext;
        }
    }
}