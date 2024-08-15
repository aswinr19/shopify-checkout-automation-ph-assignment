const { Builder, Browser, By, Key, until } = require("selenium-webdriver");

(async function checkout() {
  let driver = await new Builder().forBrowser(Browser.FIREFOX).build();

  const email = "";
  const otp = "";
  const firstName = "";
  const lastName = "";
  const address = "";
  const city = "";
  const pincode = "";
  const link = "https://d429d4-c7.myshopify.com/";
  
  try {
    await driver.get(link);

    //maximize window for better visibility
    await driver.manage().window().maximize();

    //fetch login element
    const loginElm = await driver.findElement(
      By.xpath(
        '//a[@href="https://shopify.com/64033882165/account?locale=en"]',
      ),
    );
    //goto login page
    await driver.actions().click(loginElm).perform();
    // wait for 10 seconds
    await driver.sleep(10000);

    //fetch email element for login
    const emailElm = await driver.findElement(
      By.xpath('//*[@id="account_email"]'),
    );
    //fetch email post button
    const emailSubmitElm = await driver.findElement(By.name("commit"));
    // fillout email
    await driver.actions().sendKeys(emailElm, email).perform();
    // post email
    await driver.actions().click(emailSubmitElm).perform();

    await driver.sleep(10000);

    //otp form element id can change!
    const otpElm = await driver.findElement(
      By.xpath('//*[@id="account_one_time_code"]'),
    );
    // const otpElm = await driver.findElement(
    //   By.xpath('//*[@id="account_auth_code"]'),
    // );
    // fetch otp post button
    const otpSubmitElm = await driver.findElement(By.name("commit"));
    // fillout opt (otp is hardcoded, otp will not change for few minutes)
    await driver.actions().sendKeys(otpElm, otp).perform();
    // post otp and login
    await driver.actions().click(otpSubmitElm).perform();

    await driver.sleep(10000);

    //login redirects to orders page, from there find the link to store
    const storeLink = await driver.findElement(
      By.xpath('//p[text()="My Store"]'),
    );
    // click on the link to store
    await driver.actions().click(storeLink).perform();
    // find the link of the product to buy (wait until the element is loaded)
    const cardElement = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//*[@id="CardLink-template--16874253647925__featured_collection-7687376994357"]',
        ),
      ),
      10000,
    );
    // click on the product to see details
    driver.actions().click(cardElement).perform();

    await driver.sleep(2000);

    //find the + button to increase the order quantity
    const plusBtn = await driver.findElement(By.name("plus"));
    // find add to cart button
    const addToCartBtn = await driver.findElement(By.name("add"));
    // click on add to cart
    await driver.actions().click(plusBtn).perform();

    await driver.sleep(2000);

    // increase the quantity to two
    await driver.actions().click(addToCartBtn).perform();

    await driver.sleep(3000);

    //from the model popup, find the button with text checkout
    const checkoutBtn = await driver.findElement(By.name("checkout"));

    //checkout
    await driver.actions().click(checkoutBtn).perform();

    await driver.sleep(10000);

    // find first name, last name, address, city, postal code etc.
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

    // fillout first name, last name, address, city, postal code etc.
    await driver.actions().sendKeys(firstNameElm, firstName).perform();
    await driver.actions().sendKeys(lastNameElm, lastName).perform();
    await driver.actions().sendKeys(addressElm, address).perform();
    await driver.actions().sendKeys(cityElm, city).perform();
    await driver.actions().sendKeys(postalCodeElm, pincode).perform();

    await driver.sleep(10000);

    await driver.sleep(10000);

    //find the checkout button
    const checkOutPayBtn = await driver.findElement(
      By.xpath('//*[@id="checkout-pay-button"]'),
    );
    //scroll to the checkout button, because it is outside the viewport
    await driver.executeScript(
      "arguments[0].scrollIntoView();",
      checkOutPayBtn,
    );

    await driver.sleep(10000);
    //click checkout to show the shipping methods (shipping methods should be visible
    //when we fill the form, but it is not working for me!)
    await driver.actions().click(checkOutPayBtn).perform();
    await driver.sleep(10000);

    // after getting the shipping methods (cod by default) click on the checkout button again to checkout
    await driver.actions().click(checkOutPayBtn).perform();
    console.log("checkout successful");
    // order placed!
    await driver.sleep(10000);

    // to view the order number, refresh the page
    await driver.navigate().refresh();

    await driver.sleep(5000);

    //find the h2 element with the order number
    const orderElement = await driver.findElement(
      By.xpath(`//h2[contains(text(), 'Order')]`),
    );

    //get the order number from the element and print it in console
    console.log(orderElement.getText());
    await driver.sleep(50000);
  } catch (error) {
    console.error(`An error occurred ${error}`);
  } finally {
    await driver.quit();
  }
})();
