const path = require('path');

// px2rem
const px2rem = require('postcss-plugin-px2rem');

const px2remOptions = {
    rootValue: 10,
    unitPrecision: 5,
    propWhiteList: [],
    propBlackList: [],
    exclude:false,
    selectorBlackList: [],
    ignoreIdentifier: false,
    replace: true,
    mediaQuery: false,
    minPixelValue: 0
};

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
            },
            postcss: {
                postcssOptions: {
                    plugins: [
                        px2rem(px2remOptions)
                    ]
                }
            }
        }
    }
};