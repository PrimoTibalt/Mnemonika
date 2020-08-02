using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System;

namespace MnemonikaTests
{
    public static class WaitUntil
    {
        public static void ShouldLocate(IWebDriver driver, string url)
        {
            try
            {
                new WebDriverWait(driver, TimeSpan.FromSeconds(10)).Until<bool>((driver) => { return driver.Url.Contains(url); });

            }
            catch(WebDriverException)
            {
                throw new NotFoundException($"Cannot find given url - {url}.");
            }
        }
    }
}
