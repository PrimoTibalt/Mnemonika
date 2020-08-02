using OpenQA.Selenium;

namespace MnemonikaTests.PageObject
{
    public class MainMenuPageObject
    {
        private readonly IWebDriver _driver;

        private readonly By _loginInput = By.XPath(@"//input[@id='inputLogin']");

        private readonly By _passwordInput = By.XPath(@"//input[@id='inputPassword']");

        private readonly By _signinButton = By.XPath(@"//button[text()='Sign in']");

        public MainMenuPageObject(IWebDriver driver)
        {
            this._driver = driver;
        }

        public IWebElement FindLoginInput()
        {
            return this._driver.FindElement(this._loginInput);
        }

        public IWebElement FindPasswordInput()
        {
            return this._driver.FindElement(this._passwordInput);
        }

        public IWebElement FindSignInButton()
        {
            return this._driver.FindElement(this._signinButton);
        }

        public AuthorizedMainMenuPageObject SignIn()
        {
            this.FindSignInButton().Click();

            return new AuthorizedMainMenuPageObject(this._driver);
        }

        public AuthorizedMainMenuPageObject LogIn(string login, string password)
        {
            this.FindLoginInput().SendKeys(login);
            this.FindPasswordInput().SendKeys(password);
            this.SignIn();
            return new AuthorizedMainMenuPageObject(this._driver);
        }
    }
}
