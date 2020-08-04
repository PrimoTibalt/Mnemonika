using Mnemonika.API.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mnemonika.API.Services
{
    public class SelectorForMnemosToday
    {
        public static IEnumerable<MnemoTransferDto> GetMnemosForToday(IEnumerable<MnemoTransferDto> mnems)
        {
            return mnems.Where(SelectorForMnemosToday.IsForToday);
        }

        private static bool IsForToday(MnemoTransferDto mnemo)
        {
            var daysPassed = (DateTime.Now - mnemo.Date).TotalDays;
            if (daysPassed < 7 || (daysPassed > 14 && daysPassed < 16) || (daysPassed > 30 && daysPassed < 31))
            {
                return true;
            }

            return false;
        }
    }
}
