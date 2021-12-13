const path = require("path");

module.exports = (_, argv) => ({
  entry: {
    popup: path.join(__dirname, "src/popup/index.tsx"),
    options: path.join(__dirname, "src/options/index.tsx"),
    background: path.join(__dirname, "src/background/index.ts"),
  },
  devtool: argv.mode === "production" ? false : "inline-source-map",
	optimization: {
		// We no not want to minimize our code.
		minimize: false
	},
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
});
