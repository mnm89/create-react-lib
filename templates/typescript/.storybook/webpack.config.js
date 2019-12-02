const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = ({ config, mode }) => {
   // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
   // You can change the configuration based on that.
   // 'PRODUCTION' is used when building the static version of storybook.

   const isDevelopment = mode === 'DEVELOPMENT';

   // typescript support
   config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
         {
            loader: require.resolve('babel-loader'),
            options: {
               presets: [['react-app', { flow: false, typescript: true }]]
            }
         },
         require.resolve('react-docgen-typescript-loader')
      ]
   });
   config.resolve.extensions.push('.ts', '.tsx');

   // sass support
   config.module.rules.push({
      test: /\.styles\.s(a|c)ss$/,
      loader: [
         isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
         {
            loader: 'css-loader',
            options: {
               modules: true,
               sourceMap: isDevelopment
            }
         },
         {
            loader: 'sass-loader',
            options: {
               sourceMap: isDevelopment
            }
         }
      ],
      include: path.resolve(__dirname, '../')
   });

   config.plugins.push(
      new MiniCssExtractPlugin({
         filename: isDevelopment ? '[name].css' : '[name].[hash].css',
         chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
      })
   );

   return config;
};
