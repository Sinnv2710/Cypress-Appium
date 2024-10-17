const { defineConfig } = require('cypress')

module.exports = defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			// Initialize the Appium plugin
			require('./src/index.js')(on, config);
			
			// Wait for Appium to initialize and return session ID
			

			return config;
		},
		baseUrl: 'http://www.google.com', // Appium server URL
		specPattern: 'cypress/test/**/*.cy.{js,jsx,ts,tsx}', // Spec pattern for test files
		supportFile: 'cypress/support/index.js', // Path to support file
		env: {},
		sessionId: '',
	},
})
