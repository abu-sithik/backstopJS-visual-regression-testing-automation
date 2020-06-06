module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);

      await page.waitForSelector('button.form__button.form__button--green.cookie-button');
 	  await page.click('button.form__button.form__button--green.cookie-button');
 	  console.log('SCENARIO > ' + scenario.label + '  closing dashboard cookie');
 	  await page.waitFor(5000);

      await page.waitForSelector('button.alert-button.alert-button-reject');
  	  await page.click('button.alert-button.alert-button-reject');

  	  console.log('SCENARIO > ' + scenario.label + '  closing webpush alert-button-reject cookie');
  	  await page.waitFor(5000);

};
