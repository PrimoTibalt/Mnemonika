using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Text;

namespace MnemonikaTests.PageObject
{
    public class AuthorizedMainMenuPageObject
    {
        private readonly IWebDriver _driver;

        private readonly By _createButton = By.XPath(@"//div[@class='mnemo-Create-Button']");

        private readonly By _showButton = By.XPath(@"//div[@class='mnemo-Show-Button']");

        public AuthorizedMainMenuPageObject(IWebDriver driver)
        {
            this._driver = driver;
        }

        public IWebElement FindCreateButton()
        {
            return this._driver.FindElement(this._createButton);
        }

        public IWebElement FindShowButton()
        {
            return this._driver.FindElement(this._showButton);
        }
    }
}
