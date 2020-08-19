using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace Mnemonika.API.DAL.Repository.MnemoRepositoryFolder.ReadMnemo
{
    public class ReadMnemoRepository : IReadMnemoRepository
    {
        private MnemoContext _context;

        public ReadMnemoRepository(MnemoContext context)
        {
            this._context = context;
        }

        public async void AddToday(string mnemoId)
        {
            string query = @"INSERT INTO ReadDay(mnemoId, time) VALUES(@mnemoId, @time)";
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@mnemoId", mnemoId, DbType.String);
            parameters.Add("@time", DateTime.Today.ToShortDateString(), DbType.String);

            try
            {
                _ = await this._context.ConnectionContext.QueryAsync(query, parameters);
            }
            catch (Microsoft.Data.Sqlite.SqliteException _)
            {
                throw new ArgumentException("Failed to add new read couple");
            }
        }

        public async void DeleteUpdateRead()
        {
            string query = @"SELECT id, mnemoId, time from ReadDay";
            try
            {
                var data = await this._context.ConnectionContext.QueryAsync(query);
                if(data.AsList().Count == 0)
                {
                    return;
                }

                await this.QueryDeleteUpdate(data);
            }
            catch (Microsoft.Data.Sqlite.SqliteException _)
            {
                throw new ArgumentException("Didnt reach database on delete read.");
            }
        }

        private async Task QueryDeleteUpdate(IEnumerable<dynamic> data)
        {
            StringBuilder dynamicQueryDelete = this.createQueryToDelete();
            StringBuilder dynamicQueryUpdate = this.createQueryToUpdate();

            string dateNow = this.getOnlyDateOfToday();

            bool have = false;
            foreach (var couple in data)
            {
                if (DateTime.Parse(couple.time) < DateTime.Parse(dateNow))
                {
                    dynamicQueryDelete.Append($"id={couple.id} OR ");
                    dynamicQueryUpdate.Append($"id={couple.mnemoId} OR ");
                    have = true;
                }
            }

            if (!have)
            {
                return;
            }

            dynamicQueryDelete.Remove(dynamicQueryDelete.Length - 3, 3);
            dynamicQueryUpdate.Remove(dynamicQueryUpdate.Length - 3, 3);
            try
            {
                // to DO : add logging.
                await this._context.ConnectionContext.QueryAsync(dynamicQueryDelete.ToString());
                await this._context.ConnectionContext.QueryAsync(dynamicQueryUpdate.ToString());
            }
            catch (Microsoft.Data.Sqlite.SqliteException e)
            {
                throw new ArgumentException(e.Message);
            }
        }

        private StringBuilder createQueryToDelete()
        {
            StringBuilder dynamicQueryDelete = new StringBuilder();
            dynamicQueryDelete.Append("DELETE FROM ReadDay WHERE ");
            return dynamicQueryDelete;
        }

        private StringBuilder createQueryToUpdate()
        {
            StringBuilder dynamicQueryUpdate = new StringBuilder();
            dynamicQueryUpdate.Append($"UPDATE MnemoTable SET isReadToday = '{false.ToString().ToLowerInvariant()}' WHERE isReadToday = 'true' AND (");
            return dynamicQueryUpdate;
        }

        private string getOnlyDateOfToday()
        {
            StringBuilder dateNow = new StringBuilder();
            dateNow.Append(DateTime.Now.Day.ToString());
            dateNow.Append(".");
            dateNow.Append(DateTime.Now.Month.ToString());
            dateNow.Append(".");
            dateNow.Append(DateTime.Now.Year.ToString());
            return dateNow.ToString();
        }
    }
}
