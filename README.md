# Automated Visual Regression Testing with BackstopJS

### What is Visual Regression Testing?

> In a definition from more famous Wikipedia, Regression testing is re-running functional and non-functional tests to ensure that previously developed and tested software still performs after a change. As we're looking about visual regression testing, we're trying to run a test to verify the application is visually has no difference from its former or less developed state. So in visual regression testing, most of the time we're not going to test some sort of functionality that we've built. 

> Typically, the main use-case comes in a few different ways. One of them is just doing updates. When an application is getting an update(like upgrading internal libraries or security updates), we usually don't expect anything to be visually different. So, after an update application should look exactly the same and work exactly the same way before and after the update. So in visual regression testing, we make sure that everything is working fine before the update goes live.

> Another possible use case is doing production sanity testing. So, after the code update in the production server, the application in the prod server should look exactly the same and work exactly the same way as dev or test environment.

> Doing visual regression manually, we might be able to catch very blatant differences, but it's really difficult for us to catch subtle differences and performing testing repeatedly. That's why a tool like BackstopJS helps us automatically highlight the differences between the two screenshots that will make our jobs a little easier.

# Contents
* [BackstopJs](#BackstopJs)
* [Backstop Features](#bsfeatures)
* [BackstopJS workflow](#bsflow)
* [Installation](#install)
  * [BackstopJS Installation](#bsinstall)
* [BackstopJS project structure](#structure)
* [Creating a visual regression test](#test)
  * [1.Navigate to your local project](#navi)
  * [2.Initialize Backstop](#init)
  * [3.Edit backstop.json](#edit)
  * [4.Create new reference screenshots](#bsref)
  * [5.Run tests](#bstest)


## BackstopJS<a name="BackstopJs"></a>

BackstopJs is a framework that automates visual regression testing, written in javascript. It uses a headless Chrome, in that way it's not actually opening up our Chrome browser and it's not taking screenshots that we can see. We have to write a script for simulating user scenarios and run backstopJS commands and it goes through and simulates user flows with headless chrome automatically. All we have to do is, run a simple command in the command-line tool so that it will take care of all the work for us.


## Backstop Features<a name="bsfeatures"></a>

 - Render with headless chrome
 - Simulate user interactions with simple JS / Puppeteer scripts
 - Browser reports with visual diffs, CLI reports, and JUnit reports
 - Easy to integrate with CI(Jenkins) and source control
 - Very easy to use, just 3 commands to do everything.

## BackstopJS workflow<a name="bsflow"></a>

![alt text](https://github.com/abu-sithik/backstopJS-visual-regression-testing-automation/blob/master/img/BackstopJS_Workflow.png?raw=true)


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

### 1. Navigate to your local project<a name="navi"></a>

```
mkdir ./sample_visualTestingProject
cd ./sample_visualTestingProject
```

### 2. Initialize Backstop<a name="init"></a>
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
