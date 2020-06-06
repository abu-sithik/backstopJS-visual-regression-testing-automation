module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);


  await page.waitForSelector('button.form__button.form__button--green.cookie-button');
  await page.click('button.form__button.form__button--green.cookie-button');

    // Waits until the `email & password` meta element is rendered
      await page.waitForSelector('input[name="email"]');

      await page.waitForSelector('input[name="password"]');


      await page.type('input[name="email"]', 'saiarjun.srinivasan+chromehighps@zoomrx.com',{delay: 5});
      await page.type('input[name="password"]', 'Test1234!',{delay: 5});

      await page.click('span.checkmark__label');

};
