const { defineConfig } = require('@playwright/test')


module.exports = defineConfig({
    testDir: './tests',
    use: {
        baseURL: 'https://www.naeliasalas.com/',
        headless: true,
        screenshot: 'only-on-failure'
    },
    reporter: [['html', { open: 'on-failure'}]],
});

