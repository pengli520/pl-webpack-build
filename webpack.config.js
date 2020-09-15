/*
 * @Author: your name
 * @Date: 2020-08-11 18:01:19
 * @LastEditTime: 2020-08-31 09:36:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpackcli\webpack.config.js
 */
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const Glob = require('glob');
console.log(path.join(__dirname, 'src/*/index'), Glob.sync('./src/*'));
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: '[name]_[hash:8].js',
        path: path.join(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.less$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
            },
            {
                test: /\.scss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpg|gif)$/, use: [
                    {
                        loader: 'url-loader', options: {
                            name: '[name]_[contenthash:8].png',
                            limit: 81,
                        }
                    }]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: '6556',
            template: './src/index.html',
            inject: true,
            minify: {
                removeComments: false,
                collapseWhitespace: true,
            },
        }),
        new HtmlWebpackExternalsPlugin({
            externals: [
              {
                module: 'jquery',
                entry: 'https://unpkg.com/jquery@3.2.1/dist/jquery.min.js',
                global: 'jQuery',
              },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css',
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin({
            test: /\.css$/i,
        })],
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
};

