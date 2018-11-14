const path = require("path");
const webpack = require("webpack");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "./css/style.css",
});

module.exports = {
  entry: {
    google: "./app/js/google.js",
    lealfet: "./app/js/lealfelt.js",
    index: "./app/js/script.js",
  },

  output: {
    path: path.resolve(__dirname, "./app/dev"),
    filename: "[name].js",
  },

  watch: true,
  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          fallback: "style-loader", // zabezpieczenie gdy nie mozna pliku zapisac
          // publicPath: './../', //dodawany ciag znaków do sciezki
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                minimize: false,
                // url: false, // true czyta url do plikow
              },
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: loader => [new require("autoprefixer")()],
                sourceMap: true,
              },
            },
            // {
            //   loader: "resolve-url-loader",
            //   options: {
            //     sourceMap: true,
            //   },
            // },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
            // {
            //   loader: "url-loader",
            //   options: {
            //     limit: 10,
            //     name: "fonts/[name].[ext]",
            //   },
            // },
          ],
        }),
      },
    ], //rules
  }, //module

  plugins: [
    extractSass,
    new BrowserSyncPlugin({
      files: ["./app/*.html"],
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: "localhost",
      port: 3000,
      server: {
        baseDir: ["app/"],
      },
    }),
    new webpack.ProvidePlugin({
      $: ["jquery"],
      jQuery: ["jquery"],
      "window.jQuery": "jquery",
    }),
  ],
};
