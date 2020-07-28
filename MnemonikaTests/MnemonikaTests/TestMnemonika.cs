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

        [SetUp]
        public void Setup()
        {
            driver = new OpenQA.Selenium.Chrome.ChromeDriver();
            driver.Navigate().GoToUrl("http://localhost:4200");
            driver.Manage().Window.Maximize();
        }

        [Test]
        public void TestAuthorization()
        {
            driver.FindElement(_loginInput).SendKeys(LOGIN);
            driver.FindElement(_passwordInput).SendKeys(PASSWORD);

            driver.FindElement(_signinButton).Click();
            if (driver.FindElement(_createButton).Displayed && driver.FindElement(_showButton).Displayed)
            {
                Assert.Pass();
            }
            else
            {
                Assert.Fail();
            }
        }

        [TearDown]
        public void TearDown()
        {

        }
    }
}