const path = require('path'),
    webpack = require('webpack'),
    uglify = require('uglifyjs-webpack-plugin'),
    htmlWebpackPlugin = require('html-webpack-plugin'),
    autoprefixer = require('autoprefixer'),
    cleanWebpackPlugin = require('clean-webpack-plugin');


const config = {
    mode: 'development',
    entry: {
        index: path.resolve(__dirname, './src/js/index.js'),
        detail: path.resolve(__dirname, './src/js/detail.js'),
        cart: path.resolve(__dirname, './src/js/cart.js')
    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname + '/dist'),
        filename: 'js/[name]-[hash].js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['latest']
                    }
                },
                exclude: path.resolve(__dirname, 'node_modules'),
            },
            {
                test: /\.tpl$/,
                use: {
                    loader: 'ejs-loader'
                }
            },
            {
                test: /\.css$/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [autoprefixer('last 5 versions')];
                            }
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [autoprefixer('last 5 versions')];
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/i,
                loaders: [
                    'url-loader?limit=1024&name=img/[name]-[hash:16].[ext]',
                    'image-webpack-loader'
                ]
            }
        ]
    },
    plugins: [
        new uglify(),
        new htmlWebpackPlugin({
            minify: {
                removeComments: true, // 移除注释
                collapseWhitespace: true // 没有空格
            },
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/index.html'),
            title: '商品列表',
            chunksSortMode: 'manual',
            excludeChunks: ['node_modules'],
            chunks: ['index'],
            hash: true
        }),
        new htmlWebpackPlugin({
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/detail.html'),
            title: '商品详情页',
            chunksSortMode: 'manual',
            excludeChunks: ['node_modules'],
            chunks: ['index'],
            hash: true
        }),
        new htmlWebpackPlugin({
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/cart.html'),
            title: '购物车',
            chunksSortMode: 'manual',
            excludeChunks: ['node_modules'],
            chunks: ['index'],
            hash: true
        }),
        new cleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['dist/js', 'dist/*.html', 'dist/img']
        })
    ],
    devServer: {
        watchOptions: {
            poll: 1000,
            aggregateTimeout: 500,
            ignored: /node_modules/
        },
        host: 'localhost',
        port: 3300,
        open: true,
    }
}

module.exports = config;