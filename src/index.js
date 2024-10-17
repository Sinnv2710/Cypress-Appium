const webdriverio = require('webdriverio')

const capabilities = {
	// alwaysMatch: {
		'appium:version': '^((?!7|8)[0-9]*).*$',
		'appium:deviceName': '(?:Galaxy [A|S].*)|(?:Pixel.*)',
		'appium:automationName': 'UiAutomator2',
		platformName: 'android',
		'appium:udids': 'emulator-5551',
		'appium:enableMultiWindows': true,
		'appium:ensureWebviewsHavePages': true,
		'appium:nativeWebScreenshot': true,
		'appium:newCommandTimeout': 3600,
	}

let sessionId = ""

async function initCypressAppium() {
 const driver = await webdriverio.remote({
  protocol: 'http',
  hostname: 'localhost',
  port: 4724,
  path: '/wd/hub',
  capabilities,
	})
 sessionId = driver.sessionId
 return sessionId
}

 function registerAppiumPlugins(on, config) {
		on('task', {	async 'appium'() {
			const sessionId = await initCypressAppium();

			while (!sessionId) {
				require('deasync').sleep(1000);
			}

			return sessionId;
	}});
}

module.exports = registerAppiumPlugins