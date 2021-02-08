const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: __dirname + "/app/index.jsx",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    output: {
        filename: "index-compiled.js",
        path: __dirname + "/build"
    },
    plugins: [ 
        new CopyPlugin({
            patterns: [
                { from: 'app/index.html', to: '' }
            ]
        }),
        new ESLintPlugin({
            files: [ 'app/*.js', 'app/*.jsx' ]
        }) 
    ],
    mode: "development"
};