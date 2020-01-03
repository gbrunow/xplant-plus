const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    background: path.join(__dirname, "src/background/background.ts"),
    content: path.join(__dirname, "src/content/content.ts"),
    popup: path.join(__dirname, "src/popup/index.tsx"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {
    rules: [{
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: "ts-loader"
      },
      {
        exclude: /node_modules/,
        test: /\.scss$/,
        use: [{
            loader: "style-loader" // Creates style nodes from JS strings
          },
          {
            loader: "css-loader" // Translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // Compiles Sass to CSS
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{
        from: 'src/assets',
        to: 'assets'
      },
      {
        from: 'src/popup.html',
        to: 'popup.html'
      },
      {
        from: 'manifest.json',
        to: 'manifest.json'
      },
    ])
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  }
};