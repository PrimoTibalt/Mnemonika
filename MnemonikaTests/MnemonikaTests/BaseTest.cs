using MnemonikaTests.PageObject;
using MnemonikaTests.Settings;
using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace MnemonikaTests
{
    public class BaseTest
    {
        protected IWebDriver _driver;

        protected MainMenuPageObject _mainMenu;

        protected AuthorizedMainMenuPageObject _authorizedMainMenu;

        [OneTimeSetUp]
        protected void DoBeforeTest()
        {
        }

        [OneTimeTearDown]
        protected void DoAfterTest()
        {
            this._driver.Quit();
        }

        [TearDown]
        protected void DoAfterEach()
        {
            this._driver.Manage().Cookies.DeleteAllCookies();
            this._driver.Close();
        }

        [SetUp]
        protected void DoBeforeEach()
        {
            this._driver = new ChromeDriver();
            this._driver.Url = TestAuthSettings.HostPrefix;
            WaitUntil.ShouldLocate(this._driver, TestAuthSettings.HostPrefix);
            this._mainMenu = new MainMenuPageObject(this._driver);
        }
    }
}
