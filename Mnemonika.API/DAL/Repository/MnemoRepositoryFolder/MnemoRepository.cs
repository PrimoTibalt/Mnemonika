using System.Collections.Generic;
using System.Threading.Tasks;
using Mnemonika.API.Dtos;
using Dapper;
using System.Linq;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System;
using System.Globalization;
using Mnemonika.API.Services;

namespace Mnemonika.API.DAL.Repository.MnemoRepositoryFolder
{
    public class MnemoRepository : IMnemoRepository
    {
        private MnemoContext _context;

        public MnemoRepository(MnemoContext context)
        {
            this._context = context;
        }

        public async Task<MnemoTransferDto> CreateMnemo(MnemoTransferDto mnemo)
        {
            string query = @"INSERT INTO MnemoTable(id, userId, word, context, translate, pictureUrl, mnemo, date)" +
            " VALUES(@id, @userId, @word, @context, @translate, @pictureUrl, @mnemo, @date)";
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@id", Guid.NewGuid().ToString(), DbType.String);
            parameters.Add("@userId", mnemo.UserId, DbType.String);
            parameters.Add("@word", mnemo.Word, DbType.String);
            parameters.Add("@context", mnemo.Context, DbType.String);
            parameters.Add("@translate", mnemo.Translate, DbType.String);
            parameters.Add("@pictureUrl", mnemo.PictureUrl, DbType.String);
            parameters.Add("@mnemo", mnemo.Mnemo, DbType.String);
            parameters.Add("@date", mnemo.Date.ToString(CultureInfo.CurrentCulture), DbType.String);

            try
            {
                await this._context.ConnectionContext.QueryAsync(query, parameters);
            }
            catch(Microsoft.Data.Sqlite.SqliteException exc)
            {
                throw new ArgumentException(exc.Message);
            }

            return mnemo;
        }

        public async Task<IList<MnemoTransferDto>> GetMnemoForUserToday(string userId)
        {
            string query = @"SELECT * FROM MnemoTable WHERE userId=@userId";
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@userId", userId, DbType.String);
            var mnems = await this._context.ConnectionContext.QueryAsync(query, parameters);
            if (mnems is null)
            {
                throw new ArgumentException("Mnems doesn't exists");
            }

            var mnemsDto = SelectorForMnemosToday.GetMnemosForToday(mnems.Select(x => new MnemoTransferDto() {
                UserId = x.userId,
                Word = x.word,
                Context = x.context,
                Translate = x.translate,
                PictureUrl = x.pictureUrl,
                Mnemo = x.mnemo,
                Date = DateTime.Parse(x.date, CultureInfo.CurrentCulture)
            }));

            return mnemsDto.ToList();
        }
    }
}