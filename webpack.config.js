//npm i webpack -D
//npm install babel-loader@8.0.0-beta.0 @babel/core @babel/preset-env webpack
//npm install --save-dev extract-text-webpack-plugin
//npm install --save-dev browser-sync-webpack-plugin
//npm i style-loader css-loader -D
//npm i sass-loader node-sass webpack -D
//npm install webpack-dev-server --save-dev

// console.log(__dirname);

/*dodatkowe nazwy*/
// // nazwa "bundla"
// filename: "[name].bundle.js"

// // wewnętrzny identyfikator "chunka"
// filename: "[id].bundle.js"

// // "hash" całego builda
// filename: "[name].[hash].bundle.js"

// // "hash" danego "chunka"
// filename: "[chunkhash].bundle.js"

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const extractSass = new ExtractTextPlugin({
    filename: "style.css", 
    disable: process.env.NODE_ENV === "development"
});


module.exports = {
    entry:['./app/es6/script.js',"./app/scss/index.scss"],
    watch: true,
    output: {
        path: __dirname + '/app',
        filename: 'script.js' //[name]_script.js  
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [require('@babel/plugin-proposal-object-rest-spread')]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            }
        ]//rules
    },//module

    plugins: [
        extractSass,
            new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: 'localhost',
      port: 3000,
      server: {
        baseDir: ['app/']
      }
    })
    ],
    devtool: "source-map"
};