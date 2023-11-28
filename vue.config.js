const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    transpileDependencies: ['vue'],
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        }
    },
    css: {
        loaderOptions: {
            sass: {
                additionalData: `@import "./src/assets/global.scss";`,
            }
        }
    }
};
