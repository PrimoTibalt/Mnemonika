using MnemonikaTests.Data;
using MnemonikaTests.PageObject;
using NUnit.Framework;
using OpenQA.Selenium;

namespace MnemonikaTests
{
    [TestFixture]
    public class Tests : BaseTest
    {
        // private readonly By _signinButton = By.XPath(@"//button[text()='Sign in']");
        // private readonly By _createButton = By.XPath(@"//div[@class='mnemo-Create-Button']");
        // private readonly By _showButton = By.XPath(@"//div[@class='mnemo-Show-Button']");
        // Need to add identifier for these buttons.

        [Test]
        public void TestAuthorizationLogIn()
        {
            this._driver.Navigate().Refresh();

            this._authorizedMainMenu = _mainMenu.LogIn(UserData.USERNAME_CORRECT, UserData.PASSWORD_CORRECT);

            if (_authorizedMainMenu.FindCreateButton().Displayed && 
                _authorizedMainMenu.FindShowButton().Displayed)
            {
                Assert.Pass();
            }
            else
            {
                Assert.Fail();
            }
        }

        [Test]
        public void TestFailAuthorization()
        {
            this._driver.Navigate().Refresh();

            this._authorizedMainMenu = this._mainMenu.LogIn(UserData.USERNAME_UNCORRECT, UserData.PASSWORD_UNCORRECT);

            if (_authorizedMainMenu.FindCreateButton().Displayed ||
                _authorizedMainMenu.FindShowButton().Displayed)
            {
                Assert.Fail();
            }
            else
            {
                Assert.Pass();
            }
        }
    }
}