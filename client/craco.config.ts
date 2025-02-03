import { features } from "process";

const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = {
  webpack: {
    plugins: [
      new MonacoWebpackPlugin({
        languages: ["javascript", "typescript"],
        features: ["!gotoSymbol"],
      }),
    ],
  },
};
