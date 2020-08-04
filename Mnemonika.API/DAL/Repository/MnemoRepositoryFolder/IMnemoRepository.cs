using System.Collections.Generic;
using System.Threading.Tasks;
using Mnemonika.API.Dtos;

namespace Mnemonika.API.DAL.Repository.MnemoRepositoryFolder
{
    public interface IMnemoRepository
    {
         Task<IList<MnemoTransferDto>> GetMnemoForUserToday(string userId);

         Task<MnemoTransferDto> CreateMnemo(MnemoTransferDto mnemo);

         Task SetReadStatus(MnemoTransferDto mnemo);
    }
}