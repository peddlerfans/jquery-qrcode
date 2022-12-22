/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


const CopyPlugin = require('copy-webpack-plugin');

var path = process.cwd() + '/dist';

module.exports = {
    entry: './index.ts',
    mode: 'development',
    output: {
        path: path,
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path,
        watchContentBase: true,
        port: process.env.PORT || 8080,
        host: process.env.HOST || 'localhost'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [{ loader: 'ts-loader', options: { allowTsInNodeModules: true }}]
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: './index.html', to: './' },
                { from: './favicon.ico', to: './', noErrorOnMissing: true },
                { from: './assets', to: './assets', noErrorOnMissing: true },
                { from: './css', to: './css', noErrorOnMissing: true }
            ]
        })
    ]
};
