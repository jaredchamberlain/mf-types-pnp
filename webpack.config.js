const ModuleFederationPlugin = require('@module-federation/enhanced/webpack').ModuleFederationPlugin;
module.exports = {
  devServer: {
    port: 2000,
  },
  output: {
    publicPath: 'http://localhost:2000/', // or auto
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        loader: "ts-loader",
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'webpack_provider',
      filename: 'remoteEntry.js',
      dts: {
        consumeTypes: {
          consumeAPITypes: true,
          abortOnError: true,
        }
      },
      exposes: {
        // Set the modules to be exported, default export as '.'
        './button': './src/components/Button',
      },
      shared: {
        react: {
          singleton: true,
        },
        'react-dom': {
          singleton: true,
        },
      },
    }),
  ],
};