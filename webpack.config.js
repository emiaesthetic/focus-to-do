import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const mode = process.env.NODE_ENV || 'development';
const target = mode === 'development' ? 'web' : 'browserslist';
const devtool = mode === 'development' ? 'source-map' : undefined;

export default {
  mode,
  target,
  devtool,
  devServer: {
    hot: true,
  },
  entry: {
    app: './src/js/app.js',
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(process.cwd(), 'dist'),
    clean: true,
    assetModuleFilename: 'assets/[name][ext][query]',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpg|jpeg|png|svg|gif)$/i,
        exclude: path.resolve(process.cwd(), './src/svg'),
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext][query]',
        },
      },
      {
        test: /\.(woff2|woff|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext][query]',
        },
      },
      {
        test: /\.m?js/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },
};
