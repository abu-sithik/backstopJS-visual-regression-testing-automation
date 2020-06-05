# Automated Visual Regression Testing with BackstopJS

### What is Visual Regression Testing?

> In a definition from more famous Wikipedia, Regression testing is re-running functional and non-functional tests to ensure that previously developed and tested software still performs after a change. As we're thinking about visual regression testing, we're trying to run a test to verify the application is visually has no difference from its former or less developed state. So in visual regression testing, most of the time we're not going to test some sort of functionality that we've built. 

> Typically, the main use-case comes in a few different ways. One of them is just doing updates. When an application is getting an update(like upgrading internal libraries or security updates), we usually don't expect anything to be visually different. So, after an update application should look exactly the same and work exactly the same way before and after the update. So in visual regression testing, we make sure that everything is working fine before the update goes live.

> Another possible use case is doing production sanity testing. So, after the code update in the production server, the application in the prod server should look exactly the same and work exactly the same way as dev or test environment.

> Doing visual regression manually, we might be able to catch very blatant differences, but it's really difficult for us to catch subtle differences and performing testing repeatedly. That's why a tool like BackstopJS helps us automatically highlight the differences between the two screenshots that will make our jobs a little easier.

## BackstopJs

BackstopJs is a framework that automates visual regression testing, written in javascript. It uses a headless Chrome, in that way it's not actually opening up our Chrome browser and it's not taking screenshots that we can see. We have to write a script for simulating user scenarios and run backstopJS commands and it goes through and simulates user flows with headless chrome automatically. All we have to do is, run a simple command in the command-line tool so that it will take care of all the work for us.


## Backstop Features

 - Render with headless chrome
 - Simulate user interactions with simple JS / Puppeteer scripts
 - Browser reports with visual diffs, CLI reports, and JUnit reports
 - Easy to integrate with CI(Jenkins) and source control
 - Very easy to use, just 3 commands to do everything.

## The BackstopJS workflow

Add png here


## BackstopJS Installation

### Check Node

```
The first thing you should do is check to see if you have a version of Node.js already installed. To do that in mac:
1. Open the Terminal & Enter `node - v` in the Terminal and press Enter
2. If you do have Node.js installed, it will output the version. Update to the latest version using `npm i -g npm`.
3. If you do not have Node.js installed, it will output something like `-bash: node: command not found` Continue with these instructions to install it. Go to https://nodejs.org/en/download/ You'll see download links for macOS. After Download, open the file & Go through the entire installation process. 
4. Enter node - v in the Terminal to verify that Node.js is installed correctly.
```

### BackstopJS Installation

#### Global installation (recommended)
`$ npm install -g backstopjs`

### Creating a Backstopjs project

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
