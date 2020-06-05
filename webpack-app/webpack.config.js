//https://dev.to/macmacky/how-to-configure-webpack-and-vue-from-the-ground-up-4c19
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { join } = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const { HotModuleReplacementPlugin } = require('webpack');

module.exports = {
    mode: 'development',
    entry: join(__dirname, './src/app.js'),
    output: {
        filename: 'app.bundled.js',
        path: join(__dirname, 'build')
    },
    devServer:{
        port: 8080,
        hot: true,
        open: true,
        historyApiFallback: true
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test:/\.vue$/,
                loader: 'vue-loader'
            },
            {
                test:/\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new HTMLWebpackPlugin({
            showErrors: true,
            cache: true,
            title: 'Vue with webpack',
            //favicon: join(__dirname, 'logo.png'),
            template: join(__dirname, './src/index.html')
        })
    ]
};