const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {

    entry: {
        main: './src/app.jsx'
    },

    output: {
        path: __dirname + '/build',
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                loader: ExtractTextWebpackPlugin.extract({
                    loader: ['css-loader']
                }),
                test: /\.css?$/
            },
            {
                use: ['babel-loader'],
                test: /\.jsx?$/,
                include: __dirname + '/src'
            },
            {
                use: 'file-loader',
                test: /\.png?$/
            }
        ]
    },
    resolve: {
        enforceExtension: false,
        extensions: ['.js', '.jsx']
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'MobX Intro',
            template: './src/index.html',
            inject: true
        }),
        new ExtractTextWebpackPlugin({
            filename: 'main.css',
            allChunks: true
        })
    ],

    devtool: 'inline-source-map',
    devServer: {
        stats: 'minimal'
    }
};
