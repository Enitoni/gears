// @ts-check
const path = require("path")
const webpackMerge = require("webpack-merge")

const CopyPlugin = require("copy-webpack-plugin")

/** @type {import("webpack").Configuration} */
const baseConfig = {
  mode: "none",
  entry: "./src/client.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "build/public")
  }
}

/** @type {import("webpack").Configuration} */
const devConfig = {
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true,
    compress: true,
    port: 9000
  }
}

/** @type {import("webpack").Configuration} */
const prodConfig = {
  mode: "production",
  plugins: [
    new CopyPlugin([
      {
        from: "./public"
      }
    ])
  ],
  optimization: {
    minimize: true,
    nodeEnv: "production"
  }
}

module.exports = (function() {
  if (process.env.NODE_ENV === "production") {
    console.info("Running production config")
    return webpackMerge(baseConfig, prodConfig)
  }

  console.info("Running development config")
  return webpackMerge(baseConfig, devConfig)
})()
