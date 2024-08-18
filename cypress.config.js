const { defineConfig } = require('cypress');
const { remote } = require('webdriverio')
const wd = require('wd');

const capabilities = {
  "alwaysMatch": { "appium:version": "^((?!7|8)[0-9]*).*$", "appium:deviceName": "(?:Galaxy [A|S].*)|(?:Pixel.*)", "appium:automationName": "UiAutomator2", "platformName": "android", "appium:udids": "R3CN70DFXRR", "appium:enableMultiWindows": true, "appium:ensureWebviewsHavePages": true, "appium:nativeWebScreenshot": true, "appium:newCommandTimeout": 3600, "appium:connectHardwareKeyboard": true }, "firstMatch": [{}]
}

// const initSession = async () => {
//   // const driver = wd.promiseChainRemote('http://localhost:4723/wd/hub');
//   const driver = await remote({ ...capabilities, path: '/wd/hub', host: 'localhost', port: 4723 });

//   // Initialize the Appium session using the correct method: `init`
//   return driver
//   debugger

// }
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Initialize the Appium plugin
      on('file:preprocessor', async () => {
        try {
          // Create a new session using Appium client library
          const driver = await remote({
            protocol: 'http',
            hostname: 'localhost',
            port: 4723,
            path: '/wd/hub',
            capabilities
          });

          // Store the driver in a global variable
          global._appiumDriver = driver;
          return null;
        } catch (err) {
          console.error('Appium session initialization failed:', err);
          throw err;
        }
      })
      return config;
    },
    baseUrl: 'http://www.google.com', // Appium server URL
    specPattern: 'cypress/test/**/*.cy.{js,jsx,ts,tsx}', // Spec pattern for test files
    supportFile: 'cypress/support/index.js', // Path to support file
    env: {

    }
  },

});