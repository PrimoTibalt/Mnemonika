using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mnemonika.API.DAL.Repository.MnemoRepositoryFolder.ReadMnemo
{
    public interface IReadMnemoRepository
    {
        void AddToday(string mnemoId);

        void DeleteUpdateRead();
    }
}
