const { Builder, Browser, By, Key, until } = require("selenium-webdriver");

(async function example() {
  let driver = await new Builder().forBrowser(Browser.FIREFOX).build();

  const email = "";
  const otp = "";
  const firstName = "";
  const lastName = "";
  const address = "";
  const city = "";
  const pincode = "";

  try {
    await driver.get("https://d429d4-c7.myshopify.com/");

    await driver.manage().window().maximize();

    const loginElm = await driver.findElement(
      By.xpath(
        '//a[@href="https://shopify.com/64033882165/account?locale=en"]',
      ),
    );
    await driver.actions().click(loginElm).perform();

    await driver.sleep(10000);

    const emailElm = await driver.findElement(
      By.xpath('//*[@id="account_email"]'),
    );
    const emailSubmitElm = await driver.findElement(By.name("commit"));

    await driver.actions().sendKeys(emailElm, email).perform();

    await driver.actions().click(emailSubmitElm).perform();

    await driver.sleep(10000);

    const otpElm = await driver.findElement(
      By.xpath('//*[@id="account_one_time_code"]'),
    );
    // const otpElm = await driver.findElement(
    //   By.xpath('//*[@id="account_auth_code"]'),
    // );
    const otpSubmitElm = await driver.findElement(By.name("commit"));

    await driver.actions().sendKeys(otpElm, otp).perform();
    await driver.actions().click(otpSubmitElm).perform();

    await driver.sleep(10000);

    const storeLink = await driver.findElement(
      By.xpath('//p[text()="My Store"]'),
    );

    await driver.actions().click(storeLink).perform();
    // /////////
    const cardElement = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//*[@id="CardLink-template--16874253647925__featured_collection-7687376994357"]',
        ),
      ),
      10000,
    );
    driver.actions().click(cardElement).perform();

    await driver.sleep(2000);

    const plusBtn = await driver.findElement(By.name("plus"));
    const addToCartBtn = await driver.findElement(By.name("add"));

    await driver.actions().click(plusBtn).perform();

    await driver.sleep(2000);

    await driver.actions().click(addToCartBtn).perform();

    await driver.sleep(3000);

    const checkoutBtn = await driver.findElement(By.name("checkout"));

    await driver.actions().click(checkoutBtn).perform();

    await driver.sleep(10000);

    const firstNameElm = await driver.findElement(
      By.xpath('//*[@id="TextField0"]'),
    );
    const lastNameElm = await driver.findElement(
      By.xpath('//*[@id="TextField1"]'),
    );
    const addressElm = await driver.findElement(
      By.xpath('//*[@id="shipping-address1"]'),
    );
    const cityElm = await driver.findElement(By.xpath('//*[@id="TextField3"]'));
    const postalCodeElm = await driver.findElement(
      By.xpath('//*[@id="TextField4"]'),
    );

    await driver.actions().sendKeys(firstNameElm, firstName).perform();
    await driver.actions().sendKeys(lastNameElm, lastName).perform();
    await driver.actions().sendKeys(addressElm, address).perform();
    await driver.actions().sendKeys(cityElm, city).perform();
    await driver.actions().sendKeys(postalCodeElm, pincode).perform();

    await driver.sleep(10000);

    await driver.sleep(10000);
    const checkOutPayBtn = await driver.findElement(
      By.xpath('//*[@id="checkout-pay-button"]'),
    );
    await driver.executeScript(
      "arguments[0].scrollIntoView();",
      checkOutPayBtn,
    );

    await driver.sleep(10000);
    await driver.actions().click(checkOutPayBtn).perform();
    await driver.sleep(10000);
    await driver.actions().click(checkOutPayBtn).perform();
    console.log("checkout successful");

    await driver.sleep(10000);
    await driver.navigate().refresh();

    await driver.sleep(5000);

    const orderElement = await driver.findElement(
      By.xpath(`//h2[contains(text(), 'Order')]`),
    );

    console.log(orderElement.getText());
    await driver.sleep(50000);
  } catch (error) {
    console.error(`An error occurred ${error}`);
  } finally {
    await driver.quit();
  }
})();
