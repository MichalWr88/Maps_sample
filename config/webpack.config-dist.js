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

const path = require("path");

const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "style.css",
  disable: process.env.NODE_ENV === "development",
});

module.exports = {
  entry: {
    google: "./app/es6/google.js",
    lealfet: "./app/es6/lealfelt.js",
    index: "./app/es6/script.js",
  },

  output: {
    path: path.resolve(__dirname, "/app/js"),
    filename: "[name].js",
  },

  watch: true,
  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          fallback: "style-loader", // zabezpieczenie gdy nie mozna pliku zapisac
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMaps: true,
                minimize: false,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: loader => [new require("autoprefixer")()],
              },
            },
            {
              loader: "sass-loader",
            },
          ],
          // use style-loader in development
          fallback: "style-loader",
        }),
      },
    ], //rules
  }, //module

  plugins: [
    extractSass,
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: "localhost",
      port: 3000,
      server: {
        baseDir: ["app/"],
      },
    }),
  ],
};
