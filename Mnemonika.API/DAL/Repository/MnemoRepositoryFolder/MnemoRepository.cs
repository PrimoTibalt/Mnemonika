using System.Collections.Generic;
using System.Threading.Tasks;
using Mnemonika.API.Dtos;
using Dapper;
using System.Linq;
using System.Data;
using System;
using System.Globalization;
using Mnemonika.API.Services;
using Mnemonika.API.DAL.Repository.MnemoRepositoryFolder.ReadMnemo;

namespace Mnemonika.API.DAL.Repository.MnemoRepositoryFolder
{
    public class MnemoRepository : IMnemoRepository
    {
        private MnemoContext _context;

        private IReadMnemoRepository _readMnemo;

        public MnemoRepository(MnemoContext context, IReadMnemoRepository readMnemo)
        {
            this._context = context;
            this._readMnemo = readMnemo;
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
            await this.queryAsync(query, parameters);
            return mnemo;
        }

        public async Task<IList<MnemoTransferDto>> GetMnemoForUserToday(string userId)
        {
            this._readMnemo.DeleteUpdateRead();
            string query = @"SELECT * FROM MnemoTable WHERE userId=@userId AND isReadToday='false'";
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@userId", userId, DbType.String);
            var mnems = await this._context.ConnectionContext.QueryAsync(query, parameters);
            if (mnems is null)
            {
                throw new ArgumentException("Mnems doesn't exists");
            }

            var mnemsDto = SelectorForMnemosToday.GetMnemosForToday(this.convertFromDynamicToDto(mnems));

            return mnemsDto.ToList();
        }

        public async Task SetReadStatus(MnemoTransferDto mnemo)
        {
            string query = @"UPDATE MnemoTable SET isReadToday='"+true.ToString().ToLowerInvariant()+"' WHERE userId=@userId AND word=@word AND translate=@translate";
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@userId", mnemo.UserId, DbType.String);
            parameters.Add("@word", mnemo.Word, DbType.String);
            parameters.Add("@translate", mnemo.Translate, DbType.String);
            this._readMnemo.AddToday(await this.GetIdOfMnemo(mnemo));
            await this.queryAsync(query, parameters);
        }

        private async Task queryAsync(string query, DynamicParameters parameters)
        {
            try
            {
                _ = await this._context.ConnectionContext.QueryAsync(query, parameters);
            }
            catch (Microsoft.Data.Sqlite.SqliteException exc)
            {
                throw new ArgumentException(exc.Message);
            }
        }

        private IEnumerable<MnemoTransferDto> convertFromDynamicToDto(IEnumerable<dynamic> nonConverted)
        {
            return nonConverted.Select(x => new MnemoTransferDto()
             {
                 UserId = x.userId,
                 Word = x.word,
                 Context = x.context,
                 Translate = x.translate,
                 PictureUrl = x.pictureUrl,
                 Mnemo = x.mnemo,
                 Date = DateTime.Parse(x.date, CultureInfo.CurrentCulture),
                 IsReadToday = Boolean.Parse(x.isReadToday)
             });
        }

        private async Task<string> GetIdOfMnemo(MnemoTransferDto mnemo)
        {
            string query = "SELECT id FROM MnemoTable WHERE userId=@userId AND word=@word AND translate=@translate";
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@userId", mnemo.UserId, DbType.String);
            parameters.Add("@word", mnemo.Word, DbType.String);
            parameters.Add("@translate", mnemo.Translate, DbType.String);
            return (await this._context.ConnectionContext.QueryAsync(query, parameters)).FirstOrDefault().id;
        }
    }
}