using NUnit.Framework;
using OpenQA.Selenium;

namespace MnemonikaTests
{
    public class Tests
    {
        private IWebDriver driver;

        private readonly By _loginInput = By.XPath(@"//input[@id='inputLogin']");

        private readonly By _passwordInput = By.XPath(@"//input[@id='inputPassword']");

        private readonly By _signinButton = By.XPath(@"//button[text()='Sign in']");
        private readonly By _createButton = By.XPath(@"//div[@class='mnemo-Create-Button']");
        private readonly By _showButton = By.XPath(@"//div[@class='mnemo-Show-Button']");
        // Need to add identifier for these buttons.

        private const string LOGIN = "Bob";

        private const string PASSWORD = "password";

        private const string WRONG_LOGIN = "1235lkh";

        private const string WRONG_PASSWORD = "1poidfgih";

        [SetUp]
        public void Setup()
        {
            driver = new OpenQA.Selenium.Chrome.ChromeDriver();
            driver.Navigate().GoToUrl("http://localhost:4200");
            driver.Manage().Window.Maximize();
        }

        [Test]
        public void TestAuthorizationLogIn()
        {
            driver.Navigate().Refresh();

            this.LogIn(LOGIN, PASSWORD);

            if (driver.FindElement(_createButton).Displayed && driver.FindElement(_showButton).Displayed)
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
            driver.Navigate().Refresh();

            this.LogIn(WRONG_LOGIN, WRONG_PASSWORD);

            if (driver.FindElement(_createButton).Displayed && driver.FindElement(_showButton).Displayed)
            {
                Assert.Fail();
            }
            else
            {
                Assert.Pass();
            }
        }

        private void LogIn(string login, string password)
        {
            driver.FindElement(_loginInput).SendKeys(login);
            driver.FindElement(_passwordInput).SendKeys(password);

            driver.FindElement(_signinButton).Click();
        }

        [TearDown]
        public void TearDown()
        {
            driver.Close();
        }
    }
}