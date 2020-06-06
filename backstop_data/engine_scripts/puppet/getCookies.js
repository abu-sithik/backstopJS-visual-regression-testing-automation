const fs = require('fs');
const  cookiePath = "backstop_data/engine_scripts/cookies.json";

module.exports = async (page, scenario, vp) => {
  
    console.log('SCENARIO > ' + scenario.label);

    console.log("Closing cookie consent");
    await page.waitForSelector('button.form__button.form__button--green.cookie-button');
    await page.click('button.form__button.form__button--green.cookie-button');

   // Waits until the `email & password` meta element is rendered
    await page.waitForSelector('input[name="email"]');

    await page.waitForSelector('input[name="password"]');
	

    await page.type('input[name="email"]', 'saiarjun.srinivasan+chromehighps@zoomrx.com',{delay: 5});
    await page.type('input[name="password"]', 'Test1234!',{delay: 5});

    await page.click('span.checkmark__label');

    await page.waitForSelector('#app-content > div.app-landing > div > div.landing-container > div > div.login > form > button');
    await page.click('#app-content > div.app-landing > div > div.landing-container > div > div.login > form > button');
    console.log("Submit ");
  	
    await page.waitForNavigation();

  	await	page.waitFor(3000);

    const cookies = await page.cookies();

    console.log("The cookie is:", cookies);
    
    fs.writeFile(cookiePath, JSON.stringify(cookies, null, 2), function(err) {
        if (err) throw err;
        console.log('completed write of cookies');
    });
};
