/* eslint-disable */
const path = require("path")
const webpack = require("webpack")
const DIST = path.resolve(__dirname, "../dist-web")
const APP = path.resolve(__dirname, "../dist")

module.exports = {
  entry: path.resolve(APP, "src/pact-web.js"),
  mode: "production",
  output: {
    path: DIST,
    library: "Pact",
    libraryTarget: "umd",
    umdNamedDefine: false,
    filename: "pact-web.js",
  },
  resolve: {
    extensions: [".mjs", ".ts", ".tsx", ".js"],
    fallback: {
      net: false
    },
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "awesome-typescript-loader",
          },
        ],
      },
      {
        test: APP,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({ Promise: ["es6-promise", "Promise"] }),
    new webpack.DefinePlugin({ "global.GENTLY": false }),
    new webpack.IgnorePlugin({
      resourceRegExp: /vertx/
    }),
  ],
  devtool: "source-map",
}
