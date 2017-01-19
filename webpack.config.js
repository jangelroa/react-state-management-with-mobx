const HtmlWebpackPlugin = require('html-webpack-plugin');

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
                use: ['babel-loader'],
                test: /\.jsx?$/,
                include: __dirname + '/src'
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'MobX Intro',
            template: './src/index.html',
            inject: true
        })
    ],

    devtool: 'inline-source-map'
};