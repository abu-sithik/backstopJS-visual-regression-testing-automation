# Automated Visual Regression Testing with BackstopJS

### What is Visual Regression Testing?

> In a definition from more famous Wikipedia, Regression testing is re-running functional and non-functional tests to ensure that previously developed and tested software still performs after a change. In **Visual Regression Testing**, we're trying to run a test to verify the application has no visual difference from its former or less developed state. So in visual regression testing(VRT), most of the time we're not going to test some sort of functionality that we've built. 

> Typically, the main use-case of VRT comes in a few different ways. One of them is just doing updates for web app. When an application is getting an update(like upgrading internal libraries or security updates), we usually don't expect anything to be visually different. So, after an update application should look exactly the same and work exactly the same way before and after the update. So in VRT, we make sure that everything is working fine before the code goes live.

> Another possible use case is doing production/live sanity testing. So, after the prod server code update, the application in the prod server should look exactly the same and work exactly the same way as dev or test environment.

> While doing visual regression manually, we might be able to catch very blatant differences, but it's really difficult for us to catch subtle differences and also performing testing repeatedly. That's where a tool like [BackstopJS](https://github.com/garris/BackstopJS) helps us to automatically highlight the differences between the two screenshots that will make our testing a much easier.

# Contents
* [BackstopJS](#BackstopJs)
* [Backstop Features](#bsfeatures)
* [BackstopJS workflow](#bsflow)
* [BackstopJS Benefits](#bsbenefits)
* [Installation](#install)
  * [BackstopJS Installation](#bsinstall)
* [BackstopJS project structure](#structure)
* [Creating a visual regression test](#test)
  * [1. Navigate to your local project](#navi)
  * [2. Initialize Backstop](#init)
  * [3. Edit backstop.json](#edit)
    * [Add viewports](#1)
    * [Add scenarios](#2)
    * [How to handle cookies / sessions in backstopJS](#cookies)
  * [4. Create new reference screenshots](#bsref)
  * [5. Run tests](#bstest)
  * [6. Backstop approve](#bsapprove)


## BackstopJS<a name="BackstopJs"></a>

[BackstopJS](https://github.com/garris/BackstopJS) is a framework that automates visual regression testing. This framework is written in JS and consists of the following tools:Puppeteer(headless chrome)+ ResembleJS(diff library). It uses a headless Chrome, in that way it's not actually opening up our Chrome browser and it's not taking screenshots that we can see. All we have to do is, write a script for simulating user scenarios and run backstopJS commands and it goes through and simulates user flows with headless chrome automatically. All we have to do is, run a simple command in the command-line tool so that it will take care of all the work for us.

## Backstop Features<a name="bsfeatures"></a>

 - Renders with headless chrome
 - Simulates user interactions with simple JS / Puppeteer scripts
 - Browser reports with visual diffs, CLI reports, and JUnit reports
 - Easy to integrate with CI(Jenkins) and source control
 - Very easy to use, just 3 commands to do everything.

## BackstopJS workflow<a name="bsflow"></a>

![alt text](https://github.com/abu-sithik/backstopJS-visual-regression-testing-automation/blob/master/img/BackstopJS_Workflow.png?raw=true)

## BackstopJS Benefits<a name="bsbenefits"></a>
- "Reference (production env) vs Test (test/staging env)" Comparison
- Multiple viewports support (desktop browsers, mobile browsers,..etc.)
- Easy way to write UI tests (supports puppeteer scripts)
- Inbuilt interactive and detailed reports
- Easily way to scan our web application (backstop-crawl)

## BackstopJS Installation<a name="install"></a>

### Check Node

```
The first thing you should do is check to see if you have a version of Node.js already installed. To do that in mac:
1. Open the Terminal & Enter `node - v` in the Terminal and press Enter
2. If you do have Node.js installed, it will output the version. Update to the latest version using `npm i -g npm`.
3. If you do not have Node.js installed, it will output something like `-bash: node: command not found` Continue with these instructions to install it. Go to https://nodejs.org/en/download/ You'll see download links for macOS. After Download, open the file & Go through the entire installation process. 
4. Enter node - v in the Terminal to verify that Node.js is installed correctly.
```

### BackstopJS Installation<a name="bsinstall"></a>

#### Global installation (recommended)
`$ npm install -g backstopjs`

### BackstopJS project structure<a name="structure"></a>

> Inorder to create a new visual automation testing project, First of all, we need to initialize Backstop. To do that run `backtop init` in the terminal. 

```
mkdir ./sample_visualTestingProject
cd ./sample_visualTestingProject
backstop init
```

> Now, the script will generate a new backstop config file `backstop.json` and a folder `backstop_data`. `backstop.json` has some pre-configured stuff in it. `backstop_data` folder has some file structure in place to save the screenshots it's gonna be generating.

The generated `backstop.json` file, should look something like this
```
{
  "id": "backstop_default",
  "viewports": [
    {
      "label": "phone",
      "width": 320,
      "height": 480
    },
    {
      "label": "tablet",
      "width": 1024,
      "height": 768
    }
  ],
  "onBeforeScript": "puppet/onBefore.js",
  "onReadyScript": "puppet/onReady.js",
  "scenarios": [
    {
      "label": "BackstopJS Homepage",
      "cookiePath": "backstop_data/engine_scripts/cookies.json",
      "url": "https://garris.github.io/BackstopJS/",
      "referenceUrl": "",
      "readyEvent": "",
      "readySelector": "",
      "delay": 0,
      "hideSelectors": [],
      "removeSelectors": [],
      "hoverSelector": "",
      "clickSelector": "",
      "postInteractionWait": 0,
      "selectors": [],
      "selectorExpansion": true,
      "expect": 0,
      "misMatchThreshold" : 0.1,
      "requireSameDimensions": true
    }
  ],
  "paths": {
    "bitmaps_reference": "backstop_data/bitmaps_reference",
    "bitmaps_test": "backstop_data/bitmaps_test",
    "engine_scripts": "backstop_data/engine_scripts",
    "html_report": "backstop_data/html_report",
    "ci_report": "backstop_data/ci_report"
  },
  "report": ["browser"],
  "engine": "puppeteer",
  "engineOptions": {
    "args": ["--no-sandbox"]
  },
  "asyncCaptureLimit": 5,
  "asyncCompareLimit": 50,
  "debug": false,
  "debugWindow": false
}
```

> `backstop.json` is a configuration file, everything related to tests are defined in this file.

Lets start off with `viewports`.
```
"viewports": [
    {
      "label": "phone",
      "width": 320,
      "height": 480
    },
    {
      "label": "tablet",
      "width": 1024,
      "height": 768
    }
  ]
```

`viewports` are just a dimensions of the application site that we want to test /capture screenshots. The above example has one for phone and another one for tablet, maybe if we want to do desktop or whatever other dimensions are relevant for testing, we can simply add those dimenesion in `viewports` section.


In below section of `backstop.json`, we have a section for `scenarios` where we can define different pages on our application and all the scenarios/flows for that.
```
"scenarios": [
    {
      "label": "BackstopJS Homepage",
      "cookiePath": "backstop_data/engine_scripts/cookies.json",
      "url": "https://garris.github.io/BackstopJS/",
      "referenceUrl": "",
      "readyEvent": "",
      "readySelector": "",
      "delay": 0,
      "hideSelectors": [],
      "removeSelectors": [],
      "hoverSelector": "",
      "clickSelector": "",
      "postInteractionWait": 0,
      "selectors": [],
      "selectorExpansion": true,
      "expect": 0,
      "misMatchThreshold" : 0.1,
      "requireSameDimensions": true
    }
  ]
```
We have a `label` which is describing what this particular scenario is, and we have the `URL` which is the URL that we're testing, this is gonna be our production application URL and then the `reference URL` which is the baseline URL that we're testing it against. All these scenario properties are described here, 
```
label                    // [required] Tag saved with your reference images
onBeforeScript           // Used to set up browser state e.g. cookies.
cookiePath               // import cookies in JSON format (available with default onBeforeScript see setting cookies below)
url                      // [required] The url of your app state
referenceUrl             // Specify a different state or environment when creating reference.
readyEvent               // Wait until this string has been logged to the console.
readySelector            // Wait until this selector exists before continuing.
delay                    // Wait for x milliseconds
hideSelectors            // Array of selectors set to visibility: hidden
removeSelectors          // Array of selectors set to display: none
onReadyScript            // After the above conditions are met -- use this script to modify UI state prior to screen shots e.g. hovers, clicks etc.
keyPressSelectors        // Takes array of selector and string values -- simulates multiple sequential keypress interactions.
hoverSelectors           // *Puppeteer only* takes array of selectors -- simulates multiple sequential hover interactions.
clickSelectors           // *Puppeteer only* takes array of selectors -- simulates multiple sequential click interactions.
postInteractionWait      // Wait for a selector after interacting with hoverSelector or clickSelector (optionally accepts wait time in ms. Idea for use with a click or hover element transition. available with default onReadyScript)
scrollToSelector         // Scrolls the specified DOM element into view prior to screen shot (available with default onReadyScript)
selectors                // Array of selectors to capture. Defaults to document if omitted. Use "viewport" to capture the viewport size. See Targeting elements in the next section for more info...
viewports                // An array of screen size objects your DOM will be tested against. This configuration will override the viewports property assigned at the config root.
```
for more details refer this [doc](https://github.com/garris/BackstopJS#using-backstopjs).

# Creating a visual regression test<a name="test"></a>

> Now, let's get started with the simple user flow: 

Land on page 1 -> do some action (click a link/button) -> go to page 2

## Scenarios:
- Scenario 1: land on page 1, BackstopJS takes screenshot for page 1
- Scenario 2: from page 1, do some action and go to page 2, BackstopJS takes screenshot for page 2

## BackstopJS Flow
 - Navigate to your local project
 - Initialize Backstop: backstop init
 - Edit your backstop.json file
   - Add `viewports`
   - Add `scenarios`
 - Create new reference screenshots: backstop reference
 - Run tests: backstop test
 - Approve tests: backstop approve

### 1. Navigate to your local project<a name="navi"></a>
After installing BackstopJS, create (or) navigate to project folder,
```
mkdir ./sample_visualTestingProject
cd ./sample_visualTestingProject
```

### 2. Initialize Backstop<a name="init"></a>
Intialize backstop setup by running the following command. This command will generate a new backstop config file `backstop.json` and a folder `backstop_data`. This is just an one time command, if backstop files are already there, we need not to run this command again.
```
backstop init
```

### 3. Edit backstop.json<a name="edit"></a>

##### 3.1 Add viewports<a name="1"></a>

open `backstop.json` in any editor, and set `viewports` for desktop and mobile chrome,
```
"viewports": [
    {
      "label": "Desktop Chrome",
      "width": 1280,
      "height": 800
    },
    {
      "label": "Mobile Chrome",
      "width": 375,
      "height": 812
    }
  ]
```

##### 3.2 Add scenarios<a name="2"></a>

###### Scenario 1: land on page 1, BackstopJS takes screenshot for page 1

Let's use this [walmart](https://www.walmart.com/ip/Super-Mario-Odyssey-Nintendo-Switch/56011600) product page as base page. So after user landing on this page, we have to take screenshot of this page using backstopJS.
```
    {
      "label": "walmartProductPage",
      "url": "https://www.walmart.com/ip/Super-Mario-Odyssey-Nintendo-Switch/56011600",
      "referenceUrl": "https://www.walmart.com/ip/Super-Mario-Odyssey-Nintendo-Switch/56011600",
      "delay": 5000
    }
```

- `label`: name of your scenario
- `url`: Test URL 
- `referenceUrl`: baseline URL (since we don't have any development environment url, using same `url` here for demo purpose.)
- `delay`: It allows you to set a time to wait for the page to load before assuming it'll be ready to test.

###### Scenario 2: from page 1, do some action and go to page 2, BackstopJS takes screenshot for page 2

In this scenario, we are moving from product page -> cart page by clicking on `add to cart` button `button.prod-ProductCTA--primary`. After landing on this cart page, we have to take screenshot of this page using backstopJS.
```
  {
    "label": "walmartCartPage",
    "url": "https://www.walmart.com/ip/Super-Mario-Odyssey-Nintendo-Switch/56011600",
    "referenceUrl": "https://www.walmart.com/ip/Super-Mario-Odyssey-Nintendo-Switch/56011600",
    "readySelector": "button.prod-ProductCTA--primary",
    "clickSelector": "button.prod-ProductCTA--primary",
    "delay": 5000
  }
```
- `readySelector` - Making Backstop to wait until a particular element (defined by CSS selector) is appearing before starting.
- `clickSelector` - Making Backstop to click a particular element (defined by CSS selector)

Final `backstop.json` file should look like this for the given scenario,
```
{
  "id": "sample_project",
  "viewports": [
    {
      "label": "Desktop Chrome",
      "width": 1280,
      "height": 800
    },
    {
      "label": "Mobile Chrome",
      "width": 375,
      "height": 812
    }
  ],
  "onBeforeScript": "puppet/onBefore.js",
  "onReadyScript": "puppet/onReady.js",
  "scenarios": [
    {
      "label": "walmartProductPage",
      "url": "https://www.walmart.com/ip/Super-Mario-Odyssey-Nintendo-Switch/56011600",
      "referenceUrl": "https://www.walmart.com/ip/Super-Mario-Odyssey-Nintendo-Switch/56011600",
      "delay": 5000
    },
    {
      "label": "walmartCartPage",
      "url": "https://www.walmart.com/ip/Super-Mario-Odyssey-Nintendo-Switch/56011600",
      "referenceUrl": "https://www.walmart.com/ip/Super-Mario-Odyssey-Nintendo-Switch/56011600",
      "readySelector": "button.prod-ProductCTA--primary",
      "clickSelector": "button.prod-ProductCTA--primary",
      "delay": 5000
    }
  ],
  "paths": {
    "bitmaps_reference": "backstop_data/bitmaps_reference",
    "bitmaps_test": "backstop_data/bitmaps_test",
    "engine_scripts": "backstop_data/engine_scripts",
    "html_report": "backstop_data/html_report",
    "json_report": "backstop_data/json_report",
    "ci_report": "backstop_data/ci_report"
  },
  "report": ["browser"],
  "engine": "puppeteer",
  "engineOptions": {
    "args": ["--no-sandbox"]
  },
  "asyncCaptureLimit": 5,
  "asyncCompareLimit": 50,
  "debug": false,
  "debugWindow": false
}
```

In this demo project other than `viewports` & `scenarios`, we don't really have to change anything else. Based on the requirement,  We can change the all the other variables if needed. For more details about `backstop.json` properties, refer this [doc](https://github.com/garris/BackstopJS#using-backstopjs).


###### How to handle cookies / sessions in backstopJS<a name="cookies"></a>

In some scenarios, we might are try to access urls without repeating any login actions. When an application url has a cookie dependencies, backstopJS provides us a way to import cookies through json files. In such scenarios, we have to add the following backstop property in `backstop.json` file

```"cookiePath": "backstop_data/engine_scripts/cookies.json"```


In backstopJS, it is possible to first run a Puppeteer script that logins into application portal, then save the session cookies in a file. Now a subsequent scenarios can read those json file to load  cookies and proceeds to do some action - all without having to log in again.

To run a custom script, add this step `"onReadyScript": "puppet/getCookies.js"` in `backstop.json` file to execute custom puppeteer script to handle cookies/session dynamically. You can find all custom puppeteer scripts in this location `workingdir > backstop_data > engine_scripts > puppet`.

> The following `getCookies.js` script, grabs cookies by logging into the app and stores the cookies in mentioned `cookiePath` location.

```
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
  
    await page.type('input[name="email"]', 'userEmail@email.com',{delay: 5});
    await page.type('input[name="password"]', 'Test1234!',{delay: 5});

    console.log("Clicking Submit");
    await page.waitForSelector('button[type='login']');
    await page.click('button[type='login']');
    
    await page.waitForNavigation();

    const cookies = await page.cookies();

    console.log("The cookie is:", cookies);
    
    fs.writeFile(cookiePath, JSON.stringify(cookies, null, 2), function(err) {
        if (err) throw err;
        console.log('completed write of cookies');
    });
};
```


#### 4. Create reference screenshots: `backstop reference`<a name="bsref"></a>

After saving the `backstop.json` file, switch back to command line, and start with a executing Backstop reference command `backstop reference`.

This command is gonna generate the initial reference screenshots. It will generate screenshots for the different view ports for the given scenarios, and then once that's done, we can see the generated screenshot images in `workingDir > backstop_data > bitmaps_reference`. 

![alt text](https://github.com/abu-sithik/backstopJS-visual-regression-testing-automation/blob/master/img/folderLocation.png?raw=true)

If there's any failure, we could see the errors in command-line window. Modify the `backstop.json` & rerun the reference command until getting a successful run.

#### 5. Run tests: `backstop test`<a name="bstest"></a>

Once the reference images are generated successfully, we have to run this command `backstop test` in command-line. Now backstopJS will generate screenshots of test application first and after that it will generate a report, by comparing them(reference vs test).

![alt text](https://github.com/abu-sithik/backstopJS-visual-regression-testing-automation/blob/master/img/backstopReport.gif?raw=true)

Lets just go through the report, 
 - We can take a look at the reference and see the screenshot and kind of see what it looks like.
 - We can jump over to the test, see what that looks like.
 - We can also look at the DIFF to see everything highlighted that's different between the two, and then we can actually go to the scrubber and we can see a comparison of the two versions and scrub them back and forth.

 #### 6. Backstop approve: `backstop approve`<a name="bsapprove"></a>
 If the test we ran looks good, then go ahead and approve it. Approving changes will update your reference files with the results from your last test. Future tests are compared against your most recent approved test screenshots.
 
> What we are trying to kind of learn here is that we can run BackstopJS on our computer in a pretty easy & quick way to automate our most of manual visual regression tests. In this demo project, we have explored the very simple test scenario to understand the BackstopJS. In real time scenarios, we might have to use puppeteer JS scripts to handle a complicated scenarios.
