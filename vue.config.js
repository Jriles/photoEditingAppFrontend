// vue.config.js

require = require('esm')(module);
const { routes } = require('./src/router/index.js');

module.exports = {
    pluginOptions: {
        sitemap: {
            baseURL: 'https://eazysnap.com',
            routes,
        }
    }
}
