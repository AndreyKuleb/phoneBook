var path = require('path');

module.exports = {
    entry: './app.js',
    output: {
        filename: "bundle.js"
        // path: path.resolve(__dirname, 'dist')
    },

    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react']
                }
            }
        }]
    },
    watch: true,

    watchOptions: {
        aggregateTimeout: 100
    }

}